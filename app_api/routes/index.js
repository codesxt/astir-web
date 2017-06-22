var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'user'
});
var roleAuth = require('../controllers/authentication').roleAuthorization;

var ctrlEvents = require('../controllers/events');
var ctrlAuth = require('../controllers/authentication');
var ctrlUpload = require('../controllers/upload');
var ctrlUsers = require('../controllers/users');

var ctrlTest = require('../controllers/test');

var ctrlUsers = require('../controllers/users');

router.get('/users', auth, ctrlAuth.roleAuthorization(['administrator']), ctrlUsers.usersList);
router.get('/selfuser', auth, ctrlUsers.getSelfUserData);

router.get('/events', ctrlEvents.eventsList);
router.post('/events', auth, ctrlEvents.eventsCreate);
router.get('/events/:eventId', ctrlEvents.eventsReadOne);
router.put('/events/:eventId', auth, ctrlEvents.eventsUpdateOne);
router.delete('/events/:eventId', auth, ctrlEvents.eventsDeleteOne);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.get('/test/events', ctrlTest.eventsList);

router.post('/upload/:eventId', ctrlUpload.uploadBanner);

module.exports = router;
