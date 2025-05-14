console.log("Script is running...");

const voiceInput = document.querySelector(".voice-input");
const voiceList = document.querySelector(".select-voice-options");
const playButton = document.querySelector(".btn");
const textInput = document.getElementById("text-to-convert");
const dropdownIcon = document.querySelector(".fa-caret-down");

let voices = [];
let selectedVoice = null;

// ✅ Populate dropdown with voice options
function populateVoiceList(voices) {
    voices = speechSynthesis.getVoices();// Get the available voices

    window.speechSynthesis.getVoices().length;
    console.log("Voices loaded:", voices.length);
    // voiceList.innerHTML = ""; // Clear previous list

    if (voices.length === 0) {
        console.warn("No voices available.");
        return;
    }

    voiceList.innerHTML = ""; // Clear previous list
    voices.forEach((voice) => {
        const li = document.createElement("li");
        li.textContent = `${voice.name} (${voice.lang})`;

        // ✅ Click event to select voice
        li.addEventListener("click", () => {
            voiceInput.value = li.textContent;
            selectedVoice = voice;
            console.log("Selected voice object:", selectedVoice);
            voiceList.classList.remove("show");
            dropdownIcon.classList.remove("rotate");
            console.log("Voice selected:", voice.name);
        });

        voiceList.appendChild(li);
    });

    // Set default voice (e.g., Microsoft David)
    const defaultVoice = voices.find(v => v.name.includes("Microsoft David"));
    if (defaultVoice) {
        selectedVoice = defaultVoice;
        voiceInput.value = `${defaultVoice.name} (${defaultVoice.lang})`;
        console.log("Default voice set:", defaultVoice.name);
    }
    voiceList.classList.add("show");
}

//✅ Retry loading voices a few times
function tryLoadVoices(retries = 5) {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        populateVoiceList();
    } else if (retries > 0) {
        console.log("Retrying voice load...");
        setTimeout(() => tryLoadVoices(retries - 1), 500);
    } else {
        console.error("Failed to load voices after multiple attempts.");
    }
}

// ✅ Safe trigger for voice loading
window.addEventListener("DOMContentLoaded", () => {
    if ('onvoiceschanged' in speechSynthesis) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    // Ensure fallback call
    tryLoadVoices();
});



// ✅ Toggle dropdown on caret click
dropdownIcon.addEventListener("click", () => {
    voiceList.classList.toggle("show");
    console.log(voiceList);
    dropdownIcon.classList.toggle("rotate");
    console.log("Dropdown toggled.");
});

// ✅ Convert text to speech on button click
playButton.addEventListener("click", () => {
    const text = textInput.value.trim();
    if (!text) {
        alert("Please enter some text!");
        return;
    }
    if (!selectedVoice) {
        alert("Please select a voice!");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    speechSynthesis.speak(utterance);
    console.log("Speaking with:", selectedVoice.name);
});

