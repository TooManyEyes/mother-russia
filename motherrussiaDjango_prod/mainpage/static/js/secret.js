let locations = [
    {
        name: 'Родина-Мать',
        latLng: {lat: 55.6888176, lng: 52.304616}
    },
    {
        name: 'Памятник Владимиру Высоцкому',
        latLng: {lat: 55.6878867, lng: 52.2887902}
    },
    {
        name: 'Бульвар Энтузиастов',
        latLng: {lat: 55.743477, lng: 52.4186151}
    },
    {
        name: 'Мэрия города',
        latLng: {lat: 55.741849, lng: 52.4004557}
    },
    {
        name: 'Площадь Азатлык',
        latLng: {lat: 55.7409096, lng: 52.4041328}
    },
    {
        name: 'Набережная в Новом городе',
        latLng: {lat: 55.7394435, lng: 52.3646223}
    },
    {
        name: 'Ул. Центральная',
        latLng: {lat: 55.6996959, lng: 52.3162337}
    },
    {
        name: 'Ледовый дворец и Sunrise City',
        latLng: {lat: 55.7533887, lng: 52.4106218}
    },
    {
        name: 'ДК "КАМАЗ',
        latLng: {lat: 55.7562135, lng: 52.4294984}
    },
    {
        name: 'Ак Батыр',
        latLng: {lat: 55.7442907, lng: 52.4207223}
    },
    {
        name: 'Сквер им. Габдуллы Тукая',
        latLng: {lat: 55.7360987, lng: 52.4035469}
    },
    {
        name: 'Комсомольский парк',
        latLng: {lat: 55.6824527, lng: 52.2879822}
    },
    {
        name: 'Мечеть Нур-Ихлас',
        latLng: {lat: 55.7673772, lng: 52.4177691}
    },
    {
        name: 'ЗАГС',
        latLng: {lat: 55.7532584, lng: 52.3914429}
    },
    {
        name: 'Храм Космы и Дамиана',
        latLng: {lat: 55.7135653, lng: 52.365767}
    }
]
let mapCentre = {lat: 55.7258687, lng: 52.2013311}


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
    localStorage.setItem('name', 'secret');
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
    locationName = document.getElementById('locationName');
    locationName.textContent = locations[0].name;
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

    locationName = document.getElementById('locationName');
    locationName.textContent = locations[roundCounter].name;
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