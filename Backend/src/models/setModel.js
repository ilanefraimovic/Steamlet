class Set {
  constructor(body) {
      this.id = body.id;
      this.user_id = body.user_id; 
      this.name = body.name;
      this.date = body.date;
      this.count = body.count;
  }
}

module.exports = Set;