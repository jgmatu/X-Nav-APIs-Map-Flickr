$(function() {
        var mymap = L.map('mapid').fitWorld().locate({setView: true, maxZoom: 16})
        var accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);
        var marker = L.marker([40.2838, -3.8215]).addTo(mymap);
        marker.bindPopup('<a href="http://www.etsit.urjc.es">ETSIT</a> (<a href="http://www.urjc.es">URJC</a>)');
        marker.openPopup();

        var popup = L.popup();

        function onMapClick(e) {
                popup.setLatLng(e.latlng);
                popup.setContent("You clicked the map at " + e.latlng.toString());
                popup.openOn(mymap);
        }
        mymap.on('click', onMapClick);

        function onLocationFound(e) {
                var radius = e.accuracy / 2;

                L.marker(e.latlng).addTo(mymap)
                .bindPopup("You are within " + radius + " meters from this point").openPopup();

                L.circle(e.latlng, radius).addTo(mymap);
        }
        mymap.on('locationfound', onLocationFound);

        function onLocationError(e) {
                alert(e.message);
        }
        mymap.on('locationerror', onLocationError);
})
