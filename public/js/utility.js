function genAuthToken(email, password) {
    var authToken = {
        authToken: CryptoJS.SHA256(CryptoJS.SHA256(email + password) + password).toString()
    }
    return authToken;
}

function genVaultToken(email, password) {
    var vaultToken = {
        vaultToken: CryptoJS.SHA256(email + password).toString()
    }
    return vaultToken;
}

function openVault(vault, vaultToken) {
    return CryptoJS.AES.decrypt(vault, vaultToken);
}

function closeVault(vault, vaultToken) {
    return CryptoJS.AES.encrypt(vault, vaultToken);
}

function genID() {
    var time = new Date().getTime();
    return CryptoJS.SHA1(time).toString();
}