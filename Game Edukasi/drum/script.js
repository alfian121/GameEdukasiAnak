// Mendapatkan elemen drum
const drumElements = document.querySelectorAll('.drum');

// Menambahkan event listener untuk setiap elemen drum
drumElements.forEach(drum => {
    drum.addEventListener('click', (event) => {
        playDrumSound(getAudioSource(drum.id));
        const { left, top } = getDrumCenter(drum);
        showStars(left, top);
    });
});

function playDrumSound(soundName) {
    const audio = new Audio(soundName);
    audio.play();
}

function showStars(x, y) {
    const numberOfStars = 10;
    for (let i = 0; i < numberOfStars; i++) {
        createStar(x, y);
    }
}

function createStar(x, y) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.setProperty('--translate-x', `${getRandomValue(-100, 100)}px`);
    star.style.setProperty('--translate-y', `${getRandomValue(-100, 100)}px`);
    document.body.appendChild(star);

    star.addEventListener('animationend', () => {
        star.remove();
    });
}

function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

function getAudioSource(drumId) {
    switch (drumId) {
        case 'crash':
        case 'crash-1':
            return 'audio/crash.mp3';
        case 'kick-bass':
            return 'audio/kick-bass.mp3';
        case 'snare':
            return 'audio/snare.mp3';
        case 'tom-1':
            return 'audio/tom-1.mp3';
        case 'tom-2':
            return 'audio/tom-2.mp3';
        case 'tom-3':
            return 'audio/tom-3.mp3';
        case 'tom-4':
            return 'audio/tom-4.mp3';
        default:
            return '';
    }
}

// Peta tombol keyboard ke ID drum
const keyToDrumMap = {
    'a': 'crash',
    's': 'tom-1',
    'd': 'snare',
    'f': 'tom-2',
    'g': 'tom-3',
    'h': 'kick-bass',
    'j': 'crash-1',
    'k': 'tom-4',
};

// Menambahkan event listener untuk tombol keyboard
document.addEventListener('keydown', (event) => {
    const drumId = keyToDrumMap[event.key];
    if (drumId) {
        const drum = document.getElementById(drumId);
        if (drum) {
            drum.click();
        }
    }
});

// Menampilkan huruf keyboard di atas masing-masing drum saat halaman pertama kali dimuat
function showKeywords() {
    const keywords = {
        'crash': 'A',
        'tom-1': 'S',
        'snare': 'D',
        'tom-2': 'F',
        'tom-3': 'G',
        'kick-bass': 'H',
        'crash-1': 'J',
        'tom-4': 'K',
    };

    drumElements.forEach(drum => {
        const keyword = document.createElement('div');
        keyword.className = 'keyword';
        keyword.innerText = keywords[drum.id];
        keyword.addEventListener('click', (event) => {
            event.stopPropagation(); // Mencegah event click pada drum
            drum.click();
        });
        drum.appendChild(keyword);
    });

    setTimeout(() => {
        document.querySelectorAll('.keyword').forEach(keyword => {
            keyword.remove();
        });
    }, 5000); // Menghilangkan keyword setelah 5 detik
}

// Mendapatkan posisi tengah drum
function getDrumCenter(drum) {
    const rect = drum.getBoundingClientRect();
    return {
        left: rect.left + rect.width / 2,
        top: rect.top + rect.height / 2
    };
}

// Panggil fungsi showKeywords saat halaman pertama kali dimuat
showKeywords();
