Four - Re (Recycling made simple!)

This web application is built on MEAN stack. So you have to install Angular 8.x, Mongo 4.x, Express 4.x & Node 12.x.
In order to ease out the dependency installations, you will also need to install 'npm'.

(For Angular & Express installation, use npm.)
(For Mongo installation, it's better to follow: https://docs.mongodb.com/manual/installation/)
(For Node installation, follow: https://nodejs.org/en/download/)

After we have installed on our local, use these commands to test:
node --version (should print 12.x)
ng --version (should print Angular CLI : 8.x alongwith some other details)
mongo --version (should print 3.x or 4.x)


Run MongoDB (on MacOS/Linux):
After checking the version of mongo, simply type in your terminal:

mongod --dbpath /usr/local/var/mongodb
(NOTE: --dbpath will create the database in the path given against it)

The above command will create logs will create some logs. Do not stop close this terminal.
If you wish to stop the mongod service, hit: Ctrl+C on the same terminal.


When this is done, to query your database, go to another window in terminal & type:

mongo

After this, type:

use four-re
(four-re is the name of the schema that we will be using in mongo)

Mongo Collections used:
usermodels: Stores user information (his/her contact no, name etc)
requestpickupmodels: Stores Drop Bags information
pickuppinmodels: This stores random 4 digit PIN codes that are associated to a Drop Bags.

To query any collection, type: db.collection_name.find() (For more mongo queries, use mongo tutorial)

Start/Stop Server:

Currently, this project uses Express & renders HTML static pages using this framework itself.
To run Express server, go to the root directory of this project (four-re) & type:

npm start
(Press Ctrl+C to stop the server)

TODO

1. Write current technical tech stack archicture.
2. Information about dev ops (how to host it on ther environments).
3. Test Cases.
