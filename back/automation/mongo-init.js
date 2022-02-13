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
