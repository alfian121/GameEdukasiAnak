document.addEventListener('DOMContentLoaded', () => {
    // Memuat file audio
    const audioFiles = {
        's1': new Audio('audio/0.mp3'),
        's2': new Audio('audio/1.mp3'),
        's3': new Audio('audio/2.mp3'),
        's4': new Audio('audio/3.mp3'),
        's5': new Audio('audio/4.mp3'),
        's6': new Audio('audio/5.mp3'),
        's7': new Audio('audio/6.mp3')
    };

    // Debug: Verifikasi apakah file audio berhasil dimuat
    Object.keys(audioFiles).forEach(key => {
        audioFiles[key].oncanplaythrough = () => console.log(`${key} loaded`);
        audioFiles[key].onerror = () => console.error(`Failed to load ${key}`);
    });

    // Menambahkan event listener untuk setiap gambar
    document.querySelectorAll('.s1, .s2, .s3, .s4, .s5, .s6, .s7').forEach(img => {
        img.addEventListener('click', (event) => {
            const keyClass = event.target.className.split(' ')[0];
            if (audioFiles[keyClass]) {
                audioFiles[keyClass].play().catch(error => console.error(`Failed to play ${keyClass}: ${error.message}`));
                const { left, top } = getSaronCenter(event.target);
                showStars(left, top);
            }
        });
    });

    // Peta tombol keyboard ke kelas saron
    const keyToSaronMap = {
        'q': 's1',
        'w': 's2',
        'e': 's3',
        'r': 's4',
        't': 's5',
        'y': 's6',
        'u': 's7',
    };

    // Menambahkan event listener untuk tombol keyboard
    document.addEventListener('keydown', (event) => {
        const saronClass = keyToSaronMap[event.key];
        if (saronClass) {
            const saron = document.querySelector(`.${saronClass}`);
            if (saron) {
                saron.click();
            }
        }
    });

    // Menampilkan huruf keyboard di atas setiap saron saat halaman pertama kali dimuat
    function showKeywords() {
        const keywordContainer = document.createElement('div');
        keywordContainer.className = 'keyword-container';

        const title = document.createElement('div');
        title.className = 'keyword-title';
        title.innerText = 'Ingat shortcut ini';
        keywordContainer.appendChild(title);

        const keywords = {
            'do': 'Q',
            're': 'W',
            'mi': 'E',
            'fa': 'R',
            'so': 'T',
            'la': 'Y',
            'si': 'U',
        };

        Object.keys(keywords).forEach(key => {
            const keyword = document.createElement('div');
            keyword.className = 'keyword';
            keyword.innerText = `${key}: ${keywords[key]}`;
            keywordContainer.appendChild(keyword);
        });

        document.body.appendChild(keywordContainer);

        setTimeout(() => {
            keywordContainer.remove();
        }, 8000); // Menghilangkan keyword setelah 5 detik
    }

    // Panggil fungsi showKeywords saat halaman pertama kali dimuat
    showKeywords();

    // Fungsi untuk mendapatkan posisi tengah saron
    function getSaronCenter(saron) {
        const rect = saron.getBoundingClientRect();
        return {
            left: rect.left + rect.width / 2,
            top: rect.top + rect.height / 2
        };
    }

    // Fungsi untuk menampilkan bintang
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
});
