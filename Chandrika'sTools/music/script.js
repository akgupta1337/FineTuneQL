var player;
let form = document.getElementById('form')
let videoId
const YOUTUBE_API_KEY = "AIzaSyD0faAZQxBQp-faN4STx3LrBvTKTTxBs8o"
const GymSongs = "PLvVNZNdaO6cHX6dpEUuacIx8p-L8lZBW6"
const LoveSongs = "PLvVNZNdaO6cHs24e6EVIRXN9nOysHVPF5"
const DanceSongs = "PLvVNZNdaO6cEa2kPNoopEMXcrfoHqCJSi"
const SadSongs = "PLvVNZNdaO6cFP17t5FtN5dz7J4nlCgoAe"
const SpirtualSongs = "PLvVNZNdaO6cHQ5ELpCz1DhRXj4AxXrS-U"

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let query = document.getElementById('url').value;
    try {
        let videoId = await fetchId(query);
        console.log("videoid", videoId);
        changeVideo(videoId);
    } catch (err) {
        console.error("Error fetching video ID:", err);
    }
});


async function loadPlaylist(){
    try{
        let playlist = await getPlaylist();
        player.loadPlaylist(playlist);
        player.setShuffle(true);
        player.setLoop(true);
        console.log('Loaded Playlist');

    }catch(err){
        console.error("Error", err);
    }
    finally{
        console.log("Next");
        setTimeout(() => player.nextVideo(), 500);
    }
}
async function fetchId(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&type=video&part=snippet&q=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
        throw new Error("No videos found for the query");
    }

    const id = data.items[0].id.videoId;
    console.log("API response:", data);
    return id;
}

async function getPlaylist(){
    let playlistId = SadSongs;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${YOUTUBE_API_KEY}&part=contentDetails&playlistId=${playlistId}&maxResults=100`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data.items || data.items.length === 0) {
        throw new Error("Invalid Playlist");
    }
    const videoIds = data.items.map(item => item.contentDetails.videoId);
    
    return videoIds;


}

function changeVideo(videoId){
    player.loadVideoById(videoId);
    player.playVideo();
}

function playVideo(){
    player.playVideo();
}
function pauseVideo(){
    player.pauseVideo();
}
function nextVideo(){
    player.nextVideo();
}
function prevVideo(){
    player.previousVideo();
}

function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    height: '500',
    width: '900',
    videoId: '',
    playerVars: {
    'playsinline': 1,
    'autoplay': 0,
    'controls':0
    },
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
}

function onPlayerReady(event) {

}

function onPlayerStateChange(event) {

}

