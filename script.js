// video reference for local files
let video = null;

// load local video file
function loadFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    // hide upload screen and show player
    document.getElementById("uploadScreen").style.display = "none";
    document.getElementById("playerScreen").style.display = "block";

    // show custom controls for local video
    document.getElementById("controlsBar").style.display = "block";

    // create video element
    video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.controls = false;
    video.volume = 1;

    // clear old content and add video
    const videoWrap = document.getElementById("videoWrap");
    videoWrap.innerHTML = "";
    videoWrap.appendChild(video);

    // update progress while video plays
    video.addEventListener("timeupdate", updateProgress);
}

// play or pause video
function togglePlay() {
    if (!video) return;

    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// mute or unmute video
function toggleMute() {
    if (!video) return;
    video.muted = !video.muted;
}

// change volume
function changeVolume(value) {
    if (!video) return;
    video.volume = value;
}

// update progress bar and time
function updateProgress() {
    if (!video || isNaN(video.duration)) return;

    const percent = (video.currentTime / video.duration) * 100;
    document.getElementById("progressFill").style.width = percent + "%";

    // update time text
    const current = formatTime(video.currentTime);
    const total = formatTime(video.duration);
    document.getElementById("timeDisplay").innerText = `${current} / ${total}`;
}

// format seconds to minutes
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";

    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// fullscreen mode
function toggleFullscreen() {
    if (!video) return;

    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
}

// go back to upload screen
function goBack() {
    document.getElementById("playerScreen").style.display = "none";
    document.getElementById("uploadScreen").style.display = "block";

    // reset controls for next video
    document.getElementById("controlsBar").style.display = "block";

    // stop local video
    if (video) {
        video.pause();
        video = null;
    }

    // clear video area
    document.getElementById("videoWrap").innerHTML = "";
}

// load youtube video
function loadURL() {
    const url = document.getElementById("urlInput").value.trim();
    if (!url) return;

    let videoId = "";

    // normal youtube link
    if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1].split("&")[0];
    }
    // short youtube link
    else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1];
    } else {
        alert("please enter a valid youtube link");
        return;
    }

    // hide upload screen and show player
    document.getElementById("uploadScreen").style.display = "none";
    document.getElementById("playerScreen").style.display = "block";

    // hide custom controls for youtube
    document.getElementById("controlsBar").style.display = "none";

    // create iframe for youtube
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    // clear old content and add iframe
    const videoWrap = document.getElementById("videoWrap");
    videoWrap.innerHTML = "";
    videoWrap.appendChild(iframe);

    // disable local video reference
    video = null;
}
