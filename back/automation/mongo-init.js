db.createUser(
  {
      user: "user",
      pwd: "password",
      roles: [
          {
              role: "readWrite",
              db: "library"
          }
      ]
  }
);

// add new collections
db.createCollection("users");
db.createCollection("books");
db.createCollection("bookRefs");

// Initialize users
db.users.insertMany([
  { _id: ObjectId("6209880b6f43a7e034c84943"), firstName: 'John', lastName: 'Doe', books: [] },
  { _id: ObjectId("6209880b6f43a7e034c84944"), firstName: 'Jane', lastName: 'Doe', books: [] },
  { _id: ObjectId("6209880b6f43a7e034c84945"), firstName: 'Bob', lastName: 'Doe', books: [] },
])

// Initialize book references
db.bookRefs.insertMany([
  {
    _id: ObjectId("6209880b6f43a7e034c81001"),
    author: 'John Snow 1',
    title: 'Beyond the Wall',
    available: 5,
    totalQuantity: 5,
    status: 'AVAILABLE',
    excerpt:
      "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
  },
  {
    _id: ObjectId("6209880b6f43a7e034c81002"),
    author: 'John Snow 2',
    title: 'Beyond the Wall',
    available: 5,
    totalQuantity: 5,
    status: 'AVAILABLE',
    excerpt:
      "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
  },
  {
    _id: ObjectId("6209880b6f43a7e034c81003"),
    author: 'John Snow 3',
    title: 'Beyond the Wall',
    available: 5,
    totalQuantity: 5,
    status: 'AVAILABLE',
    excerpt:
      "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
  },
  {
    _id: ObjectId("6209880b6f43a7e034c81004"),
    author: 'John Snow 4',
    title: 'Beyond the Wall',
    available: 5,
    totalQuantity: 5,
    status: 'AVAILABLE',
    excerpt:
      "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
  },
  {
    _id: ObjectId("6209880b6f43a7e034c81005"),
    author: 'John Snow 5',
    title: 'Beyond the Wall',
    available: 5,
    totalQuantity: 5,
    status: 'AVAILABLE',
    excerpt:
      "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
  },
])

// Initialize books
db.books.insertMany([
  { _id: ObjectId("6209880b6f43a7e034c82001"), reference: ObjectId("6209880b6f43a7e034c81001"), status: 'AVAILABLE', owner: null },
  { _id: ObjectId("6209880b6f43a7e034c82002"), reference: ObjectId("6209880b6f43a7e034c81001"), status: 'AVAILABLE', owner: null },
  { _id: ObjectId("6209880b6f43a7e034c82003"), reference: ObjectId("6209880b6f43a7e034c81002"), status: 'AVAILABLE', owner: null },
  { _id: ObjectId("6209880b6f43a7e034c82004"), reference: ObjectId("6209880b6f43a7e034c81002"), status: 'AVAILABLE', owner: null },
  { _id: ObjectId("6209880b6f43a7e034c82005"), reference: ObjectId("6209880b6f43a7e034c81003"), status: 'AVAILABLE', owner: null },
  { _id: ObjectId("6209880b6f43a7e034c82006"), reference: ObjectId("6209880b6f43a7e034c81003"), status: 'AVAILABLE', owner: null },
  { _id: ObjectId("6209880b6f43a7e034c82007"), reference: ObjectId("6209880b6f43a7e034c81004"), status: 'AVAILABLE', owner: null },
])
