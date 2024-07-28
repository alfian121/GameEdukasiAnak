document.addEventListener("DOMContentLoaded", () => {
    const keys = document.querySelectorAll(".key");
    const audioFiles = {
      "Do": "audio/Do1.mp3",
      "Re": "audio/Re2.mp3",
      "Mi": "audio/Mi3.mp3",
      "Fa": "audio/Fa4.mp3",
      "Sol": "audio/So5.mp3",
      "La": "audio/La6.mp3",
      "Ti": "audio/Si7.mp3",
      "do-high": "audio/do8.mp3"
    };
  
    keys.forEach(key => {
      key.addEventListener("click", () => {
        const note = key.getAttribute("data-note");
        playSound(note);
      });
    });
  
    function playSound(note) {
      const audio = new Audio(audioFiles[note]);
      audio.play();
    }
  });
  