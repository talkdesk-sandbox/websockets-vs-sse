module.exports = class Subscriptions {
  constructor() {
    this.subscriptions = {};
  }

  subscribe(query, client) {
    if (query in this.subscriptions) { 
      this.subscriptions[query].push(client);
    } else {
      this.subscriptions[query] = [client]; 
    }
  }

  unsubscribe(query, client) {
    if (query in this.subscriptions) {
      this.subscriptions[query] = this.subscriptions[query].filter( c => c.id != client.id);
    }
  }

  subscribers(query) {
    return this.subscriptions[query] || [];
  }
}

