import { Reader } from '../../views/index.mjs'
export default async (self, actions) => {
    let {
        setStopState,
        keydownInput,
        keypressInput,
        startStopReader,
        pauseResumeReader,
        goBackReader,
        goForwardReader,
        slowerReader,
        fasterReader,

        startStopButton,
        consonants,
        highlightCurveValue,
        highlightLetters,
        highlightLetterValue,
        nextWord,
        startReader,
        getScore,
        padAndHighlightWord,
        pauseResumeButton,
        goBackButton,
        goForwardButton,
        slowerButton,
        fasterButton,
        hideTextAreaCheckBox,
        hideTextAreaOnChange,
        multiWordCheckBox,
        multiWordCheckBoxOnChange,
        consonantLowValue,
        consonantHighValue,
        isInFirefox,
        inputTextArea
    } = await Reader(self)

    console.log('self.dataset.field', self.dataset.field)

    if(self.dataset.field === 'osc_audio') {
        inputTextArea.textContent = ''
        for(let i =0; i< 250; ++i) {
            inputTextArea.textContent = `${inputTextArea.textContent} ${i}`
        }
    }

    return {
        init: () => {
            // Add event handlers
            document.addEventListener("keydown", keydownInput, false);
            document.addEventListener("keypress", keypressInput, false);
            startStopButton.addEventListener("click", startStopReader, false);
            pauseResumeButton.addEventListener("click", pauseResumeReader, false);
            goBackButton.addEventListener("click", goBackReader, false);
            goForwardButton.addEventListener("click", goForwardReader, false);
            slowerButton.addEventListener("click", slowerReader, false);
            fasterButton.addEventListener("click", fasterReader, false);
            hideTextAreaCheckBox.addEventListener("change", hideTextAreaOnChange, false);
            multiWordCheckBox.addEventListener("change", multiWordCheckBoxOnChange, false);

            // Create a list of consonants for use in hyphenating.
            var i = 0;
            consonants = "";
            for (i = 0; i < highlightLetters.length; ++i)
            {
                if (highlightLetterValue[i] >= consonantLowValue && highlightLetterValue[i] <= consonantHighValue)
                {
                    consonants += highlightLetters[i];
                }
            }

            // Set this flag if the app is running in Firefox.
            isInFirefox = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1);

            setStopState();
        },
        terminate: () => {
            document.removeEventListener("keydown", keydownInput, false);
            document.removeEventListener("keypress", keypressInput, false);
            startStopButton.removeEventListener("click", startStopReader, false);
            pauseResumeButton.removeEventListener("click", pauseResumeReader, false);
            goBackButton.removeEventListener("click", goBackReader, false);
            goForwardButton.removeEventListener("click", goForwardReader, false);
            slowerButton.removeEventListener("click", slowerReader, false);
            fasterButton.removeEventListener("click", fasterReader, false);
            hideTextAreaCheckBox.removeEventListener("change", hideTextAreaOnChange, false);
            multiWordCheckBox.removeEventListener("change", multiWordCheckBoxOnChange, false);
            multiWordCheckBox.removeEventListener("change", multiWordCheckBoxOnChange, false);
        }
    }
}