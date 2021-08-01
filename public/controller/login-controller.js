app.controller('login-controller', function ($scope, $http, $location, Auth) {

    $scope.submitLogin = function submit() {

        var authToken = genAuthToken($scope.user.email, $scope.user.password);
        var vaultToken = genVaultToken($scope.user.email, $scope.user.password);

        $http({
            method: 'POST',
            url: '/api/iam/login',
            data: JSON.stringify({ authToken: authToken }),
            headers: { 'Content-Type': 'application/json' }
        }).then(function success(response) {

            var user = {
                email: $scope.user.email,
                authToken: authToken,
                vaultToken: vaultToken
            };

            Auth.setUser(user);

            $location.path('/home');

        }, function error(response) {
            console.log("Error:" + response);
        });

    }
});