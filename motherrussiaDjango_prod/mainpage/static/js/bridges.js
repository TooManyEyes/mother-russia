let locationsCoordinates = [
    ['Литейный мост', {lat: 59.9508667, lng: 30.3493337}],
    ['Троицкий мост', {lat: 59.9468837, lng: 30.3291378}],
    ['Дворцовый мост', {lat: 59.9410713, lng: 30.3082885}],
    ['Благовещенский мост', {lat: 59.9346505, lng: 30.2895389}],
    ['Тучков мост', {lat: 59.9490079, lng: 30.2857113}],
    ['Мост Бетанкура', {lat: 59.9561468, lng: 30.2651087}],
    ['Биржевой мост', {lat: 59.9463115, lng: 30.3034866}],
    ['Большеохтинский мост', {lat: 59.9427087, lng: 30.4011907}],
    ['Мост Александра Невского', {lat: 59.9256516, lng: 30.3956367}],
    ['Володарский мост', {lat: 59.8776915, lng: 30.4535447}],
    ['Большой Обуховский (Вантовый) мост', {lat: 59.8537553, lng: 30.4916825}],
    ['Большой Петровский мост', {lat: 59.8537553, lng: 30.4916825}],
    ['Лазаревский мост', {lat: 59.9651244, lng: 30.2738374}],
    ['Каменоостровский мост', {lat: 59.9774967, lng: 30.3012994}],
    ['Ушаковский мост', {lat: 59.982548, lng: 30.3000831}],
    ['Мост Ломоносова', {lat: 59.9284032, lng: 30.3357683}],
    ['Итальянский мост', {lat: 59.9373, lng: 30.3270001}],
    ['Поцелуев мост', {lat: 59.9282183, lng: 30.2949978}],
    ['Львиный Мостик', {lat: 59.9271083, lng: 30.3015032}],
    ['Синий мост', {lat: 59.9315095, lng: 30.3082482}],
];


/*--------------------------------------------------------------Переменные-------------------------------------------------------------------------------*/
let hintCount = 0;
let roundCounter = 0;
let locationNumber = 0;
let buttonStatus = 1; // Отслеживает какую кнопку рядом с картой нужно показывать в данный момент см. функцию управления gameButton
let saintPetersburg = {lat: 59.9132206, lng: 30.169971};
let markers = [];
let test = 0;
let playerChoice;
let prevMarker = -1;
let map;
let listener;
let line;
let panorama;
let hintCircle;
let locationsForEnding = [];
/*----------------------------------------------------------------Локации--------------------------------------------------------------------------------*/


