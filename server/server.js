'use strict';
///////////////////////////////////////////////////////////////////////////
// requires

const openai = require('openai')
const path = require('path');
const express = require('express');
const http = require('http')
const mysql = require('mysql');
const cors = require('cors')
const fs = require('fs')
const session = require('express-session')
const sqlconfig = require('./sqlconfig.json');
const Usystem = require('./Usystem.js')
const vision = require('@google-cloud/vision')
const google = new vision.ImageAnnotatorClient({
  key: 'AIzaSyA0DZnzUceQi8G8bH-4CFl4XD6jawq91Ws'
})

// const fileUpload = require('express-fileupload');
// const bodyParser = require('body-parser')
// const fetch = require('node-fetch');


// requires end
////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////
//  global variable

var chatgpt_key = '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'

const configuration = new openai.Configuration({
  organization: "org-4HLwiB2vbmpxsEXTy3q3jxaE",
  apiKey: chatgpt_key,
});
const chatgpt = new openai.OpenAIApi(configuration);
console.log(chatgpt)
// const response = await openai.listEngines();

global.sessionsecret = '12345678';

global.allitem = {};

global.USys = new Usystem()

global.usemysql = true;

global.sql = mysql.createConnection(sqlconfig);
sql.on('error', function (err) {
  console.log("[mysql error]", err);
});
global.sessionMiddleware = session({
  secret: sessionsecret,
  saveUninitialized: true,
  resave: false,
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  }
})

//  global variable end
////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////
// server setting

var app = express();
var server = http.createServer(app);
var staticPath = path.join(__dirname, '../Client/build');

app.use(cors())
app.use(sessionMiddleware)
// app.use(fileUpload())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Client/build'));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.set('port', process.env.PORT || 8000);



//  server setting end
/////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////
//  server function

//  load data from mysql
require('./load')()

//plugin Socket.IO 
require('./chatIO')(server)

//  server function end
///////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////
// api write here

async function test(prp, res) {
  var response = await chatgpt.createImage({
    prompt: prp,
    n: 1,
    size: "512x512"
  }
  )

  var image_url = response.data.data[0].url
  res.send({ url: image_url })
}
require('./Apis/user')(app)
require('./Apis/item')(app)
require('./Apis/listing')(app)
require('./Apis/chat')(app)
require('./Apis/other')(app)
app.get('/gpt', (req, res) => {
  test(req.query.prompt, res)
})
app.get('/google_vision', (req, res) => {
  console.log('hit')
  var file = fs.readFile('./uploads/user_9.jpg', 'base64', (err, content) => {
    const image = {
      // source: {
      //   // Try filename / path
      //   filename: path.join(__dirname, './uploads/user_9.jpg')
      // },
      // Try base64
      content
    }
    const features = [
      { type: 'OBJECT_LOCALIZATION' },
      { type: 'LABEL_DETECTION' },
      { type: 'IMAGE_PROPERTIES' }
    ]
    const request = {
      image,
      features,
    };
    // var re = {
    //   "requests": [
    //     {
    //       "image": {
    //         // 'source':{
    //         //   "imageUri": 'https://m.media-amazon.com/images/I/71quPwED9UL._AC_SX679_.jpg'
    //         // }
    //         'content': data
    //       },
    //       "features": [
    //         {
    //           "type": 'OBJECT_LOCALIZATION',
    //           "maxResults": '20',
    //         }
    //       ]
    //     }
    //   ]

    // }
    console.log(image);
    google.annotateImage(request).then((res) => {
      console.log(res);

    })
  })

  //req.query.src
  // google.labelDetection('./uploads/user_9.jpg').then((res) => {
  //   console.log(res);

  // })
})
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(staticPath, "index.html"));
// });


// end
////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////
// server start

server.listen(app.get('port'), function () {
  console.log('listening');
});

//
///////////////////////////////////////////////////////////////////////////

