const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var app = express();
const notifier = require('node-notifier');


app.use(express.static('public'));
app.use(express.static('views')); 
app.use(express.static('routes')); 

const menu = require('./routes/menu');
const createcoupon = require('./routes/createcoupon');
const scancoupon = require('./routes/scancoupon');

const {google} = require('googleapis')
const keys = require('./keys.json')

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'views')));


//app.use(express.static('public'));
//app.use(express.static('views'));
//app.use('/',menu);
//app.use('/create',createcoupon);
//app.use('/scan',scancoupon);

app.get('/', function(req, res) {
  res.sendFile(__dirname+'/views/create.html');
});

//app.get('/create', function(req, res) {
//  res.sendFile(__dirname+'/views/create.html');
//});

//app.get('/scan', function(req, res) {
//  res.sendFile(__dirname+'/views/scan.html');
//});



//app.get('/generateQR', function(req, res) {
//  res.sendFile(__dirname+'/views/create.html');
//});

app.post('/generateQR', function(req, res) {
  // console.log(req.body.receiverp);
  // console.log(req.body.receivers);
  // console.log(req.body.conseiller);
  // console.log(req.body.rdv);
  // console.log(req.body.leader);
  // res.json([{ 
  //   sheet: 'ok' 
  // }]) 

  

  //this send back a token of authorisation
  client.authorize(function(err,tokens){
    if(err){
      console.log('pas bon'+err);
      res.status(200).send({ sheet: 'ko' });
       return;
    } else {
        
       
      asyncCaller(client,req);
        // res.status(200).send({ sheet: 'ok' });
    };

  });
});

async function asyncCaller(client,req) {
  console.log(await gsadd(client,req)); 
  
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Process form submit




//spreadsheet manipulation
async function gsadd(cl,req){

  
    const gsapi = google.sheets({version:'v4',auth:cl});

    let senddata = {values:[req.body.qrstring,req.body.receiverp,req.body.receivers,req.body.conseiller,req.body.rdv,req.body.leader,'Non']};
    //let senddata = {values:['A','B','C','D','E']};

    const updopt = {
        spreadsheetId: '1vhdjMKPTdZItCkMzAlZwvSHky7hCdHRRj8bNFkT2N1c',
        range: 'Personnes!A2',
        insertDataOption: "INSERT_ROWS",
        valueInputOption: "USER_ENTERED",
        resource: {values: senddata}
    };

    let mypush = await gsapi.spreadsheets.values.append(updopt).then(function(response) {
      // Handle the results here (response.result has the parsed body).
      //console.log("Response", response);
    },function(err) { 
      //console.log("Execute error", err); 
    });
    return mypush ;

  
}

module.exports = app;
