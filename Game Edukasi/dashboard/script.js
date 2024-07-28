document.addEventListener('DOMContentLoaded', (event) => {
    const music = document.getElementById('background-music');
    music.play().catch(error => {
        console.log('Tidak bisa memutar musik:', error);
    });
});
