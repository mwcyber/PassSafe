function genAuthToken(email, password) {
    var authToken = CryptoJS.SHA256(CryptoJS.SHA256(email + password) + password).toString()
    return authToken;
}

function genVaultToken(email, password) {
    var vaultToken = CryptoJS.SHA256(email + password).toString()
    return vaultToken;
}

function openVault(vault, vaultToken) {
    var decryptData = CryptoJS.AES.decrypt(vault, vaultToken);
    return decryptData.toString(CryptoJS.enc.Utf8);
}

function closeVault(vault, vaultToken) {
    return CryptoJS.AES.encrypt(vault, vaultToken).toString();
}

function genID() {
    var time = new Date().getTime();
    return CryptoJS.SHA1(time.toString()).toString();
}