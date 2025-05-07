# LaterTakeHome

So I will give general overview of how this project works.

The Project is written completely in typescript, and using node.js in the backend with express as the middleware. 
Sqlite was chosen as the db just for convenices, and the package used to interact with the db is better-sqlite3.

The Project Structure is as follows. 

Src (Contains all backend code)
    Index.ts (root express app)
    DB (contains database code)
    docs(contains a swagger.ts for config)
        This project is also slight self documented in way , has open api documentation.
    Routes (contains routes)
        links.ts (contains get all links endpoint, and appendParameters) 

#Relevant commands 
To run the api.
Build the code -  npm run build 
Run the code - npm run start

for simplicities sake the ui is very simple, does not use any frontend frameworks, just vanilla js, and tailwind for css. 
ui
    index.html (contains all ui code)
    app.ts (contains minimal javascript)

#Relevant commands 
To run the ui.
Compile the ts code to javascript - npm run compile
run the ui - npm run serve 


#for bonus 

I have also included a dockerfile for the api

to create a docker image , bring your terminal to the root folder.

docker build -t "image name" .

example 
docker build -t "LinkAppendTestEnv" .