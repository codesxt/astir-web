var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
var mongoose = require('mongoose');
var Event = mongoose.model('Event');

aws.config.update({
  region: 'us-east-1',
  signatureVersion: 'v4',
});
var s3 = new aws.S3({});

var localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});

var s3Storage = multerS3({
  s3: s3,
  bucket: 'astir-images',
  metadata: function (req, file, cb) {
    cb(null, {fieldName: file.fieldname});
  },
  key: function (req, file, cb) {
    cb(null, req.params.eventId+".png")
  }
});

var upload = multer({
  storage: s3Storage
}).single('file');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.uploadBanner = function(req, res){
  Event.count({
    _id: req.params.eventId
  }, function(err, count){
    if(count!=1){
      sendJSONresponse(res, 400, {
        "message": "Se está intentando subir una imagen a un evento que no existe."
      })
    }else{
      upload(req, res, function(err){
        if(err){
          res.json({error_code:1,err_desc:err});
          return;
        }
        Event.findOneAndUpdate({
          _id: req.params.eventId
        }, {
          $set: {
            banner: req.file.location
          }
        },
        {
          new: true
        }, function(err, doc) {
          sendJSONresponse(res, 200, {
            type: "events",
            id: req.params.eventId,
            data: doc
          })
        });
      })
    }
  })
  console.log("Subiendo banner para el evento: "+ req.params.eventId);
}
