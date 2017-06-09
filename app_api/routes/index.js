var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var cors = require('cors');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

var ctrlEvents = require('../controllers/events');
var ctrlAuth = require('../controllers/authentication');
var ctrlUpload = require('../controllers/upload');

var ctrlTest = require('../controllers/test');

router.get('/events', ctrlEvents.eventsList);
router.post('/events', auth, ctrlEvents.eventsCreate);
router.get('/events/:eventId', ctrlEvents.eventsReadOne);
router.put('/events/:eventId', auth, ctrlEvents.eventsUpdateOne);
router.delete('/events/:eventId', auth, ctrlEvents.eventsDeleteOne);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.get('/test/events', ctrlTest.eventsList);

var corsOptions = {
  origin: 'http://astir.herokuapp.com/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.post('/upload/:eventId', cors(corsOptions), ctrlUpload.uploadBanner);

module.exports = router;
