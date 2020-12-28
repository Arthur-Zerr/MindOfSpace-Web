export default class PlayerForLoginDto {

    Username = "";
    Password = "";

    constructor(obj) {
        this.Username = "";
        this.Password = "";

        for (var prop in obj) this[prop] = obj[prop];
    }
}