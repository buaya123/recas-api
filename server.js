const express = require('express');

const app = express();
const cors = require('cors');
const api = require('./api');
// const pusher = require('./pusher');
const port = process.env.PORT || 3000;
// enabling CORS to accept from all origins
app.use(cors());
// express.json() and express.urlencoded() are built-in middleware functions to support JSON-encoded and URL-encoded bodies.
// to be able to get object data from the url
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//enabling CORS to accept from all origins
app.all('*', (req, res, next) => {
  console.log(`${new Date()} - request for ${req.path}`);
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}


app.get('/', (req, res) => {
  res.send('welcome to the recas-api endpoint.');
});

app.post('/reportCrime',cors(), api.reportCrime);

app.post('/editCrime', cors(),api.editCrime);

app.get('/getAllCrimes', cors(),api.getAllCrimes);

app.post('/searchCrime', cors(),api.searchCrime);

app.get('/getAllCrimeTypes',cors(), api.getAllCrimeTypes);

app.post('/getCrimeType',cors(), api.getCrimeType);

app.post('/sendLatLong', cors(),api.sendLatLong);

app.post('/register',cors(), api.register);

app.post('/login',cors(), api.login);

app.post('/getUnitLocation',cors(), api.getUnitLocation);

app.post('/getOneCrime',cors(), api.getOneCrime);

app.post('/addDispatch',cors(), api.addDispatch);

app.get('/showDispatch', cors(),api.showDispatch);

app.post('/editDispatch',cors(), api.editDispatch);

app.post('/getDispatch',cors(), api.getDispatch);

app.listen(port, () => {
  console.log(`listening on port: `+port);
});

module.exports = allowCors(handler)