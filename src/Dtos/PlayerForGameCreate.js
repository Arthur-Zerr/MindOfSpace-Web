export default class PlayerForGameCreateDto {

    PlayerId = "";

    constructor(obj) {
        this.PlayerId = "";

        for (var prop in obj) this[prop] = obj[prop];
    }
}