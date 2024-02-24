class StreamRadio extends AudioWorkletProcessor {
    process(inputs, outputs) {
        // By default, the node has single input and output.
        const input = inputs[0];
        const output = outputs[0];

        console.log('Stream: ', output)
        for (let channel = 0; channel < output.length; ++channel) {
            output[channel].set(input[channel]);
        }

        return true;
    }
}

registerProcessor("random-noise-processor", StreamRadio);