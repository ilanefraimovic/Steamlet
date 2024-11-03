class LoggedInUser{
    constructor(body){
        this.userId = body.userId;
        this.setIds = body.setIds
    }
}
module.exports = LoggedInUser;
