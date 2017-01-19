app.controller("secondCtrl", function($scope, socketFactory, $rootScope) {

    var marker;
    var circlesData;
    var myLatLngGlobal;

    $scope.GPS = GPSFunc;
    $scope.googleMap = googleMapFunc;
    $scope.addCircle = addCircleFunc;
    $scope.sendAnswer = sendAnswer;

    function GPSFunc () {

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                    console.log('latitude : ' + position.coords.latitude);
                    console.log('longitude : ' + position.coords.longitude);

                    if(socketFactory.isConnected) {
                        socketFactory.sendPosition(position.coords.latitude,  position.coords.longitude);
                    }

                    //Marker
                    var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
                    marker.setPosition(myLatLng);
                    //Map center
                    map.setCenter(myLatLng);
                    myLatLngGlobal = myLatLng;

                    if(circlesData) {
                        checkIfIn(myLatLng);
                    }
                },
               function (error) {
                    console.log(error);
               }
            );
        }
    }

    function googleMapFunc() {

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

    googleMapFunc();
    GPSFunc();

    function sendAnswer() {
        //text area
        if($scope.answer) {
            console.log($scope.answer);
        }
        //Photo
        var file = document.forms['form']['photoAnswer'].files[0];
        if(file) {
            console.log(file);
            $scope.file = file;
        }
        socketFactory.sendAnswer($scope.answer, file);
    }


    /**
     * Distance entre 2 coordonnées en km
     * @param lat_a
     * @param lon_a
     * @param lat_b
     * @param lon_b
     * @returns {number}
     */
    function distanceFunc(lat_a, lon_a, lat_b, lon_b)  {
        var a = Math.PI / 180;
        var lat1 = lat_a * a;
        var lat2 = lat_b * a;
        var lon1 = lon_a * a;
        var lon2 = lon_b * a;
        var t1 = Math.sin(lat1) * Math.sin(lat2);
        var t2 = Math.cos(lat1) * Math.cos(lat2);
        var t3 = Math.cos(lon1 - lon2);
        var t4 = t2 * t3;
        var t5 = t1 + t4;
        var rad_dist = Math.atan(-t5/Math.sqrt(-t5 * t5 +1)) + 2 * Math.atan(1);

        return (rad_dist * 3437.74677 * 1.1508) * 1.6093470878864446;
    }


    $rootScope.$on('areas', function (event, data) {

        console.log(data.length);
        for(var i = 0; i < data.length; i++) {
            //console.log(parseFloat(data[i].radius), parseFloat(data[i].center.latitude),  parseFloat(data[i].center.longitude));
            addCircleFunc(parseFloat(data[i].radius), parseFloat(data[i].center.latitude),  parseFloat(data[i].center.longitude));
        }
        circlesData = data;

        if(myLatLngGlobal) {
            checkIfIn(myLatLngGlobal);
        }
    });

    function addCircleFunc(radius, lat, lng) {
        var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: {lat: lat, lng: lng},
            radius: radius
        });
    }

    function checkIfIn(myLatLng) {
        for(var i = 0; i < circlesData.length; i++) {

            var distance = distanceFunc(myLatLng.lat, myLatLng.lng, parseFloat(circlesData[i].center.latitude),  parseFloat(circlesData[i].center.longitude));
            //console.log(distance, parseFloat(circlesData[i].radius));

            if(distance < ( parseFloat(circlesData[i].radius) / 1000)) {
                console.log("Vous etes dans la zone");
            }
        }
    }


    //Full screen img
    $('#Fullscreen').css('height', $(document).outerWidth() + 'px');
    //for when you click on an image
    $('#img-enigma').click(function () {
        var src = $(this).attr('src'); //get the source attribute of the clicked image
        $('#Fullscreen img').attr('src', src); //assign it to the tag for your fullscreen div
        $('#Fullscreen').fadeIn();
    });
    $('#Fullscreen').click(function () {
        $(this).fadeOut(); //this will hide the fullscreen div if you click away from the image.
    });

});




