// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 80);
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Typing animation
const text = "Lyhz (Yxchi.sya)";
const typingText = document.querySelector('.typing-text');
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typingText.innerHTML = text.substring(0, i + 1) + '<img src="assets/images/white-cat.gif" alt="White Cat" class="cat-profile-gif">';
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing animation when page loads
window.addEventListener('load', typeWriter);

// Gallery hover effect
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Custom Audio Player Playlist
const playlist = [
    {
        title: 'Hộp thư thoại số 1',
        artist: 'Chu3isme',
        file: 'assets/music/song1.mp3',
        cover: 'assets/images/song1.gif'
    },
    {
        title: 'Voicemail',
        artist: 'unooffical',
        file: 'assets/music/song2.mp3',
        cover: 'assets/images/song2.gif'
    },
    {
        title: 'Thiếu đi (người)',
        artist: 'andrewng',
        file: 'assets/music/song3.mp3',
        cover: 'assets/images/song3.gif'
    },
    {
        title: 'anh noi roi ma',
        artist: 'parsg',
        file: 'assets/music/song4.mp3',
        cover: 'assets/images/song4.gif'
    }
];
let currentSong = 0;
const customAudio = document.getElementById('audio');
const audioPlayBtn = document.getElementById('audio-play');
const audioPrevBtn = document.getElementById('audio-prev');
const audioNextBtn = document.getElementById('audio-next');
const audioSeek = document.getElementById('audio-seek');
const audioCurrent = document.getElementById('audio-current');
const audioDuration = document.getElementById('audio-duration');
const audioTitle = document.getElementById('audio-title');
const audioCover = document.getElementById('audio-cover');

function formatTime(sec) {
    if (isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
}

function loadSong(index) {
    const song = playlist[index];
    customAudio.src = song.file;
    audioTitle.innerHTML = `${song.title} <span class="jp">- ${song.artist}</span>`;
    audioCover.src = song.cover;
    audioPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
    audioSeek.value = 0;
    audioCurrent.textContent = '0:00';
    audioDuration.textContent = '0:00';
    customAudio.load();
}

function playSong() {
    customAudio.play();
    audioPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong() {
    customAudio.pause();
    audioPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
}

// Pick a random song on page load
currentSong = Math.floor(Math.random() * playlist.length);
loadSong(currentSong);

// Always show correct play/pause icon
function updatePlayButton() {
    if (customAudio.paused) {
        audioPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audioPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

// Attempt to autoplay
window.addEventListener('DOMContentLoaded', () => {
    customAudio.muted = true;
    customAudio.play().then(() => {
        // Phát nhạc thành công
        customAudio.muted = false;
        updatePlayButton();
    }).catch(() => {
        // Nếu bị chặn, phát nhạc khi người dùng tương tác đầu tiên
        const tryPlay = () => {
            customAudio.play().then(() => {
                customAudio.muted = false;
                updatePlayButton();
            });
            window.removeEventListener('click', tryPlay);
            window.removeEventListener('keydown', tryPlay);
            window.removeEventListener('touchstart', tryPlay);
        };
        window.addEventListener('click', tryPlay);
        window.addEventListener('keydown', tryPlay);
        window.addEventListener('touchstart', tryPlay);
    });
});


// Always update play button on play/pause/ended
customAudio.addEventListener('play', updatePlayButton);
customAudio.addEventListener('pause', updatePlayButton);
customAudio.addEventListener('ended', updatePlayButton);

// Play/pause button logic
audioPlayBtn.onclick = function() {
    if (customAudio.paused) {
        customAudio.play();
    } else {
        customAudio.pause();
    }
    // updatePlayButton(); // Not needed, handled by event listeners above
};

// Next/prev logic
audioPrevBtn.onclick = function() {
    currentSong = (currentSong - 1 + playlist.length) % playlist.length;
    loadSong(currentSong);
    customAudio.play();
};
audioNextBtn.onclick = function() {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    customAudio.play();
};

// Also update on song load
customAudio.addEventListener('loadeddata', updatePlayButton);

customAudio.addEventListener('loadedmetadata', () => {
    audioDuration.textContent = formatTime(customAudio.duration);
});

customAudio.ontimeupdate = function() {
    if (customAudio.duration) {
        audioSeek.value = (customAudio.currentTime / customAudio.duration) * 100;
        audioCurrent.textContent = formatTime(customAudio.currentTime);
        audioDuration.textContent = formatTime(customAudio.duration);
    }
};

audioSeek.oninput = function() {
    if (customAudio.duration) {
        customAudio.currentTime = (audioSeek.value / 100) * customAudio.duration;
    }
};

// Floating White Cat smooth random running
(function() {
    const cat = document.querySelector('.cat');
    if (!cat) return;
    const padding = 20;
    let destX = 0, destY = 0;
    let running = false;
    function randomPosition() {
        const maxW = window.innerWidth - cat.offsetWidth - padding;
        const maxH = window.innerHeight - cat.offsetHeight - padding;
        return [Math.random() * maxW, Math.random() * maxH];
    }
    function moveCat() {
        if (!running) return;
        const rect = cat.getBoundingClientRect();
        const x = rect.left;
        const y = rect.top;
        const dx = destX - x;
        const dy = destY - y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 5) {
            // Arrived, pick new destination after a short pause
            setTimeout(() => {
                [destX, destY] = randomPosition();
                moveCat();
            }, 500 + Math.random()*1000);
            return;
        }
        // Move a fraction toward destination
        const step = Math.min(8, dist);
        const angle = Math.atan2(dy, dx);
        const newX = x + Math.cos(angle) * step;
        const newY = y + Math.sin(angle) * step;
        cat.style.left = newX + 'px';
        cat.style.top = newY + 'px';
        requestAnimationFrame(moveCat);
    }
    function startCat() {
        running = true;
        [destX, destY] = randomPosition();
        moveCat();
    }
    function stopCat() { running = false; }
    window.addEventListener('resize', () => {
        [destX, destY] = randomPosition();
    });
    window.addEventListener('DOMContentLoaded', () => {
        cat.style.left = '100px';
        cat.style.top = '100px';
        startCat();
    });
})();
const greetingOverlay = document.getElementById('greeting-overlay');
const enterBtn = document.getElementById('enter-btn');
if (greetingOverlay && enterBtn) {
    enterBtn.addEventListener('click', () => {
        greetingOverlay.style.opacity = '0';
        setTimeout(() => {
            greetingOverlay.style.display = 'none';
        }, 400);
        // Start music after greeting is dismissed
        userPaused = false;
        customAudio.play();
    });
}
