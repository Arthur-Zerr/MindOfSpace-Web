export default class PlayerDto {

    Id = "";
    Username = "";
    lastActive = Date.now;
    
    constructor(obj) {
        this.Id = "";
        this.Username = "";
        this.lastActive = Date.now;

        for (var prop in obj) this[prop] = obj[prop];
    }


}