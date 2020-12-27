function initMap() {
    document.getElementById("name").value = localStorage.getItem('name')
    delete localStorage.name
    locations = JSON.parse(localStorage.locations)
    let markers = [];


    let moscow = {lat: 55.7230366, lng: 37.5972661};
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: moscow,
        disableDefaultUI: true,
        streetViewControl: true,
        mapId: "757ff880503db59",
        gestureHandling: "greedy",
        draggableCursor: 'crosshair'
    });

    let bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < locations.length; i++) {
        bounds.extend(locations[i]);
        markers.push(new google.maps.Marker({
            position: locations[i],
            map,
            clickable: true,
        }));
    }
    map.fitBounds(bounds)


}

function setLike(){
    document.getElementById("like").checked = true;
    document.getElementById("like-btn").disabled = true;
}