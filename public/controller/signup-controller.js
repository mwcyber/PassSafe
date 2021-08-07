app.controller('signup-controller', function ($scope, $http, $location) {

    $scope.submitSignUp = function submit() {

        var authToken = genAuthToken($scope.user.email, $scope.user.password);
        var vaultToken = genVaultToken($scope.user.email, $scope.user.password);
        var vault = [];

        $http({
            method: 'POST',
            url: '/api/iam/signup',
            data: JSON.stringify({ email: $scope.user.email, authToken: authToken, vault: closeVault(JSON.stringify(vault), vaultToken) }),
            headers: { 'Content-Type': 'application/json' }
        }).then(function success(response) {
            $location.path('/login');
        }, function error(response) {
            alert("Error: " + response.data);
        });

    }
});