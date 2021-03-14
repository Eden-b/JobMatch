const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const cardsRoute = require('./routes/cards');
const commentsRoute = require('./routes/comments');
const mongoose = require('mongoose');
const cors = require('cors');
const favicon = require('serve-favicon');
require('dotenv').config();

//connection to DB
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log('database is successfully connected.'))
  .catch((err) => console.log(err));
//middleWares
// app.use(favicon(path.join(dirname, 'public', 'favicon.ico')));
// app.use(cors());
app.use(express.json({ limit: '100mb' }));

//Routes
app.use('/auth', authRoute);
app.use('/users', usersRoute);
app.use('/cards', cardsRoute);
app.use('/comments', commentsRoute);

app.get('/', (req, res) => {
  res.send('hello to my app!');
});
// app.get('/favicon.ico', (req, res) => res.status(204));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('../client/build'));
// }
http.listen(PORT, () => {
  console.log(`server is up and running http://localhost:${PORT}`);
});
