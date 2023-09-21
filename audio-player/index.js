const volumeBar = document.getElementById('volume-bar');
const progressBar = document.getElementById('progress-bar');

volumeBar.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #000 0%, #000 ${value}%, #fff ${value}%, white 100%)`
  })

progressBar.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #000 0%, #000 ${value}%, #fff ${value}%, white 100%)`
})


// playPauseButton.addEventListener('click', () => {
//     console.log("мяу");
// });

// const playPauseButton = document.querySelector('.play-pause-button');
// const audio = document.getElementById('audio');
// const audio2 = document.getElementById('audio2');
// const cover = document.querySelector('.cover');
// const trackTitle = document.querySelector('.track-title');
// const trackArtist = document.querySelector('.track-artist');

// const prevButton = document.getElementById('prev-button');
// const nextButton = document.getElementById('next-button');

// const currentTime = document.querySelector('.current-time');
// const duration = document.querySelector('.duration');

const volumeMuteButton = document.querySelector('.volume-mute-button');

let isMuted = false;

volumeMuteButton.addEventListener('click', () => {
    console.log('мяу');
    if (audio.volume > 0 && !isMuted) {
        audio.volume = 0;
        isMuted = true;
        volumeMuteButton.classList.remove('volume');
        volumeMuteButton.classList.add('mute');
        volumeBar.value = 0;
        volumeBar.style.background = `linear-gradient(to right, #000 0%, #000 ${volumeBar.value}%, #fff ${volumeBar.value}%, white 100%)`;
    } else {
        audio.volume = parseFloat(volumeBar.value) / 100;
        isMuted = false;
        volumeMuteButton.classList.remove('mute');
        volumeMuteButton.classList.add('volume');
        volumeBar.value = 40;
        volumeBar.style.background = `linear-gradient(to right, #000 0%, #000 ${volumeBar.value}%, #fff ${volumeBar.value}%, white 100%)`;
    }
});

volumeBar.addEventListener('input', () => {
    audio.volume = parseFloat(volumeBar.value) / 100;
    if (audio.volume === 0) {
        isMuted = true;
        volumeMuteButton.classList.remove('volume');
        volumeMuteButton.classList.add('mute');
    } else {
        isMuted = false;
        volumeMuteButton.classList.remove('mute');
        volumeMuteButton.classList.add('volume');
    }
});

audio.volume = parseFloat(volumeBar.value) / 100;



// let isPlaying = false;
// let currentTrack = 1;

// const tracks = [
//     {
//         title: 'R U Mine?',
//         artist: 'Arctic Monkeys',
//         src: './audio/Track1_Arctic-monkeys_r_u_mine.mp3',
//         coverSrc: './image/Cover1_Arctic_Monkeys.jpg',
//         duration: '03:20'
//     },
//     {
//         title: 'Dark Necessities',
//         artist: 'Red Hot Chilli Peppers',
//         src: './audio/Track2_RHCP_Dark_Necessities.mp3',
//         coverSrc: './image/RHCP_cover.jpg',
//         duration: '05:02'
//     }
// ];

// function loadTrack(trackIndex) {
//     const track = tracks[trackIndex];
//     audio.src = track.src;
//     cover.src = track.coverSrc;
//     trackTitle.textContent = track.title;
//     trackArtist.textContent = track.artist;
    //    duration.textContent = track.duration;
//     audio.load();
// }

// function playPause() {
//     if (isPlaying) {
//         audio.pause();
//         isPlaying = false;
//         playPauseButton.textContent = 'Play';
//     } else {
//         audio.play();
//         isPlaying = true;
//         playPauseButton.textContent = 'Pause';
//     }
// }

// function nextTrack() {
//     currentTrack = (currentTrack + 1) % tracks.length;
//     loadTrack(currentTrack);
//     playPause();
// }

// function prevTrack() {
//     currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
//     loadTrack(currentTrack);
//     playPause();
// }

// function updateProgressBar() {
//     const percent = (audio.currentTime / audio.duration) * 100;
//     progressBar.value = percent;
//     const minutes = Math.floor(audio.currentTime / 60);
//     const seconds = Math.floor(audio.currentTime % 60);
//     currentTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
// }

// audio.addEventListener('ended', nextTrack);
// audio.addEventListener('timeupdate', updateProgressBar);
// progressBar.addEventListener('input', () => {
//     const seekTime = (progressBar.value / 100) * audio.duration;
//     audio.currentTime = seekTime;
// });

// // playPauseButton.addEventListener('click', playPause);


// nextButton.addEventListener('click', nextTrack);
// prevButton.addEventListener('click', prevTrack);

// loadTrack(currentTrack);