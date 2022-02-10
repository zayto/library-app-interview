# Library app
Small library app for an interview process.

## Thoughtprocess
- Base Angular app for the front using [Angular CLI](https://github.com/angular/angular-cli) for a quick start
- Base NestJs app for the back using NestJs [Mongoose sample](https://github.com/nestjs/nest/tree/master/sample/14-mongoose-base) and [Queues sample](https://github.com/nestjs/nest/tree/master/sample/26-queues) from GitHub as a guideline as I've never use NestJs


## Architecture

### Frontend
- Front Angular app will connect to the NestJs backend using a REST API. All public routes to make it simpler, although we could add an authentication form and some auth state/logic on the front side (and some ACL too...). The routes could then be protected by Guards on the backend side (or just using a JWT token and JWT session management with roles) if I had more time. But for now, all public :)
- Backend will consist of the following micro-services: books (create/list/retrieve info/update..., CRUD), reception (check if a book is available to be borrowed, offer a service to collect a book), repairs (restore damaged books, notify the delivery team when the books are repaired), delivery (to put the books back on the shelves and update their state as "available", to get the books from the repair team)


### Data model
- BookReference: // Represents the book references that exist in our library 
  - id: unique book reference - ID (key)
  - author: string
  - title: string
  - excerpt: string
  - status: AVAILABLE / UNAVAILABLE / TO_ORDER_BACK
  - available: number (0+) // To keep track of the available books without having to query everything
  - totalQuantity: number (0+)
  
- Books: // Represents a real book the library owns
  - id: string (uuid) // random id for each real book we have
  - reference: string (reference to the BookReference id field)
  - status: AVAILABLE / BORROWED / IN_TRANSIT / TO_BE_PICKED / DAMAGED / LOST
  - owner: string (reference to the User id field, nullable if not borrowed)

- Users: // Represents the readers from the library that borrow books
  - id: string
  - firstName: string
  - lastName: string
  - books: string[] (array of ids to keep track of all the users borrowed books)


### Actions on the client side
- A user can list the books available in the library
- A user can borrow a book
- A user can bring back a book
- A user can submit that they have lost the book they borrowed
- A user can ask the reception to buy a new book (=> adding a task in a queue to buy the book and add it to the BookReference table and Books table for the physical book)

### Backoffice tasks
  - The reception updates the status of the book when it is brought back (DAMAGED or TO_BE_PICKED)
  - The reception gives the books either to the delivery team (new status: IN_TRANSIT) or to the repair team (for the DAMAGED books) based on the book status at the end of the day
  - The delivery team puts back all the retrieved books on the shelves (status: AVAILABLE)
  - The repair team repairs all the books and notifies the delivery team once they are done repairing (from status DAMAGED to status: TO_BE_PICKED)
  - The delivery team picks up the books from the repair team once they are notified (from status: TO_BE_PICKED to IN_TRANSIT) and puts them back on the shelves (status: AVAILABLE)

### Queues involved
- A queue when the book is received to decide if it is damaged or not and update the book status accordingly (DAMAGED or TO_BE_PICKED). This task also updates the new owner (null)
- A queue to handle the action of borrowing the books (updates the stocks, updates the owner, updates the user)
- A queue to handle the books to repair (takes 30s to repair a book and the delivery team is notified when 5 books are repaired, so they do less running around the library)
