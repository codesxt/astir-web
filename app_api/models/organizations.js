var mongoose = require( 'mongoose' );
var ObjectId = mongoose.Schema.ObjectId;

var locationSchema = new mongoose.Schema({
  type: {type: String, default: 'Point'},
  coordinates: []
},{ _id : false });

var organizationSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  where: {
    address: {type: String, required: true},
    location: {
      type: locationSchema,
      required: false
    }
  },
  phone: {type: String, required: false},
  email: {type: String, required: false},
  website: {type: String, required: false},
  lastActivity: {type: Date, required: true},
  representant: {type: ObjectId, required: true, index: {unique: true}}
});

organizationSchema.index({ "where.location": '2dsphere' }, {sparse: true});
mongoose.model('Organization', organizationSchema);
