console.log("Welcome to Spotify");
let songIndex =0;
let audioElement = new Audio('song/1.m4a');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let songBanner = document.querySelector('.container');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName:"Karma",filePath:"song/1.m4a", coverPath: "cover/1.webp",bannerPath:"banner/1.webp" },
    {songName:"Bejeweled",filePath:"song/2.m4a", coverPath: "cover/2.jpg", bannerPath:"banner/2.webp"},
    {songName:"Wildest Dreams",filePath:"song/3.m4a", coverPath: "cover/3.jpeg", bannerPath:"banner/3.webp"},
    {songName:"New Romantics",filePath:"song/4.m4a", coverPath: "cover/4.webp", bannerPath:"banner/4.webp"},
    {songName:"Mine",filePath:"song/5.mp4a", coverPath: "cover/5.png", bannerPath:"banner/5.webp"},
    {songName:"Style",filePath:"song/6.mp4a", coverPath: "cover/6.jpg", bannerPath:"banner/6.webp"},
    {songName:"Back To December",filePath:"song/7.m4a", coverPath: "cover/7.png", bannerPath:"banner/7.webp"},
    {songName:"I Know Places",filePath:"song/8.m4a", coverPath: "cover/8.webp", bannerPath:"banner/8.webp"},
    {songName:"Midnight Rain",filePath:"song/9m4a", coverPath: "cover/9.jpeg", bannerPath:"banner/9.webp"},
    {songName:"Vigilante Shit",filePath:"song/10.mp4a", coverPath: "cover/10.webp", bannerPath:"banner/10.webp"},
    
]
songItems.forEach((element, i)=>{
    
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
const updateSongBanner =()=>{
    songBanner.style.backgroundImage =`url(${songs[songIndex].bannerPath})`;
};
updateSongBanner();

const playPauseSong = (element, index) => {
    
    if (songIndex === index && !audioElement.paused) {
        // Pause the song if it's already playing
        audioElement.pause();
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
    } else {
        // Play the selected song
        makeAllPlays();
        songIndex = index;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        element.classList.remove('fa-circle-play');
        element.classList.add('fa-circle-pause');
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        updateSongBanner();
    }
};
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        document.getElementById(songIndex).classList.add('fa-circle-play');
        document.getElementById(songIndex).classList.remove('fa-circle-pause');
    }
});

// Handle play/pause click on individual song items
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        playPauseSong(e.target, index);
    });
});

// Handle next button click
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateSongBanner();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    makeAllPlays(); // Reset play buttons
    document.getElementById(songIndex).classList.add('fa-circle-pause'); // Set current song button to pause
});

// Handle previous button click
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateSongBanner();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    makeAllPlays(); // Reset play buttons
    document.getElementById(songIndex).classList.add('fa-circle-pause'); // Set current song button to pause
});

// Function to reset all play buttons to play icon
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    });
};
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});
//audio errors 
audioElement.addEventListener('error', (e) => {
    console.error(`Error occurred while playing the audio: ${songs[songIndex].songName}`, e);
    alert(`Sorry, there was an error playing the song: ${songs[songIndex].songName}. Please try another one.`);
    audioElement.pause();
    masterPlay.classList.remove('fa-pause');
    masterPlay.classList.add('fa-play');
    makeAllPlays();
});
audioElement.addEventListener('ended', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateSongBanner();
    makeAllPlays(); // Reset play buttons
    document.getElementById(songIndex).classList.add('fa-circle-pause'); // Set current song button to pause
});