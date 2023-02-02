# Reactfront
need install mysql 
run npm run "importforwindows" to create mysql database and import data from dump file
1. install nodejs
2. install MySQL (can do this later)
3. clone the project
4. open your project in vscode or othe editer
5. open a terminal in vscode or othe editer
6. type 'npm i' in the terminal when you are in the project folder.
7. type 'npm run installall' in the terminal when you are in the project folder.
8. type 'npm run importforwindows' in the terminal when you are in the project folder. (if you installed mysql)
9. create sqlconfig.json and add connection script. importforwindows commend will create a database name test
```
{
    "host": "localhost",
    "user": "your username example:root",
    "password": "password",
    "database": "test"
}
```
10. type 'npm run test' in the terminal when you are in the project folder.
11. the page should be run now 

if you get error, run 'npm run installall' to update packages.

By default test server read alldata.json for test data.
use http://localhost:8080/switchdatasorces?sorces=mysql switch to mysql
use http://localhost:8080/switchdatasorces?sorces=json  switch back.

server will listen at localhost:8080.
dev client will server at localhost:3000.
"ctrl+c" to stop debug

front end entry is in Client/src/App.js

for backend test, after success debug, type 'npm run build' in terminal, 
production front-end files will location on client/build

use react-Components for now
https://react-bootstrap.github.io/

you can choose other ui library if you want.
write you component in Components folder

server.js is node server. use to test api

some test user account
```
{
    "Cary.doe@gamil.com":"123456",
    "Jason.Davis@gamil.com":"123456",
    "Corey.Reese@gamil.com":"123456",
    "Dominique.Aguirre@gamil.com":"123456",
    "Whitney.Green@gamil.com":"123456"
}
```

thats it.



