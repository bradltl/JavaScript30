/* get the elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
//const progressBar = player.querySelector('.progress__filled');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/* build functions */
function togglePlay () {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    
    /*
    if(video.pause) {
        video.play();
    } else {
        video.pause();
    }
    */
}


function updateButton () {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    //console.log(icon);

}

function skip () {
    video.currentTime += parseFloat(this.dataset.skip);

}

function handleRangeUpdate() {
    //console.log(this.value);
    //console.log(this.name);
    video[this.name] = this.value;
}


function handleProgress() {
    const percent = (video.currentTime / video.duration) * 640;
    progressBar.style.flexBasis = `${percent}px`;


}

function scrub (e) {
    //console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}



/* hook up event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', handleProgress);
//video.addEventListener('progress', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mouseMove', (e) => mousedown && scrub(e));


toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mouseMove', handleRangeUpdate));
