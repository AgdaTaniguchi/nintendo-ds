const applications = [
    {
        'name': "Gallery",
        'icon': "../../media/icons/power.svg",
        'pathName': "/gallery",
    },
    {
        'name': "Spotify: Guess The Music",
        'icon': "../../media/icons/plug.svg",
        'pathName': "/spotify-guess-music",
    },
    {
        'name': "Kiara The Flappy Dog",
        'icon': "../../media/icons/battery.svg",
        'pathName': "/kiara-flappy-dog",
    },
    {
        'name': "Run, Kiara!",
        'icon': "../../media/icons/signal.svg",
        'pathName': "/run-kiara",
    },
    {
        'name': "Let's Dance",
        'icon': "../../media/gallery/01.jpg",
        'pathName': "/lets-dance",
    },
    {
        'name': "Soccer Head",
        'icon': "../../media/icons/plug.svg",
        'pathName': "/soccer-head",
    },
    {
        'name': 'Settings',
        'icon': "../../media/icons/power.svg",
        'pathName': "/settings",
    },
]

// Navigation
const applicationsDivs = [];

let indexAppSelected = 0;

function showApplications() {
    appsContainer = document.querySelector(".applications");
    applications.forEach((app, index) => {
        const div = document.createElement("div");
        div.classList.add("application");
        if(index == 1) {
            div.classList.add("selected");
        }
        div.innerHTML = `
        <div class="box-image">
            <img src=${app.icon}>
        </div>
        <span>SELECT</span>`;
        appsContainer.appendChild(div);
        applicationsDivs.push(div);
    });
}

function handleAppSelected(action) {
    if (action === 'right') {
        if (indexAppSelected >= applicationsDivs.length - 1) return;
        indexAppSelected++;
    }
    else {
        if (indexAppSelected <= 0) return;
        indexAppSelected--;
    }

    move();
    document.querySelector('.selected').classList.remove('selected');
    applicationsDivs[indexAppSelected].classList.add('selected');

    document.getElementById("name-application").innerText = applications[indexAppSelected].name;
}

function move() {
    const appWidth = 90;
    applicationsDivs.forEach(application => {
        application.style.transform = `translateX(calc(-50% - ${appWidth * indexAppSelected}px))`;
    });
}

showApplications();
handleAppSelected('right');

const handleEventKey = (key) => {
    switch (key.toLowerCase()) {
        case 'a':
            handleAppSelected('left');
            break;
        case 'd':
            handleAppSelected('right');
            break;
        case 'enter':
            selectApp();
    }
}

function selectApp() {
    const dataToSend = applications[indexAppSelected];
    dataToSend.type = "changeApp";
    window.top.postMessage(dataToSend, '*');
}

document.addEventListener('keypress', (e) => {
    handleEventKey(e.key);
});

window.addEventListener('message', (e) => {
    handleEventKey(e.data);
});