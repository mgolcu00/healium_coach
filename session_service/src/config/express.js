const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Diğer gerekli importlar ve ayarlamalar buraya eklenebilir


// Body-parser middleware'ini kullanmak için
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(cors({credentials: true, origin: true}));

// Rota tanımlamalarını ve yönlendirmelerini başka bir dosyada yapacağız, bu yüzden burada export ediyoruz
module.exports = app;
