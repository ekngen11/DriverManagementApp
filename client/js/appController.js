'user strict'

//var app = angular.module('signUp', []);

var app = angular.module('signUp', []);
app.controller('userListCtrl', function($scope) {
    $scope.email = this.email;
});


/*
app.controller('userListCtrl', function($scope) {

    //$scope.username = this.username;
    $scope.email = this.email;

    $scope.$watch('password', function() {
        $scope.test();
    });
    $scope.$watch('confirmpass', function() {
        $scope.test();
    });
    $scope.test = function() {
        if ($scope.this.password !== $scope.this.confirmpass) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        if ($scope.edit && (!$scope.fName.length ||
                !$scope.lName.length ||
                !$scope.passw1.length || !$scope.passw2.length)) {
            $scope.incomplete = true;
        }

    };
});*/
// Below is the code to allow cross domain request from web server through angular.js

app.config(['$httpProvider', function($httpProvider) {

        $httpProvider.defaults.useXDomain = tsxxrue;

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }

]);

/*
myApp.directive('pwCheck', function() {
    return {
        require: 'ngModel',
        ink: function(scope, elem, attrs, ctrl) {
            scope.$watch(attrs.pwCheck, function(password) {
                var isValid = ctrl.$viewValue === password;
                ctrl.$setValidity('pwmatch', isValid);
            });
        }


    }
});
*/



/*
Controlllers*/

function userListCtrl($scope, $http, $templateCache) {
    var method = 'POST';
    var inserturl = 'http://localhost:1212/insertangularmongouser'
    $scope.codeStatus = "";
    $scope.save = function() {
        var formData = {
            'email': this.email,
            'username': this.username,
            'password': this.password,
            'confirmpass': this.confirmpass

        };

        this.username = '';
        this.password = '';
        this.email = '';
        this.confirmpass = '';

        var jdata = 'mydata=' + JSON.stringify(formData) //The data is to be string

        $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.

            method: method,

            url: inserturl,

            data: jdata,

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },

            cache: $templateCache

        }).

        success(function(response) {

            console.log("success"); // Getting Success Response in Callback

            $scope.codeStatus = response.data;

            console.log($scope.codeStatus);



        }).

        error(function(response) {

            console.log("error"); // Getting Error Response in Callback

            $scope.codeStatus = response || "Request failed";

            console.log($scope.codeStatus);

        });

        $scope.list(); // Calling the list function in Angular Controller to show all current data in HTML

        return false;

    };

    /*
    $scope.list = function() {

        var url = 'http://localhost:1212/getangularusers'; // URL where the Node.js server is running 

        $http.get(url).success(function(data) {

            $scope.users = data;

        });

        // Accessing the Angular $http Service to get data via REST Communication from Node Server

    };

    $scope.list();
    */
}
