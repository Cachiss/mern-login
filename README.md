
## MERN LOGIN APP

This is a simple login app built with the MERN stack. This little project is for share with my colleagues and remember how to deal with "protected" routes in react using context. I add jwt authentication and use cookies to store the token in the client. If you want to recommend me better practices or something else, please feel free to do it.


## Use 
To use this app you need to clone the repo and run the following commands:

Go to client directory and run:

```bash
npm install
npm run dev
```

Then go to server directory and run:

```bash
npm install
npm start
```

Make sure to configure your .env file with your own credentials. For example:

Client: 
```bash
VITE_SERVER_URL=http://localhost:3005
```
Server: 
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-login-app
JWT_SECRET=your_secret
GOOGLE_CLIENT_ID=xxxxxxxxxxxxx
GOOGLE_CLIENT_SECRET=xxxxxxxxxxx
CLIENT_URL = http://localhost:5173
```

**Que siga la mata dando viejo**
