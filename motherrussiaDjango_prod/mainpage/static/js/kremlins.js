let locations = [
    {
        name: 'Московский кремль',
        latLng: { lat: 55.7534104, lng: 37.6215856 }
    },
    {
        name: 'Казанский кремль',
        latLng: { lat: 55.8004725, lng: 49.1044946 }
    },
    {
        name: 'Нижегородский кремль',
        latLng: { lat: 56.3287724, lng: 43.9978422 }
    },
    {
        name: 'Ростовский кремль',
        latLng: { lat: 57.1851554, lng: 39.4143994 }
    },
    {
        name: 'Смоленский кремль',
        latLng: { lat: 54.7783116, lng: 32.0518049 }
    },
    {
        name: 'Новгородский кремль',
        latLng: { lat: 58.5210859, lng: 31.2754965 }
    },
    {
        name: 'Тобольский кремль',
        latLng: { lat: 58.1985531, lng: 68.2521792 }
    },
    {
        name: 'Астраханский кремль',
        latLng: { lat: 46.3497277, lng: 48.0313341 }
    },
    {
        name: 'Тульский кремль',
        latLng: { lat: 54.194424, lng: 37.6196463 }
    },
    {
        name: 'Коломенский кремль',
        latLng: { lat: 55.1053917, lng: 38.7565938 }
    },
    {
        name: 'Зарайский кремль',
        latLng: { lat: 54.7572289, lng: 38.8725166 }
    },
    {
        name: 'Псковский кремль',
        latLng: { lat: 57.8214223, lng: 28.3291981 }
    },
    {
        name: 'Рязанский кремль',
        latLng: { lat: 54.63681, lng: 39.7497928 }
    },
    {
        name: 'Вологодский кремль',
        latLng: { lat: 59.2237801, lng: 39.8818371 }
    },
]

let mapCentre = {lat: 55.7538594, lng: 37.6206391}

/*--------------------------------------------------------------Переменные-------------------------------------------------------------------------------*/
let roundCounter = 0;
let locationNumber = 0;
let buttonStatus = 1; // Отслеживает какую кнопку рядом с картой нужно показывать в данный момент см. функцию управления gameButton
let map;
let line;
let panorama;
let distance;
let markerB;
let markerA;
let latLngB;
let locationName;
let locationsForEnding = [];

/*--------------------------------------------------------------Игровой процесс--------------------------------------------------------------------------*/
function initGameProcess() {
    localStorage.setItem('name', 'kremlins');
    //Перемешивание локаций и инициализация карты--------------------------
    shuffle(locations)
    locations = locations.slice(0, 5)
    console.log(locations)
    //---------------------------------------------------------------------

    //Инициализация кнопок ------------------------------------------------
    let gameButton = document.getElementById('gameButton');
    let hintButton = document.getElementById('hintButton');
    //---------------------------------------------------------------------

    //Добавляем обработку событий нажатия на кнопку -----------------------
    gameButton.addEventListener('click', function () {
        if (buttonStatus === 1) { //При нажатии на "Подтвердить"
            locationsForEnding.push(locations[locationNumber].latLng)
            buttonStatus -= 1;
            locationNumber += 1;
            gameButton.innerText = 'продолжить';
            updateScore();

        } else { //При нажатии на "Продолжить"
            buttonStatus += 1;
            roundCounter += 1;
            gameButton.innerText = 'подтвердить';
            document.getElementById('gameButton').setAttribute("disabled", "true");
            if (roundCounter > 4) {
                localStorage.setItem('locations', JSON.stringify(locationsForEnding));
                document.location.href = "/endgame"

            }
            updateRound();
            updateMap();
        }
    });
    initMap();
}

/*----------------------------------------------------------------Инициализация карты--------------------------------------------------------------------*/
function initMap() {
    map = new google.maps.Map(document.getElementById("game-map"), {
        gestureHandling: "greedy",
        draggableCursor: 'crosshair',
        zoom: 8,
        center: mapCentre,
        disableDefaultUI: true,
        clickableIcons: false,
        mapId: "757ff880503db59",
    });

    google.maps.event.addListener(map, "click", function (event) {
        document.getElementById('gameButton').removeAttribute("disabled")
        latLngB = event.latLng;
        if (markerB && markerB.setMap) {
            markerB.setMap(null);
        }
        markerB = new google.maps.Marker({
            position: latLngB,
            map: map,
            Clickable: false,
        });
    });
    panorama = new google.maps.StreetViewPanorama(document.getElementById("game-panorama"), {
        position: locations[0].latLng,
        pov: {heading: 34, pitch: 10},
        addressControl: false,
        enableCloseButton: false,
        disableDefaultUI: true,
        showRoadLabels: false,
    });
    map.setStreetView(panorama);
}

/*-----------------------------------------------------------------Обновление карты----------------------------------------------------------------------*/
function updateMap() {
    markerA.setMap(null);
    markerB.setMap(null);
    line.setMap(null);
    map.setCenter(mapCentre);
    map.setZoom(8)
    panorama.setPosition(locations[locationNumber].latLng)
}

/*-----------------------------------------------------------------Служебные функции---------------------------------------------------------------------*/
function showDistance() {  // A - координаты точки панорамы, B - координаты точки, которую поставил игрок

    let lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 2.5
    };
    markerA = new google.maps.Marker({
        position: locations[roundCounter].latLng,
        map: map,
        Clickable: false,
    });

    line = new google.maps.Polyline({
        path: [locations[roundCounter].latLng, markerB.getPosition()],
        map: map,
        strokeOpacity: 0,
        icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '20px'
        }],
    }); // рисует линию

    distance = google.maps.geometry.spherical.computeDistanceBetween(markerA.getPosition(), markerB.getPosition());
}

function updateRound() {
    let round = document.getElementById('round');
    let i = parseInt(round.textContent)
    round.textContent = i + 1;
}

function updateScore() {
    let bounds = new google.maps.LatLngBounds();
    bounds.extend(locations[roundCounter].latLng);
    bounds.extend(markerB.position);
    showDistance();
    map.fitBounds(bounds);
    score = document.getElementById('score');
    let j = parseInt(score.textContent);
    score.textContent = j + (Math.floor((100000 * (1 / distance)) * 100) / 100);
}


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}