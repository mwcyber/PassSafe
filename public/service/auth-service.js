app.factory('Auth', function () {
    var user

    return {
        setUser: function (aUser) {
            user = aUser;
        },
        isLoggedIn: function () {
            // ritorno oggetto user se c'è qualcosa altrimenti false
            return (user) ? user : false;
        }
    }
})