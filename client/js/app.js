$(".dropdown-button").dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    //belowOrigin: false // Displays dropdown below the button
});

$(function() {
    $('#clickme').click(function() {
        $('#uploadme').click();
    });
});

$(document).ready(function() {
    $('select').material_select();
});

$('select').material_select('destroy');

$(document).ready(function() {
    $('select').material_select();
});


var app = angular.module('myApp', ["xeditable"]);


app.controller('liveDriverCtrl', ['$scope', function($scope) {
    $scope.test = "Hello world"


    $scope.drivers = [];

    var newDrivers = [{
        firstname: "Emmanuel",
        lastname: "Kipronoh"
    }, {
        firstname: "Emmanuel",
        lastname: "Kipronoh"
    }, {
        firstname: "Emmanuel",
        lastname: "Kipronoh"
    }, {
        firstname: "Emmanuel",
        lastname: "Kipronoh"
    }];

    var qualifiedDrivers = [{
        firstname: "Peter",
        lastname: "Kareoke"
    }, {
        firstname: "Peter",
        lastname: "Kareoke"
    }, {
        firstname: "Peter",
        lastname: "Kareoke"
    }, {
        firstname: "Peter",
        lastname: "Kareoke"
    }];

    var liveDrivers = [{
        firstname: "Nash",
        lastname: "Barrett"
    }, {
        firstname: "Nash",
        lastname: "Barrett"
    }, {
        firstname: "Nash",
        lastname: "Barrett"
    }, {
        firstname: "Nash",
        lastname: "Barrett"
    }];

    $scope.infor = [{
        firstname: "Emmanuel",
        lastname: "Kipronoh",
        phone: "+250784311101",
        pickup_location: "Kayciru",
        english_level: "Expert",
        experience: "7",
        route: "kayciru to town",
        outreach: "Peter Kareoke"
    }];

    $scope.displayNewDrivers = function() {

        $scope.drivers = newDrivers;
    };

    $scope.displayQualified = function() {
        $scope.drivers = qualifiedDrivers;
    };
    $scope.displayLiveDrivers = function() {
        $scope.drivers = liveDrivers;
    };
    $scope.displayTrainees = function() {
        $scope.drivers = newDrivers;
    };

}]);

// Below is the code to allow cross domain request from web server through angular.js

app.config(['$httpProvider', function($httpProvider) {

        $httpProvider.defaults.useXDomain = tsxxrue;

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }

]);

function newDriverCtrl($scope, $http, $templateCache) {
    var method = 'POST';
    var inserturl = 'http://localhost........' //Unfinished
    $scope.codeStatus = "";
    $scope.save = function() {
        var formData = {
            $scope.firstname = this.firstname,
                $scope.lastname = this.lastname,
                $scope.phone = this.phone,
                $scope.outreach = this.outreach,
                $scope.route = this.route,
                $scope.pickup_location = this.pickup_location,
                $scope.english_level = this.english_level,
                $scope.smartphone_exposure = this.smartphone_exposure,
                $scope.experience = this.experience

        };
        this.lastname = '';
        this.firstname = '';
        this.phone = '';
        this.outreach = '';
        this.route = '';
        this.pickup_location = '';
        this.english_level = '';
        this.smartphone_exposure = '';
        this.experience = '';

        var jdata = 'mydata=' + JSON.stringify(formData);
        $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.

            method: method,

            url: inserturl,

            data: jdata,

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },

            cache: $templateCache

        });
        success(function(response) {

            console.log("success"); // Getting Success Response in Callback

            $scope.codeStatus = response.data;

            console.log($scope.codeStatus);



        });

        error(function(response) {

            console.log("error"); // Getting Error Response in Callback

            $scope.codeStatus = response || "Request failed";

            console.log($scope.codeStatus);

        });

        $scope.list(); // Calling the list function in Angular Controller to show all current data in HTML

        $scope.list = function() {

            var url = 'http://localhost..'; // URL where the Node.js server is running ---UNFINISHED

            $http.get(url).success(function(data) {

                $scope.users = data;

            });

            // Accessing the Angular $http Service to get data via REST Communication from Node Server

        };

        $scope.list();


        return false;


    };
}
