// src/models/userModel.js
class User {
    constructor(body) {
        this.id = body.id;
        this.userName = body.userName;
        this.password = body.password;
        this.createDate = body.createDate;
    }
  }
  
module.exports = User;
  