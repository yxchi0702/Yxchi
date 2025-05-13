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

document.addEventListener('moyusedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Typing animation
const text = "Hoàng Hạ Chi 🍪";
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
let userPaused = false;
let musicStarted = false;

const customAudio = document.getElementById('audio');
const audioPlayBtn = document.getElementById('audio-play');
const audioPrevBtn = document.getElementById('audio-prev');
const audioNextBtn = document.getElementById('audio-next');
const audioSeek = document.getElementById('audio-seek');
const audioCurrent = document.getElementById('audio-current');
const audioDuration = document.getElementById('audio-duration');
const audioTitle = document.getElementById('audio-title');
const audioCover = document.getElementById('audio-cover');

// Initialize audio with user interaction
function initializeAudio() {
    if (!musicStarted) {
        // Pick a random song
        currentSong = Math.floor(Math.random() * playlist.length);
        loadSong(currentSong);

        // Try to play
        const playPromise = customAudio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicStarted = true;
                userPaused = false;
                updatePlayButton();
            }).catch(() => {
                // Autoplay was prevented
                userPaused = true;
                updatePlayButton();
            });
        }
    }
}

// Add click event listeners to all interactive elements
document.addEventListener('click', initializeAudio);
document.addEventListener('touchstart', initializeAudio);

function loadSong(index) {
    const song = playlist[index];
    customAudio.src = song.file;
    audioTitle.innerHTML = `${song.title} <span class="jp">- ${song.artist}</span>`;
    audioCover.src = song.cover;
    updatePlayButton();
    audioSeek.value = 0;
    audioCurrent.textContent = '0:00';
    audioDuration.textContent = '0:00';
    customAudio.load();
}

function updatePlayButton() {
    if (customAudio.paused || userPaused) {
        audioPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audioPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

// Play/pause button logic
audioPlayBtn.onclick = function() {
    if (customAudio.paused) {
        userPaused = false;
        customAudio.play().then(() => {
            updatePlayButton();
        }).catch(() => {
            userPaused = true;
            updatePlayButton();
        });
    } else {
        userPaused = true;
        customAudio.pause();
        updatePlayButton();
    }
};

// Next/prev logic
audioPrevBtn.onclick = function() {
    currentSong = (currentSong - 1 + playlist.length) % playlist.length;
    loadSong(currentSong);
    userPaused = false;
    customAudio.play().then(() => {
        updatePlayButton();
    }).catch(() => {
        userPaused = true;
        updatePlayButton();
    });
};

audioNextBtn.onclick = function() {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    userPaused = false;
    customAudio.play().then(() => {
        updatePlayButton();
    }).catch(() => {
        userPaused = true;
        updatePlayButton();
    });
};

// Update play button on play/pause/ended
customAudio.addEventListener('play', updatePlayButton);
customAudio.addEventListener('pause', updatePlayButton);
customAudio.addEventListener('ended', () => {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    userPaused = false;
    customAudio.play().then(() => {
        updatePlayButton();
    }).catch(() => {
        userPaused = true;
        updatePlayButton();
    });
});

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

// Greeting overlay logic
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

// Handle personal intro items
document.addEventListener('DOMContentLoaded', function() {
    const introItems = document.querySelectorAll('.intro-item');
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    const modalContents = document.querySelectorAll('.intro-content');
    const closeButtons = document.querySelectorAll('.modal-close');

    function closeAllModals() {
        modalOverlays.forEach(overlay => overlay.classList.remove('active'));
        modalContents.forEach(content => content.classList.remove('active'));
    }

    introItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const overlay = this.querySelector('.modal-overlay');
            const content = this.querySelector('.intro-content');

            closeAllModals();

            overlay.classList.add('active');
            content.classList.add('active');
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeAllModals();
        });
    });

    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeAllModals();
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
});

// Update audio time and duration
function updateTime() {
    const currentTime = customAudio.currentTime;
    const duration = customAudio.duration;

    // Update seek bar
    if (!isNaN(duration)) {
        audioSeek.value = (currentTime / duration) * 100;
    }

    // Update time displays
    audioCurrent.textContent = formatTime(currentTime);
    audioDuration.textContent = formatTime(duration);
}

// Format time in MM:SS
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Handle seek bar changes
audioSeek.addEventListener('input', function() {
    const seekTime = (audioSeek.value / 100) * customAudio.duration;
    customAudio.currentTime = seekTime;
});

// Update time displays
customAudio.addEventListener('timeupdate', updateTime);
customAudio.addEventListener('loadedmetadata', updateTime);

// Handle gallery items
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modals = document.querySelectorAll('.modal-container');
    let currentModalIndex = 0;

    // Open modal
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentModalIndex = index;
            const modal = document.getElementById(`modal-${index + 1}`);
            modal.classList.add('active');
        });
    });

    // Close when clicking outside modal
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Close when pressing ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });

    // Navigation function
    window.navigateModal = function(direction) {
        const totalModals = modals.length;
        currentModalIndex = (currentModalIndex + direction + totalModals) % totalModals;

        // Hide all modals
        modals.forEach(modal => modal.classList.remove('active'));

        // Show current modal
        const currentModal = document.getElementById(`modal-${currentModalIndex + 1}`);
        currentModal.classList.add('active');
    };
});
