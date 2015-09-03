/*
$(function() {
    $('#fileupload').fileupload({
        dataType: 'json',
        add: function(e, data) {
            data.context = $('<button/>').text('Upload')
                .appendTo(document.body)
                .click(function() {
                    data.context = $('<p/>').text('Uploading...').replaceAll($(this));
                    data.submit();
                });
        },
        done: function(e, data) {
            data.context.text('Upload finished.');
        }
    });
});
$('#fileupload').fileupload({
   
    progressall: function(e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .bar').css(
            'width',
            progress + '%'
        );
    }
});
*/

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

// Below is the code to allow cross domain request from web server through angular.js

app.config(['$httpProvider', function($httpProvider) {

        $httpProvider.defaults.useXDomain = true;

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }

]);



app.controller('newDriverCtrl', ['$scope', '$http', function($scope, $http) {

    function restItem() {
        this.lastname = '';
        this.firstname = '';
        this.phone = '';
        this.outreach = '';
        this.route = '';
        this.pickup_location = '';
        this.english_level = '';
        this.smartphone_exposure = '';
        this.experience = '';
    }



    var formData = [

        $scope.lastname = this.lastname,
        $scope.phone = this.phone,
        $scope.outreach = this.outreach,
        $scope.route = this.route,
        $scope.pickup_location = this.pickup_location,
        $scope.english_level = this.english_level,
        $scope.smartphone_exposure = this.smartphone_exposure,
        $scope.experience = this.experience,
        $scope.firstname = this.firstname

    ];

    resetItem();


    var jdata = 'mydata=' + JSON.stringify(formData);

    $scope.submitForm = function() {
        var driv = $scope.driver;

        var url = 'http://localhost..'; // URL where the Node.js server is running ---UNFINISHED
        $http.get(url).success(function(data) {
            $scope.items.push(data);
        }).

        error(function(data, status, headers, config) {
            alert(data.summary);
        });

    };



    $scope.removeItem = function(data) {
        if (confirm('Do you really want to delete this?')) {
            $http['delete']('/driver/' + data.id).success(function() {
                $scope.items.splice($scope.items.indexOf(data), 1);
            });
        }
    };

    $http.get('/employee/find').success(function(data) {
        for (var i = 0; i < data.length; i++) {
            data[i].index = i;
        }

        $scope.items = data;
    });


}]);






app.controller('driversCtrl', ['$scope', '$http', function($scope, $http) {


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

    $scope.driver = {
        firstname: "Emmanuel",
        lastname: "Kipronoh",
        phone: "+250784311101",
        pickup_location: "Kayciru",
        english_level: "Expert",
        experience: "7",
        route: "kayciru to town",
        outreach: "Peter Kareoke"
    };

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


    /*
    $scope.updateItem = function(data) {

        $scope.driver = data;


    }*/



}]);
