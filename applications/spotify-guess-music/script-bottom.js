function handleScreens(stage) {
    const screens = ["start-screen", "playlists-screen", "music-screen", "end-screen"];

    screens.forEach((screen) => {
        document.getElementById(screen).style.visibility = "hidden";
    });

    document.getElementById(screens[stage]).style.visibility = "visible";
    sessionStorage.setItem('spotify_stage', stage);
}

function signInSpotify() {
    const client_id = 'd2ea99ee1d854b8ba0de286c8e988ae2';
    const redirect_uri = 'http://127.0.0.1:5501';
    const scope = 'playlist-read-private playlist-read-collaborative user-follow-read';

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

    const dataToSend = { 'type': 'redirect', 'url': url };
    sendMessage(dataToSend);
}

function sendMessage(dataToSend) {
    window.top.postMessage(dataToSend, '*');
}

function getHeaders() {
    return {
        headers: {
            Authorization: `'Bearer ${sessionStorage['spotify_access_token']}'`
        },
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var currentMusic;
var currentTentative = 1;
var tracksName = [];

const inputGuess = document.getElementById("input-guess");

function guessMusic() {
    const music_guess = inputGuess.value;

    if(music_guess.toLowerCase() === currentMusic.name.toLowerCase()) {
        handleScreens(3);
        return;
    }

    addTentative();
    sendMessage({'type': 'action', 'action': 'shake', 'duration': 300});
}



function addTentative() {
    currentTentative++;

    if(currentTentative === 6) {
        handleScreens(3);
    }

    playMusic();
    document.getElementById("current-tentative").innerText = currentTentative;
}

function playMusic() {
    var audio = new Audio(currentMusic.preview_url);
    audio.play();
    audio.volume = 0.3;

    sessionStorage.setItem('spotify_tentative', currentTentative);
    sessionStorage.setItem('spotify_music_duration', currentMusic.duration);
    sessionStorage.setItem('spotify_music_mode', 'playing');
    
    setInterval(() => {
        audio.pause();
        sessionStorage.setItem('spotify_music_mode', 'paused');
    }, currentTentative * 1000);
}

function selectOptionInput(value) {
    console.log()
    inputGuess.value = value;
}

function selectPlaylist(playlist_id) {
    const fields = "total,items(track(preview_url,name))"
    fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?fields=${fields}`, getHeaders()).then((res) => {
        res.json().then((response) => {
            const tracksList = response.items;

            const musicHintsDiv = document.getElementById("music-hints");
            musicHintsDiv.innerHTML = "";
            tracksList.forEach((item) => {
                tracksName.push(item.track.name);
                musicHintsDiv.innerHTML += `<div onclick="selectOptionInput('${item.track.name}')"><span>${item.track.name}</span></div>`;
            });

            // not to choose a song that doesn't have a preview url
            let track_choosed = null;
            while(!track_choosed?.preview_url) {
                let random_number = randomIntFromInterval(0, response.total);
                track_choosed = tracksList[random_number].track;
                if(track_choosed.preview_url) {
                    currentMusic = track_choosed;
                    playMusic();
                }
            }
        });
    })
}

function getPlaylistsUser() {
    fetch(`https://api.spotify.com/v1/me/playlists`, getHeaders()).then((res) => {
        if (res.ok) {
            res.json().then((playlists) => {
                // console.log(playlists);
                playlists.items.forEach(playlist => {
                    document.querySelector(".playlists").innerHTML += `<div class="playlist-item" onclick="selectPlaylist('${playlist.id}'); sessionStorage.setItem('spotify_playlist_name', '${playlist.name}'); handleScreens(2);">${playlist.name}</div>`;
                });
            });
        }
        else {
            console.error(res);
            handleScreens(0);
        }
    });
}

if (sessionStorage['spotify_access_token'] && sessionStorage['spotify_access_token'] != '') {
    handleScreens(1);
    sessionStorage.setItem('spotify_stage', 1);
}
else {
    handleScreens(0);
}

getPlaylistsUser();

inputGuess.addEventListener('keyup', (e) => {
    const inputValue = e.target.value;
    const hintsDiv = document.getElementById("music-hints");
    
    hintsDiv.innerHTML = "";
    tracksName.forEach((name) => {
        if(name.toLowerCase().includes(inputValue.toLowerCase())) {
            hintsDiv.innerHTML += `<div onclick="selectOptionInput('${name}')"><span>${name}</span></div>`;
        }
    });
});

inputGuess.addEventListener('focusin', (e) => {
    document.getElementById("music-hints").style.visibility = "visible";
});

inputGuess.addEventListener('focusout', (e) => {
    setTimeout(() => {
        document.getElementById("music-hints").style.visibility = "hidden";
    }, 200);
});

// document.addEventListener('keypress', (e) => {
//     handleEventKey(e.key);
// });

window.addEventListener('message', (e) => {
    // handleEventKey(e.data);
});