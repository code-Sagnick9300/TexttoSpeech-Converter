let voiceSelect=document.querySelector(".app-container .select-voice-box .select-voice-options");
let voiceInput=document.querySelector(".app-container .select-voice-box .voice-choice input");
let dropdownIcon=document.querySelector(".select-voice-box .voice-choice i");
//initalizing speech synthesis API
const synth=window.speechSynthesis;

//Function to iterate through all voices
function populateVoiceList() {
    let voices = synth.getVoices();
    if (voices.length === 0) {
        console.warn("No voices available yet. Try again after a short delay.");
        return;
    }

    console.log("Available voices count:", voices.length);
   

    // Clear the existing options
    voiceSelect.innerHTML = "";

    voices.forEach((voice, index) => {
        let li = document.createElement("li");
        li.textContent = `${voice.name} (${voice.lang})`;
        li.dataset.voiceIndex = index; // Store index for reference
        li.classList.add("voice-item"); // Add a class for styling
        voiceSelect.appendChild(li);
    });

    console.log("Dropdown updated with voices:", voiceSelect.innerHTML)
    // Set the default voice in the input field
    setDefaultVoice();
}


//Function to set default voice
const setDefaultVoice = () => {
    let voices = synth.getVoices();
    let defaultVoice = voices.find(voice => voice.name.includes("Microsoft David") && voice.lang.includes("en-US"));

    if (defaultVoice) {
        voiceInput.value = `${defaultVoice.name} (${defaultVoice.lang})`; // Set input field
        console.log("Default voice set in input field:", voiceInput.value);
    }
};

// Toggle dropdown on clicking the icon
dropdownIcon.addEventListener("click", () => {
    voiceSelect.classList.toggle("show"); // Toggle dropdown visibility
    dropdownIcon.classList.toggle("rotate"); // Rotate caret icon
    console.log("Dropdown toggled.");
});

// Update input field when a voice is selected from the list
voiceSelect.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        voiceInput.value = event.target.textContent; // Set selected voice in input field
        console.log("User selected voice:", event.target.textContent);
        voiceSelect.classList.remove("show"); // Hide dropdown after selection
        dropdownIcon.classList.remove("rotate"); // Reset caret rotation
    }
});

// Ensure voices are loaded before calling getVoices()
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
} 
//Update available voices on voicechanged event

setTimeout(() => {
    console.log("Calling populateVoiceList() after timeout.");
    populateVoiceList();
}, 1000);
//Initialize the setDefaultVoice