let locations = [
    {
        name: 'Поцелуев мост',
        latLng: {lat: 59.9282183, lng: 30.2949978},
        description: 'Поцелуев мост — это одно из самых романтичных мест в Санкт-Петербурге, здесь часто назначаются свидания, а прекрасный вид на Исаакиевский собор привлекает художников.' +
            'Поцелуев мост увешан замочками, которые оставляют влюбленные, из-за их огромного числа рядом даже была установлена специальная конструкция',
        hint: {lat: 59.9435657, lng: 30.3017678},
        hintRadius: 3000
    },
    {
        name: 'Ушаковский мост',
        latLng: {lat: 59.982548, lng: 30.3000831},
        description: 'Старое название моста – Строгановский. Это имя он получил в честь расположенной рядом дачи графа А.С. Строганова. После перестройки моста в 1954 году он был назван Ушаковским в память о великом русском флотоводце Ф. Ф. Ушакове.',
        hint: {lat: 59.9677284, lng: 30.2631276},
        hintRadius: 3000
    },
    {
        name: 'Синий мост',
        latLng: {lat: 59.9315095, lng: 30.3082482},
        description: '',
        hint: {lat: 59.9435657, lng: 30.3017678},
        hintRadius: 3000
    },
    {
        name: 'Львиный Мостик',
        latLng: {lat: 59.9271083, lng: 30.3015032},
        description: '',
        hint: {lat: 59.9435657, lng: 30.3017678},
        hintRadius: 3000
    },
    {
        name: 'Итальянский мост',
        latLng: {lat: 59.9373, lng: 30.3270001},
        description: '',
        hint: {lat: 59.9435657, lng: 30.3017678},
        hintRadius: 3000
    },
    {
        name: 'Мост Ломоносова',
        latLng: {lat: 59.9284032, lng: 30.3357683},
        description: '',
        hint: {lat: 59.9435657, lng: 30.3017678},
        hintRadius: 3000
    },
    {
        name: 'Каменоостровский мост',
        latLng: {lat: 59.9774967, lng: 30.3012994},
        description: '',
        hint: {lat: 59.9677284, lng: 30.2631276},
        hintRadius: 3000
    },
    {
        name: 'Лазаревский мост',
        latLng: {lat: 59.9651244, lng: 30.2738374},
        description: '',
        hint: {lat: 59.9677284, lng: 30.2631276},
        hintRadius: 3000
    },
    {
        name: 'Большой Петровский мост',
        latLng: {lat: 59.9649753, lng: 30.2549484},
        description: '',
        hint: {lat: 59.9677284, lng: 30.2631276},
        hintRadius: 3000
    },

    {
        name: 'Большой Ильинский мост',
        latLng: {lat: 59.9648744, lng: 30.4703639},
        description: '',
        hint: {lat: 59.9164032, lng: 30.5196348},
        hintRadius: 7500
    },
    {
        name: 'Большой Обуховский (Вантовый) мост',
        latLng: {lat: 59.8537076, lng: 30.4899096},
        description: '',
        hint: {lat: 59.9164032, lng: 30.5196348},
        hintRadius: 7500
    },
    {
        name: 'Володарский мост',
        latLng: {lat: 59.8776915, lng: 30.4535447},
        description: '',
        hint: {lat: 59.9164032, lng: 30.5196348},
        hintRadius: 7500
    },
    {
        name: 'Мост Александра Невского',
        latLng: {lat: 59.9256516, lng: 30.3956367},
        description: '',
        hint: {lat: 59.9164032, lng: 30.5196348},
        hintRadius: 7500
    },
    {
        name: 'Большеохтинский мост',
        latLng: {lat: 59.9427087, lng: 30.4011907},
        description: '',
        hint: {lat: 59.9164032, lng: 30.5196348},
        hintRadius: 7500
    },
    {
        name: 'Биржевой мост',
        latLng: {lat: 59.9463115, lng: 30.3034866},
        description: '',
        hint: {lat: 59.9435657, lng: 30.3017678},
        hintRadius: 3000
    },
    {
        name: 'Мост Бетанкура',
        latLng: {lat: 59.9569012, lng: 30.2649578},
        description: '',
        hint: {lat: 59.9435657, lng: 30.3017678},
        hintRadius: 3000
    },
    {
        name: 'Тучков мост',
        latLng: {lat: 59.9490079, lng: 30.2857113},
        description: '',
        hint: {lat: 59.9435657, lng: 30.3017678},
        hintRadius: 3000
    },
    {
        name: 'Благовещенский мост',
        latLng: {lat: 59.9346505, lng: 30.2895389},
        description: '',
        hint: {lat: 59.9435657, lng: 30.3017678},
        hintRadius: 3000
    },
    {
        name: 'Дворцовый мост',
        latLng: {lat: 59.9410713, lng: 30.3082885},
        description: '',
        hint: {lat: 59.9435657, lng: 30.3017678},
        hintRadius: 3000
    },
    {
        name: 'Троицкий мост',
        latLng: {lat: 59.9468837, lng: 30.3291378},
        description: '',
        hint: {lat: 59.9435657, lng: 30.3017678},
        hintRadius: 3000
    },
    {
        name: 'Литейный мост',
        latLng: {lat: 59.9508667, lng: 30.3493337},
        description: '',
        hint: {lat: 59.9435657, lng: 30.3017678},
        hintRadius: 3000
    },

    /*--Пример-- */
    /*
    {
        name: '',
        latLng: {},
        description: '',
        hints: ['']
    },
    */
]
/*--------------------------------------------------------------Игровой процесс--------------------------------------------------------------------------*/
function initGameProcess() {
    localStorage.setItem('name', 'bridges');

    //Перемешивание локаций и инициализация карты--------------------------
    shuffle(locations);
    initMap();
    locations = locations.slice(0, 5);
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
            // google.maps.event.clearListeners(map, 'click');
            updateScore();
        } else { //При нажатии на "Продолжить"

            buttonStatus += 1;
            roundCounter += 1;

            gameButton.innerText = 'подтвердить';
            document.getElementById('gameButton').setAttribute("disabled", "true");

            if (roundCounter > 4) {
                localStorage.setItem('locations', JSON.stringify(locationsForEnding));
                document.location.href = "/endgame";
            }

            playerChoice.setIcon('/static/img/bridges.png')
            markers[roundCounter - 1].setIcon('/static/img/bridges.png')
            updateRound();
            if(line){
                line.setMap(null)
            }
            updateMap();

        }
    });

    hintButton.addEventListener('click', function () {

    });
    //---------------------------------------------------------------------
}
/*----------------------------------------------------------------Инициализация карты--------------------------------------------------------------------*/
function initMap() {
    map = new google.maps.Map(document.getElementById("game-map"), {
        zoom: 10,
        center: saintPetersburg,
        disableDefaultUI: true,
        clickableIcons: false,
        mapId: "757ff880503db59",
    });

    for (let i = 0; i < locations.length; i++) {
        const bridge = locations[i];
        markers.push(new google.maps.Marker({
            position: bridge.latLng,
            title: bridge.name,
            map,
            icon: '/static/img/bridges.png',
            clickable: true,
            visible: false,
        }));
    }

    listener = new google.maps.event.addListener(map, 'zoom_changed', function () {
        let zoom = map.getZoom();
        if (zoom < 12) {
            for (let i = 0; i < markers.length; i++) {
                google.maps.event.clearListeners(markers[i], "click");
                markers[i].setVisible(false);
                markers[i].addListener("click", function (event) {
                    map.setCenter(markers[i].getPosition());
                    document.getElementById('gameButton').removeAttribute("disabled");
                    if (prevMarker >= 0) {
                        markers[prevMarker].setIcon('img/bridges.png');
                    }
                    playerChoice = markers[i];
                    markers[i].setIcon('/static/img/bridge.png');
                    prevMarker = i;
                });
            }
        } else {
            for (let i = 0; i < markers.length; i++) {
                markers[i].setVisible(true);
            }
        }
    })
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
    prevMarker = -1;
    listener = new google.maps.event.addListener(map, 'zoom_changed', function () {
        let zoom = map.getZoom();
        if (zoom <= 12) {
            for (let i = 0; i < markers.length; i++) {
                markers[i].setVisible(false);
                markers[i].addListener("click", function (event) {
                    map.setCenter(markers[i].getPosition());
                    document.getElementById('gameButton').removeAttribute("disabled");
                    if (prevMarker >= 0) {
                        markers[prevMarker].setIcon('/static/img/bridges.png');
                    }
                    playerChoice = markers[i];
                    markers[i].setIcon('/static/img/bridge.png');
                    prevMarker = i;
                });
            }
        } else {
            for (let i = 0; i < markers.length; i++) {
                markers[i].setVisible(true);
            }
        }
    })
    if (hintCircle){
        hintCircle.setMap(null);
    }
    map.setCenter(saintPetersburg);
    map.setZoom(10)
    panorama.setPosition(locations[locationNumber].latLng)

}
/*-----------------------------------------------------------------Служебные функции---------------------------------------------------------------------*/

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showDistance() {  // A - координаты точки панорамы, B - координаты точки, которую поставил игрок

    let lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 2.5
    };

    line = new google.maps.Polyline({
        path: [markers[roundCounter].getPosition(), playerChoice.getPosition()],
        map: map,
        strokeOpacity: 0,
        icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '20px'
        }],
    }); // рисует линию между двумя маркерами
}

function getHint() {
    hintCircle = new google.maps.Circle({
        strokeColor: "#8f2323",
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: "#9B3C3C",
        fillOpacity: 0.2,
        map,
        center: locations[roundCounter].hint,
        radius: locations[roundCounter].hintRadius,
    });
    map.setCenter(locations[roundCounter].hint);

}

function updateRound() {
    round = document.getElementById('round');
    let i = parseInt(round.textContent)
    round.textContent = i + 1;
}

function updateScore() {
    if (playerChoice.getTitle() === locations[roundCounter].name) {
        score = document.getElementById('score');
        let j = parseInt(score.textContent);
        score.textContent = j + 1;
        playerChoice.setIcon('/static/img/bridgeGood.png')
        listener.remove();
    }
    else {
        listener.remove();
        google.maps.event.clearListeners(markers[roundCounter], "click");
        google.maps.event.clearListeners(playerChoice, "click");
        let bounds = new google.maps.LatLngBounds();
        bounds.extend(markers[roundCounter].position);
        bounds.extend(playerChoice.position);
        showDistance();
        map.fitBounds(bounds)
        playerChoice.setIcon('/static/img/bridgeBad.png');
        markers[roundCounter].setIcon('/static/img/bridgeGood.png');
    }
}

