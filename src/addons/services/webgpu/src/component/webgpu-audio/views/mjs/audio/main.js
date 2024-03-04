import {FreeQueue, createTestIR, fetchAudioFileToF32Array, QUEUE_SIZE, Assets } from '../../index.mjs'

export const gpuAudio = async () => {
// Create 2 FreeQueue instances with 4096 buffer length and 1 channel.
  const inputQueue = new FreeQueue(QUEUE_SIZE, 2);
  const outputQueue = new FreeQueue(QUEUE_SIZE, 2);

// Create an atomic state for synchronization between Worker and AudioWorklet.
  let atomicState = []
  atomicState = new Int32Array(new SharedArrayBuffer(1 * Int32Array.BYTES_PER_ELEMENT));

  let audioContext = null;
  let worker = null;
  let isWorkerInitialized = false;

  let toggleButton = null;
  let isPlaying = false;
  let messageView = null;
  let impulseResponseSelect = null;

  /**
   * Function to create and initialize AudioContext.
   * @returns {Promise<AudioContext>}
   */
  const initializeAudio = async () => {
    const audioContext = new AudioContext();

    await audioContext.audioWorklet.addModule('/services/webgpu/src/component/webgpu-audio/views/mjs/audio/base-processor.js');
    await audioContext.audioWorklet.addModule('/services/webgpu/src/component/webgpu-audio/views/mjs/audio/basic-processor.js');
    await audioContext.audioWorklet.addModule('/services/webgpu/src/component/webgpu-audio/views/mjs/audio/bypass-processor.js');

    const oscillatorNode = new OscillatorNode(audioContext);
    // const processorNode = new AudioWorkletNode(audioContext, 'bypass-processor', {
    //   processorOptions: { inputQueue, outputQueue, atomicState }
    // });
    const processorNodeBase = new AudioWorkletNode(audioContext, 'base-processor', {
      processorOptions: { inputQueue, outputQueue, atomicState }
    });
    // const processorNode = new AudioWorkletNode(audioContext, 'basic-processor', {
    //   processorOptions: { inputQueue, outputQueue, atomicState }
    // });

    // Initially suspend the context to prevent the renderer from hammering the
    // Worker.
    audioContext.suspend();

    // Form an audio graph and start the source. When the renderer is resumed,
    // the pipeline will be flowing.
    oscillatorNode.connect(processorNodeBase).connect(audioContext.destination);
    // oscillatorNode.connect(processorNodeBase).connect(audioContext.destination);
    oscillatorNode.start();

    console.log('[main.js] initializeAudio()');
    return audioContext;
  };

  const initializeWorkerIfNecessary = async () => {
    if (isWorkerInitialized) {
      return;
    }

    console.assert(audioContext);

    let filePath = null;
    let irArray = null;
    if (impulseResponseSelect) {
      // When the file path is `TEST` generates a test IR (10 samples). See
      // `assets.js` for details.
      filePath = impulseResponseSelect.value;
      irArray = (filePath === 'TEST')
          ? createTestIR()
          : await fetchAudioFileToF32Array(audioContext, filePath);

      impulseResponseSelect.disabled = true;
    }

    // Send FreeQueue instance and atomic state to worker.
    worker.postMessage({
      type: 'init',
      data: {
        inputQueue,
        outputQueue,
        atomicState,
        irArray,
        sampleRate: audioContext.sampleRate,
      }
    });

    console.log('[main.js] initializeWorkerIfNecessary(): ' + filePath);

    isWorkerInitialized = true;
  };


// Handles `button` click. It toggles the state between playing and suspended.
  const toggleButtonClickHandler = async () => {
    if (!isPlaying) {
      initializeWorkerIfNecessary();
      audioContext.resume();
      isPlaying = true;
      toggleButton.textContent = 'STOP';
    } else {
      audioContext.suspend();
      isPlaying = false;
      toggleButton.textContent = 'START';
    }
  };

// Detect required features.
  const detectFeaturesAndReport = (viewElement) => {
    let areRequiremensMet = true;

    if (typeof navigator.gpu !== 'object') {
      viewElement.textContent +=
          'ERROR: WebGPU is not available on your browser.\r\n';
      areRequiremensMet = false;
    }

    if (typeof SharedArrayBuffer !== 'function') {
      viewElement.textContent +=
          'ERROR: SharedArrayBuffer is not available on your browser.\r\n';
      areRequiremensMet = false;
    }

    if (areRequiremensMet) {
      viewElement.textContent +=
          'All requirements have been met. The experiment is ready to run.\r\n';
    }

    return areRequiremensMet;
  };

  // window.addEventListener('load', async () => {
  //   debugger
    let webgpuAudio = document.querySelector('webgpu-audio')
    messageView = webgpuAudio.shadowRoot.getElementById('message-view');

    if (!detectFeaturesAndReport(messageView)) {
      return;
    }

    audioContext = await initializeAudio();

    // Create a WebWorker for Audio Processing.
    worker = new Worker('/services/webgpu/src/component/webgpu-audio/views/mjs/audio/worker.js', {type: 'module'});


    worker.onerror = (event) => {
      console.log('[main.js] Error from worker.js: ', event);
    };

    // Handle `select` menu for IRs.
    // TODO: Currently the dropdown menu is disabled. Revisit this when the
    // IR selection is implemented.
    impulseResponseSelect = webgpuAudio.shadowRoot.getElementById('select-impulse-response');

    if (impulseResponseSelect) {
      Assets.forEach((asset) => {
        const optionEl = document.createElement('option');
        optionEl.value = asset.path;
        optionEl.textContent = asset.label;
        impulseResponseSelect.appendChild(optionEl);
      });
      impulseResponseSelect.disabled = false;
    }

    // Handle `button` with toggle logic.
    toggleButton = webgpuAudio.shadowRoot.getElementById('toggle-audio');
    toggleButton.onclick = toggleButtonClickHandler;
    toggleButton.disabled = false;

    console.log('[main.js] window onloaded');
  // });
};