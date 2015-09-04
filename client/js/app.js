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


function myFunction() {
    alert("I am an alert box!");
}
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


myShortList = [
    'New Drivers',
    'Qualified new drivers',
    'Live Drivers',
    'Drivers in Training Phase'
]


var app = angular.module('myApp', ["xeditable"]);

// Below is the code to allow cross domain request from web server through angular.js

app.config(['$httpProvider', function($httpProvider) {

        $httpProvider.defaults.useXDomain = true;

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }

]);

app.factory('driver', ['$http', function($http) {
    function driver(driverData) {
        if (driverData) {
            this.setData(driverData);
        }
    }

    driver.prototype = {
        setData: function(driverData) {
            angular.extend(this, driverData);
        },
        load: function(id) {
            var scope = this;
            $http.get('ourserver/drivers/' + driverId).success(function(data) {
                scope.setData(driverData);
            });

        },

        delete:function(){
            $http.delete("ourserver/drivers/" + driverId);

        },
        update: function(){
            $http.put('ourserver/drivers'+ driverId, this);
        },
        getImageUrl: function (width,height){
            return "our/image/service"+this.driver.id
        }
    }

}]);



app.controller('newDriverCtrl', ['$scope', '$http', function($scope, $http) {


    $scope.driver = {
        lastname: $scope.lastname,
        phone: $scope.phone,
        outreach: $scope.outreach,
        route: $scope.route,
        pickup_location: $scope.pickup_location,
        english_level: $scope.english_level,
        smartphone_exposure: $scope.smartphone_exposure,
        experience: $scope.experience,
        firstname: $scope.firstname

    }

    $scope.driverData = [];


    function restItem() {
        $scope.lastname = '';
        $scope.firstname = '';
        $scope.phone = '';
        $scope.outreach = '';
        $scope.route = '';
        $scope.pickup_location = '';
        $scope.english_level = '';
        $scope.smartphone_exposure = '';
        $scope.experience = '';
    }

    resetItem();

    //var jdata = 'mydata=' + JSON.stringify(formData);

    $scope.submitForm = function() {

        var driv = $scope.driver;
        $http.put("ourserver/drivers" + driverId, $scope.driver);

    };

    $scope.removeDriver = function(data) {
        if (confirm('Do you really want to delete this?')) {
            $http['delete']('ourserver/drivers/' + data.id).success(function() {
                $scope.driver.splice($scope.driver.indexOf(data), 1);
            });
        }
    };

    $scope.updateDriver = function() {
        $http.put("ourserver/drivers" + driverId, $scope.driver);
    }

    $scope.getDriverInfo = function() {
        $http.get('ourserver/drivers/' + driverId).success(function(data) {
            $scope.driverData.push(data);
        });
    }




}]);






app.controller('driversCtrl', ['$scope', '$http', function($scope, $http) {


    $scope.shortlists = myShortList;

    $scope.shortlist = {
        shortlists: ['Liver Drivers']
    };

    $scope.checkAll = function() {
        $scope.shortlist.shortlists = angular.copy($scope.shortlists);
    };

    $scope.getShortlists = function() {
        return $scope.shortlist.shortlists;
    }

    $scope.addShortlist = function() {
        listName = prompt("Enter name of new Shortlist");
        myShortList.push(listName);
    }


    /*
    $scope.check = function(value, checked) {
        var idx = $scope.shortlist.shortlists.indexOf(value);
        if (idx >= 0 && !checked) {
            $scope.shortlist.shortlists.splice(idx, 1);
        }

        if (idx < 0 && checked) {
            $scope.shortlist.shortlists.push(value);
        }
    };*/

    /*
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
    $scope.myFunction = function() {
        alert("I am an alert box!");
        $('#v').click(function() {

            var r = $('<input type="button" value="new button"/>');

            $("#myCollection").append(r);
        });
    };*/



    /*
    $scope.updateItem = function(data) {

        $scope.driver = data;


    }*/



}]);
