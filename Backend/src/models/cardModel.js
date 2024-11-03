// src/models/userModel.js
class Card {
  constructor(body) {
      this.id = body.id;
      this.userId = body.userId;
      this.setId = body.setId;
      this.term = body.term;
      this.definition = body.definition;
      this.create_date = body.create_date;
  }
}

module.exports = Card;
