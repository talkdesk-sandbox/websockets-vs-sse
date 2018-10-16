var lastId = 0;

module.exports = class Client {
  constructor(conn) {
    this.id = ++lastId;
    this.conn = conn;
  }
}