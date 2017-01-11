app.controller("secondCtrl", function($scope) {

    var marker;

    $scope.GPS = function () {

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                    console.log(position);

                    //Marker
                    var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
                    marker.setPosition(myLatLng);
                    //Map center
                    map.setCenter(myLatLng);
                },
               function (error) {
                    console.log(error);
               }
            );
        }
    }

    $scope.googleMap = function () {

        var myLatLng = {lat: 0, lng: 0};

        map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 8
        });

        marker = new google.maps.Marker({
            map: map
        });

        //Popup
        var infowindow = new google.maps.InfoWindow({
            content: "Vous êtes ici !"
        });
        //Link marker and popup
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    }

    $scope.googleMap();
    $scope.GPS();

});



