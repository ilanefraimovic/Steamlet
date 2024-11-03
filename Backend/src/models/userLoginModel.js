class LoggedInUser{
    constructor(body){
        this.userId = body.userId;
        this.sets = body.sets
    }
}
module.exports = LoggedInUser;
