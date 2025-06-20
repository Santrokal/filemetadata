var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');

const storage = multer.diskStorage({})
const upload = multer({storage: storage})

var app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'File not selected' });
  }

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});



app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
