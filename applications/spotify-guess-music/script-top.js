// document.addEventListener('keypress', (e) => {
//     handleEventKey(e.key);
// });

// window.addEventListener('message', (e) => {
//     handleEventKey(e.data);
// });

// sessionStorage.getItem("spotify_music_mode") {}

const changeScreen = (stage) => {
    const screens = ['initial-screen', 'welcome-screen', 'guess-song-screen', 'final-screen'];

    screens.forEach((screen) => {
        document.getElementById(screen).style.visibility = "hidden";
    });

    document.getElementById(screens[stage]).style.visibility = "visible";
}

changeScreen(sessionStorage.getItem('spotify_stage'));

window.addEventListener("storage", (e) => {
    if((e.key === "spotify_music_mode" || e.key === "spotify_tentative") && e.newValue === "playing") {
        const duration = sessionStorage.getItem("spotify_music_duration");
        const tentative = sessionStorage.getItem("spotify_tentative");
        document.querySelector(":root").style.setProperty('--widthRemainingMusic', tentative / 5 * 100 + '%');
        document.querySelector(":root").style.setProperty('--currentMusicTime', tentative + 's');

        document.querySelector('.music-progress').classList.remove('animate');
        void document.querySelector('.music-progress').offsetWidth;
        document.querySelector('.music-progress').classList.add('animate');
    }

    if(e.key === "spotify_stage") {
        changeScreen(sessionStorage.getItem('spotify_stage'));
    }

    document.getElementById("playlist-name").innerHTML = sessionStorage.getItem("spotify_playlist_name");
});