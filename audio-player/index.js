const progressBar = document.getElementById('progress-bar');

const volumeBar = document.getElementById('volume-bar');
const volumeMuteButton = document.querySelector('.volume-mute-button');

const audioElements = [
    document.getElementById('audio1'),
    document.getElementById('audio2'),
];

let isMuted = false;
let currentAudioIndex = 0;

volumeBar.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #000 0%, #000 ${value}%, #fff ${value}%, white 100%)`
  })

progressBar.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #000 0%, #000 ${value}%, #fff ${value}%, white 100%)`
})

volumeMuteButton.addEventListener('click', () => {
    const currentAudio = audioElements[currentAudioIndex];

    if (currentAudio.volume > 0 && !isMuted) {
        currentAudio.volume = 0;
        isMuted = true;
        volumeMuteButton.classList.remove('volume');
        volumeMuteButton.classList.add('mute');
        volumeBar.value = 0;
        volumeBar.style.background = `linear-gradient(to right, #000 0%, #000 ${volumeBar.value}%, #fff ${volumeBar.value}%, white 100%)`;

        // Явно вызываем событие input после изменения значения
        const inputEvent = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        volumeBar.dispatchEvent(inputEvent);
    } else {
        isMuted = false;
        volumeMuteButton.classList.remove('mute');
        volumeMuteButton.classList.add('volume');
        volumeBar.value = 40;
        volumeBar.style.background = `linear-gradient(to right, #000 0%, #000 ${volumeBar.value}%, #fff ${volumeBar.value}%, white 100%)`;

        // Устанавливаем громкость текущего трека
        currentAudio.volume = parseFloat(volumeBar.value) / 100;

        // Явно вызываем событие input после изменения значения
        const inputEvent = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        volumeBar.dispatchEvent(inputEvent);
    }
});

volumeBar.addEventListener('input', () => {
    const currentAudio = audioElements[currentAudioIndex];
    currentAudio.volume = parseFloat(volumeBar.value) / 100;

    if (currentAudio.volume === 0) {
        isMuted = true;
        volumeMuteButton.classList.remove('volume');
        volumeMuteButton.classList.add('mute');
    } else {
        isMuted = false;
        volumeMuteButton.classList.remove('mute');
        volumeMuteButton.classList.add('volume');
    }
});

//-----------------------------------------------------------------------

const playPauseButton = document.querySelector('.play-pause-button');

const cover = document.querySelector('.cover');
const trackTitle = document.querySelector('.track-title');
const trackArtist = document.querySelector('.track-artist');

const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration');

let isPlaying = false;
let currentTrack = 0;

let currentAudio = audioElements[currentAudioIndex];

const tracks = [
    {
        title: 'R U Mine?',
        artist: 'Arctic Monkeys',
        src: './audio/Track1_Arctic-monkeys_r_u_mine.mp3',
        coverSrc: './image/Cover1_Arctic_Monkeys.jpg',
        duration: '03:20'
    },
    {
        title: 'Breathe (In The Air)',
        artist: 'Pink Floyd',
        src: './audio/Track2_Pink Floyd - Breathe (In The Air).mp3',
        coverSrc: './image/Cover2_Pink_Floyd.jpg',
        duration: '02:50'
    }
];

const backgroundImages = [
    'url(./image/Cover1_Arctic_Monkeys.jpg)',
    'url(./image/Cover2_Pink_Floyd.jpg)',
];

function loadTrack(trackIndex) {
    const track = tracks[trackIndex];
    currentAudio.src = track.src;
    cover.src = track.coverSrc;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    duration.textContent = track.duration;
    currentAudio.load();
    document.body.style.backgroundImage = backgroundImages[trackIndex];
    progressBar.value = 0;
}

function playPause() {
    updateProgressBar();
    const currentAudio = audioElements[currentAudioIndex];

    if (isPlaying) {
        currentAudio.pause();
        isPlaying = false;
        playPauseButton.classList.remove('pause');
        playPauseButton.classList.add('play');
    } else {
        currentAudio.play();
        isPlaying = true;
        playPauseButton.classList.remove('play');
        playPauseButton.classList.add('pause');
    }
}

function nextTrack() {
    const currentAudio = audioElements[currentAudioIndex];
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudioIndex = (currentAudioIndex + 1) % audioElements.length;
    loadTrack(currentAudioIndex);

    progressBar.value = 0;

    if (isPlaying) {
        audioElements[currentAudioIndex].play();
    }
}

function prevTrack() {
    const currentAudio = audioElements[currentAudioIndex];
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudioIndex = (currentAudioIndex - 1 + audioElements.length) % audioElements.length;
    loadTrack(currentAudioIndex);

    progressBar.value = 0;

    if (isPlaying) {
        audioElements[currentAudioIndex].play();
    }
}

function updateProgressBar() {
    const currentAudio = audioElements[currentAudioIndex];
    const percent = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressBar.value = percent;
    const minutes = Math.floor(currentAudio.currentTime / 60);
    const seconds = Math.floor(currentAudio.currentTime % 60);
    currentTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Обновление градиента прогресс-бара
    progressBar.style.background = `linear-gradient(to right, #000 0%, #000 ${percent}%, #fff ${percent}%, white 100%)`;
}

audioElements.forEach((audio) => {
    audio.addEventListener('ended', nextTrack);
    audio.addEventListener('timeupdate', updateProgressBar);
    audio.addEventListener('canplay', function () {
        updateProgressBar();
    });
    updateProgressBar();
});

progressBar.addEventListener('input', () => {
    const currentAudio = audioElements[currentAudioIndex];
    const seekTime = (progressBar.value / 100) * currentAudio.duration;
    currentAudio.currentTime = seekTime;

    const percent = (seekTime / currentAudio.duration) * 100;
    progressBar.style.background = `linear-gradient(to right, #000 0%, #000 ${percent}%, #fff ${percent}%, white 100%)`;
});

playPauseButton.addEventListener('click', playPause);

nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);

loadTrack(currentAudioIndex);