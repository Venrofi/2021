/* Get Our Elements */
const player = document.querySelector('.player'); //cały odtwarzacz
const video = player.querySelector('.viewer'); //wideo, ramka w której wyświetlany jest obraz
const progress = player.querySelector('.progress'); //pasek o długości szerokości wideo
const progressBar = player.querySelector('.progress__filled'); //pasek wypełniony na żółto ukazujący obecny moment filmu
const toggle = player.querySelector('.toggle'); //przycisk play/pause
const skipButtons = player.querySelectorAll('[data-skip]'); //przyciski -10s / +25s
const ranges = player.querySelectorAll('.player__slider'); //slidery głośności i prędkości
const fullScreen = player.querySelector('.fullscreen'); //przycisk odpowiadający za pełny ekran
/* Build out functions */


function togglePlay(){
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
//Włączanie filmu klikając na ekranie / poprzez przycisk
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

//Aktualizacja przycisku play/pause
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

//Aktualizacja paska progresu
video.addEventListener('timeupdate', handleProgress);

//Funkcjonalność przesuwania filmu w przód/tył
skipButtons.forEach(button => button.addEventListener('click', skip));

//Funkcjonalność suwaków głośności / prędkości
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

//Przesuwanie filmu przy użyciu suwaka pokazującego progress
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

//Tryb pełnoekranowy
fullScreen.addEventListener('click', () => {
    video.requestFullscreen();
})