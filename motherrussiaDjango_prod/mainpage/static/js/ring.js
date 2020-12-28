let locations = [
    {
        name: 'Сергиев Посад',
        latLng: {lat: 56.310116, lng: 38.1298335}
    },
    {
        name: 'Переславль-Залесский',
        latLng: {lat: 56.7361264, lng: 38.8524575}
    },
    {
        name: 'Ростов',
        latLng: {lat: 57.1843974, lng: 39.4149331}
    },
    {
        name: 'Ярославль',
        'latLng': {lat: 57.6228236, lng: 39.8924097}
    },
    {
        name: 'Кострома',
        latLng: {lat: 57.7772125, lng: 40.894648}
    },
    {
        name: 'Иваново',
        latLng: {lat: 57.0150469, lng: 40.9688925}
    },
    {
        name: 'Суздаль',
        latLng: {lat: 56.4274938, lng: 40.4404642}
    },
    {
        name: 'Владимир',
        latLng: {lat: 56.1266469, lng: 40.3970226}
    },
    {
        name: 'Храм Сорока мучеников Севастийских',
        latLng: {lat: 56.7354853, lng: 38.828335}
    },
    {
        name: 'Никольский монастырь',
        latLng: {lat: 56.7318381, lng: 38.8376581}
    },
    {
        name: 'Свято-Троицкий Данилов мужской монастырь',
        latLng: {lat: 56.7201048, lng: 38.8381286}
    },
    {
        name: 'Федоровский женский монастырь',
        latLng: {lat: 56.7126208, lng: 38.817916}
    },
    {
        name: 'Церковь Николы Рубленого',
        latLng: {lat: 57.6223145, lng: 39.8982612}
    },
    {
        name: 'Церковь Иоанна Предтечи',
        latLng: {lat: 57.6107727, lng: 39.8563699}
    },
    {
        name: 'Храм Ильи Пророка',
        latLng: {lat: 57.6266764, lng: 39.8940841}
    },
    {
        name: 'Церковь Богоявления',
        latLng: {lat: 57.6218148, lng: 39.8863597}
    },
    {
        name: 'Спасо-Яковлевский монастырь',
        latLng: {lat: 57.1749448, lng: 39.392363}
    },
    {
        name: 'Музей деревянного зодчества и крестьянского быта',
        latLng: {lat: 56.412722, lng: 40.4405281}
    },
    {
        name: 'Храм Михаила Архангела',
        latLng: {lat: 56.4100368, lng: 40.4627334}
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
    localStorage.setItem('name', 'ring');
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