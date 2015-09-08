var app = angular.module('myApp', ["xeditable"]);

// Below is the code to allow cross domain request from web server through angular.js

app.config(['$httpProvider', function($httpProvider) {

        $httpProvider.defaults.useXDomain = true;

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }

]);

app.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http', function($http) {
    this.uploadFileToUrl = function(file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            })
            .success(function() {})
            .error(function() {});
    }
}]);

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

        delete: function() {
            $http.delete("ourserver/drivers/" + driverId);

        },
        update: function() {
            $http.put('ourserver/drivers' + driverId, this);
        },
        getImageUrl: function(width, height) {
            return "our/image/service" + this.driver.id + '/' + width + '/' + height;
        }
    };
    return driver;

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
        firstname: $scope.firstname,
        status: "new",
        id_number:$scope.id_number

    }

    $scope.driverData = [];


    function resetForm() {
        $scope.lastname = '';
        $scope.firstname = '';
        $scope.phone = '';
        $scope.outreach = '';
        $scope.route = '';
        $scope.pickup_location = '';
        $scope.english_level = '';
        $scope.smartphone_exposure = '';
        $scope.experience = '';
        status = '';
        id_number='';

    }

    resetItem();

    //var jdata = 'mydata=' + JSON.stringify(formData);

    $scope.submitForm = function() {

        
        $http.put("ourserver/drivers" + id_number, $scope.driver);

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

mydrivers = [];

app.controller('qualifiedDriverCtrl', ['$scope', '$http', function($scope, $http) {


    var driverData = {};


    $scope.driver = {
        lastname: $scope.lastname,
        phone: $scope.phone,
        outreach: $scope.outreach,
        route: $scope.route,
        pickup_location: $scope.pickup_location,
        english_level: $scope.english_level,
        smartphone_exposure: $scope.smartphone_exposure,
        experience: $scope.experience,
        firstname: $scope.firstname,
        status: "Qualified New Driver",
        yellow_card: '',
        license: '',
        contract: '',
        national_id: '',
        id_number: $scope.id_number

    }
    $scope.submit = function() {
        if (form.file.$valid && $scope.license && !$scope.license.$error) {
            $scope.upload($scope.license);
        }
        if (form.file.$valid && $scope.yellow_card && !$scope.yellow_card.$error) {
            $scope.upload($scope.yellow_card);
        }

        if (form.file.$valid && $scope.national_id && !$scope.national_id.$error) {
            $scope.upload($scope.national_id);
        }
        if (form.file.$valid && $scope.contract && !$scope.contract.$error) {
            $scope.upload($scope.contract);
        }
        //mydrivers["driver1"] = $scope.driver;
        console.log("This is the driver", $scope.driver);
        mydrivers.push($scope.driver);
        //$http.put("ourserver/drivers" + $scope.id_number, $scope.driver);
        resetForm();

    };


    function resetForm() {
        $scope.lastname = '';
        $scope.firstname = '';
        $scope.phone = '';
        $scope.outreach = '';
        $scope.route = '';
        $scope.pickup_location = '';
        $scope.english_level = '';
        $scope.smartphone_exposure = '';
        $scope.experience = '';
        status = '';
        $scope.id_number = '';

    }


    //var jdata = 'mydata=' + JSON.stringify(formData);

    $scope.removeDriver = function(data) {
        if (confirm('Do you really want to delete this?')) {
            $http['delete']('ourserver/drivers/' + data.id_number).success(function() {
                $scope.driver.splice($scope.driver.indexOf(data), 1);
            });
        }
    };

    $scope.updateDriver = function() {
        $http.put("ourserver/drivers" + id_number, $scope.driver);
    }



}]);

var myDrivers = [];


app.controller('driversCtrl', ['$scope', '$http', function($scope, $http) {

    myShortList = [
        'New Drivers',
        'Qualified new drivers',
        'Live Drivers',
        'Drivers in Training Phase'
    ]

    $scope.drivers = [];
    

    var newDrivers = [{
        firstname: "Emmanuel",
        lastname: "Kipronoh",
        id_number: "123456"
    }, {
        firstname: "Peter",
        lastname: "Kipronoh",
        id_number: "123456"
    }, {
        firstname: "Jackson",
        lastname: "Kipronoh",
        id_number: "654321"
    }, {
        firstname: "Philip",
        lastname: "Kipronoh"
    }];

    var driver = {
        firstname: "Emmanuel",
        lastname: "Kipronoh",
        phone: "+250784311101",
        pickup_location: "Kayciru",
        english_level: "Expert",
        experience: "7",
        route: "kayciru to town",
        outreach: "Peter Kareoke",
        id_number: "123456",
        status: "New Driver"
    };
    var driver1 = {
        firstname: "Peter",
        lastname: "Kareoke",
        phone: "+250784311101",
        pickup_location: "Kayciru",
        english_level: "Expert",
        experience: "7",
        route: "kayciru to town",
        outreach: "Peter Kareoke",
        id_number: "000000",
        status: "New Driver"
    };
    $scope.driverInfo = {};



    $scope.shortlists = myShortList;

    $scope.shortlist = {
        shortlists: ['Liver Drivers']
    };

    $scope.getShortlists = function() {
        return $scope.shortlist.shortlists;
    }

    $scope.addShortlist = function() {
        listName = prompt("Enter name of new Shortlist");
        myShortList.push(listName);
    }

    $scope.deleteShortlist = function() {
            var listName = prompt('Enter name of shortlist to be deleted');
            var index = myShortList.indexOf(listName);
            myShortList.splice(index, 1);
        }
        /*
        $scope.updateDriver=function(){

        }*/

    $scope.getDrivers = function(shortlist) {
        /*
        $http.get('ourserver/drivers/' + shortlist).success(function(data) {
            $scope.drivers.push(data);
        });*/
        if (shortlist == "New Drivers") {
            $scope.drivers = newDrivers;
        } else if (shortlist == "Qualified new drivers") {
            $scope.drivers = qualifiedDrivers;
        } else if (shortlist == "Live Drivers") {
            $scope.drivers = liveDrivers;
        } else {
            $scope.drivers = qualifiedDrivers;
        }

    }

    $scope.getDriverInfo = function(id_number) {

        if (id_number == "123456") {
            $scope.driverInfo = driver;
        }

        if (id_number == "000000") {
            $scope.driverInfo = driver1;
        }

        /*
        $http.get('ourserver/drivers/' + id_number).success(function(data) {
            $scope.driverData.push(data);
        });*/
    }

    var qualifiedDrivers = [{
        firstname: "Peter",
        lastname: "Kareoke",
        id_number: "000000"
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



    $scope.driver = mydrivers["driver1"]

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
