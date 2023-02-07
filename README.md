# Fail Book
-- NO FRONT END --
## Description
Node.js application powered by express and mongoose, connected to a MongoDB database. There are users. Users post thoughts, and other users can make reactions to thoughts. Users also have a friend list.
## Installation
Download the entire directory and navigate to it using the terminal of choice. You will need a MongoDB server to run this application. You will also have to install the relevant node packages using the command `npm i`. After that, run the command `node server.js` to start the server.
## Usage
There are a number of API routes available:
### User routes
- GET `/api/users` - returns a list of all users.
- GET `/api/users/##` - returns a specific user. (replace ## with the user's _id)
- POST `/api/users` - Username and email needed. Adds a new user to the database.
- PUT `/api/users/##` - Request body needed. Edits a specific user's information. (replace ## with the user's _id)
- DELETE `/api/users/##` - Deletes a specific user. (replace ## with the user's _id)
- POST `/api/users/##/friends` - Adds a new friend to the friendlist of the user with the id ##. Request body needs to contain the user id of the friend.
- DELETE `/api/users/##/friends/###` - Removes the user with id ### from the friend list of the user with id ##

### Thought routes
- GET `/api/thoughts` - returns a list of all thoughts.
- GET `/api/thoughts/##` - returns a specific thought. (replace ## with the thought's _id)
- POST `/api/thoughs` - Adds a new thought to the database.
- PUT `/api/thoughts/##` - Request body needed. Edits a specific thought. (replace ## with the thought's _id)
- DELETE `/api/thoughts/##` - Deletes a specific thought. (replace ## with the user's _id)
- POST `/api/thoughts/##/reactions` - Adds a new friend to the friendlist of the user with the id ##. Request body needs to contain the user id of the friend.
- DELETE `/api/thoughts/##/reactions/###` - Removes the reaction with reaction id ### from the thought with id ##

## Questions
If you have any questions, I can be contacted via:
- Github: [luluco92](https://github.com/luluco92)
