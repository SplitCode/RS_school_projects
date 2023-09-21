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


