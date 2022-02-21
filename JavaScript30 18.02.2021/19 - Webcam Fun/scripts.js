const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const context = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
        console.log(localMediaStream);
        //video.src = window.URL.createObjectURL(localMediaStream); // Już nie działa!
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(error => {
        console.error("Oh NO NO :((!", error);
    })
}


function paintToCanvas()
{
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        context.drawImage(video, 0, 0, width, height);
    }, 16);
}

function takePhoto()
{
    //play the sound
    snap.currentTime = 0;
    snap.play();

    //take the data out of the canvas

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'pliczek');
    link.innerHTML = `<img src="${data}" alt="pliczek" />`;
    strip.insertBefore(link, strip.firstChild);
}


getVideo();

video.addEventListener('canplay', paintToCanvas);