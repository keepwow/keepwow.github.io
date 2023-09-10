function addScript(url) {
    document.write("<script language=javascript src="+url+"></script>");
}

// import CryptoJS from 'crypto-js/md5'
addScript("js/sha256.js")
// import './sha256'

function password() {
    var maxWrongTimes = 1;
    var password = prompt('Please enter the password:', '');
    // console.log(hashed_password)
    // var hashed_password = password

    while (maxWrongTimes < 3) {
        // var hashed_password = password
        var hashed_password = hex_sha256(password)
        // console.log(hashed_password)
        var MIMA = 'f2afd1cacb5441a5e65a7a460a5f9898b7b98b08aa6323a2e53c8b9a9686cd86'

        // if (!password) {
        //     history.go(-1);
        // }
        if (hashed_password == MIMA) {
            // alert('OK!');
            location.href='#!blog/2020-01-01-CV.md'
            break;
            // return " ";
        }
        maxWrongTimes += 1;
        password = prompt("Wrong password, try again:", "");
    }

    if (hashed_password != MIMA && maxWrongTimes == 3) {
        // history.go(-1);
        alert("Bye!");
        location.href='#!403.md';
    }
}

password()
