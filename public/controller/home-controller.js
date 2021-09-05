app.controller('home-controller', function ($scope, $http, Auth) {

    $scope.vault = []; // Inizializzo array vault

    // Elimino account dal vault con id passato dalla view
    $scope.removeAccount = function (id) {
        var index = $scope.vault.indexOf(id); // Trovo l'indice dell'elemento con l'id
        $scope.vault.splice(index, 1); // Elimino la cella con l'indice trovato
        $scope.postVault(); // Salvo il vault sul server
    };

    // Aggiungo un nuovo account al vault
    $scope.createAccount = function () {
        // Creo l'oggetto newAccount dai dati inseriti nel form
        var newAccount = {
            id: genID(),
            service: $scope.form.service,
            username: $scope.form.username,
            email: $scope.form.email,
            password: $scope.form.password,
            url: $scope.form.url
        }
        $scope.vault.push(newAccount); // Aggiungo all'array vault il nuovo account
        $scope.postVault(); // Salvo il vault sul server
        $scope.form = angular.copy(null); // Pulisco il form
        $('#createAccount').modal('hide'); // Chiudo il modal aperto
    };

    // Recupero dal server il vault
    $scope.getVault = function () {
        $http({
            method: 'POST',
            url: '/api/vault/getVault',
            data: { authToken: Auth.isLoggedIn().authToken },
            headers: { 'Content-Type': 'application/json' }
        }).then(function success(response) {
            $scope.vault = angular.copy(JSON.parse(openVault(response.data.vault, Auth.isLoggedIn().vaultToken)));
        }, function error(response) {
            console.log("Error: " + response.data);
        });
    };

    // Salvo sul server il vault
    $scope.postVault = function () {
        $http({
            method: 'POST',
            url: '/api/vault/postVault',
            data: JSON.stringify({ authToken: Auth.isLoggedIn().authToken, vault: closeVault(JSON.stringify($scope.vault), Auth.isLoggedIn().vaultToken) }),
            headers: { 'Content-Type': 'application/json' }
        }).then(function success(response) {
            console.log(response);
        }, function error(response) {
            console.log("Error: " + response.data);
        });
    };

    $scope.getVault();

});