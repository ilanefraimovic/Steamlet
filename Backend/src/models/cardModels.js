// src/models/userModel.js
class Card {
  constructor(body) {
      this.id = body.id;
      this.set_id = body.set_id;
      this.term = body.term;
      this.definition = body.definition;
      this.create_date = body.create_date;
  }
}

module.exports = Card;
