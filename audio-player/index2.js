document.addEventListener('DOMContentLoaded', () => {
    const audio = document.querySelector('audio');
    const progressBar = document.getElementById('progress-bar');
    const playPauseButton = document.querySelector('.play-pause-button');
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');
    const currentTime = document.querySelector('.current-time');
    const duration = document.querySelector('.duration');

const volumeBar = document.getElementById('volume-bar');
const volumeMuteButton = document.querySelector('.volume-mute-button');
    
    let isPlaying = false;
    let currentTrack = 0;
    
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
    
    function loadTrack(trackIndex) {
        const track = tracks[trackIndex];
        audio.src = track.src;
        duration.textContent = track.duration;
    }
    
    function playPause() {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            playPauseButton.classList.remove('pause');
            playPauseButton.classList.add('play');
        } else {
            audio.play();
            isPlaying = true;
            playPauseButton.classList.remove('play');
            playPauseButton.classList.add('pause');
        }
    }
    
    function nextTrack() {
        currentTrack = (currentTrack + 1) % tracks.length;
        loadTrack(currentTrack);
        audio.play();
    }
    
    function prevTrack() {
        currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrack);
        audio.play();
    }
    
    audio.addEventListener('ended', nextTrack);
    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = percent;
    });
    
    progressBar.addEventListener('input', () => {
        const currentAudio = audio;
        const seekTime = (progressBar.value / 100) * currentAudio.duration;
        currentAudio.currentTime = seekTime;
    
        const percent = (seekTime / currentAudio.duration) * 100;
        progressBar.style.background = `linear-gradient(to right, #000 0%, #000 ${percent}%, #fff ${percent}%, white 100%)`;
        progressBar.style.backgroundSize = `${percent}% 100%`;
    });

    
    volumeBar.addEventListener('input', () => {
    const currentAudio = audio;
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

    const value = volumeBar.value;
    volumeBar.style.background = `linear-gradient(to right, #000 0%, #000 ${value}%, #fff ${value}%, white 100%)`;
    volumeBar.style.backgroundSize = `${value}% 100%`;
});

    playPauseButton.addEventListener('click', playPause);
    nextButton.addEventListener('click', nextTrack);
    prevButton.addEventListener('click', prevTrack);
    
    loadTrack(currentTrack);
    progressBar.value = 0;
});