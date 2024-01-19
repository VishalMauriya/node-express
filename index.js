const express = require('express'); 
const app = express(); 
const path = require('path')
const bodyParser = require('body-parser');
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./utils/db');
const user = require('./models/user');
const { log } = require('console');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now().toString() + '-' + file.originalname
      cb(null, uniqueSuffix)
    }
  })

  const upload = multer({ storage: storage })
  
  // var sql = "CREATE TABLE IF NOT EXISTS users (email VARCHAR(255), password VARCHAR(255), imagepath VARCHAR(255))";
  // db.execute(sql)
  // .then(result => {
  //   // console.log(result);
  // })
  // .catch(err => {
  //   console.log('failed to create table', err)
  // })

  
  // Set EJS as templating engine 
  app.set('view engine', 'ejs');
  app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload.single('image'));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/auth', authRoutes);

app.use((err, req, res, next) => {
  res.status(500).render('error', {error: err})
})

sequelize.sync()
.then(result => {
  // console.log(result)
  app.listen(3000);
}).catch(err => {
  console.log(err)
})