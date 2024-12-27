# backend-fun-quiz

## How To Deploy
Just go to the root directory and create a .env file, writing these variables to this file:

PORT=

MONGO_URI=mongodb://admin:password@localhost:27017/quiz-platform?

authSource=admin

JWT_SECRET=

Then deploy the database with this command:

```
docker-compose up -d
```

Then start the backend project by:

```
npm start
```

That's it. :)
