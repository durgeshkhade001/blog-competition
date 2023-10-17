// const dotenv = require('dotenv');
// const express = require('express');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// const ejs = require('ejs');
// const bodyParser = require('body-parser');
// const path = require('path');
// const cors = require('cors');

// const blogRoutes = require('./routes/blogRoutes');
// const uploadFilesRoutes = require('./routes/uploadFilesRoutes');
// const userRoutes = require('./routes/userRoutes');

// dotenv.config();

// const app = express();

// app.use(cors());

// app.use(morgan('dev'));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(express.static('public'));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.get('/upload', (req, res) => {
//     res.render('upload');
// });

// app.use('/api/blog', blogRoutes);
// app.use('/api/uploadFiles', uploadFilesRoutes);
// app.use('/api/user', userRoutes);

// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.get('/index', (req, res) => {
//     res.redirect('/');
// });

// app.get('/article', (req, res) => {
//     res.render('article');
// });

// app.get('/login', (req, res) => {
//     res.render('login');
// });

// app.get('/register', (req, res) => {
//     res.render('register', { message: '' });
// });

// app.get('/dashboard', (req, res) => {
//     res.render('dashboard');
// });

// app.get('/newblog', (req, res) => {
//     res.render('newblog');
// });

// app.get('/review123123', (req, res) => {
//     res.render('reviewblogs');
// });






















// // Connect to MongoDB & start the server
// const port = 3000;
// const mongoUri = 'mongodb+srv://durgesh:Abcd%40123123@atlascluster.8blie8z.mongodb.net/blogcompetition';
// process.stdout.write('\x1Bc');
// console.log('Connecting to MongoDB...');
// mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Start the server
//     app.listen(port, () => {
//       console.log(`Server started on port ${port}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });



const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('*', (req, res) => {
  res.redirect('https://arcyglobal.com');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
