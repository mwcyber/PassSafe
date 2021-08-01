var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/pages/landing.html'
        })
        .when('/login', {
            templateUrl: '/pages/login.html',
            controller: 'login-controller'
        })
        .when('/signup', {
            templateUrl: '/pages/signup.html'
        })
        .when('/home', {
            templateUrl: 'pages/home.html',
            controller: 'home-controller'
        });
});

app.run(function ($rootScope, $location, Auth) {

    $rootScope.$on('$routeChangeStart', function () {

        if ($location.url() == '/home' && !Auth.isLoggedIn()) {
            $location.path('/login');
        }

    });

});
