export default class TokenInformationDto {

    JWTToken = "";
    Expires = Date.now;

    constructor(obj){
        this.JWTToken = "";
        this.Expires = Date.now;

        for (var prop in obj) this[prop] = obj[prop];
    }
}