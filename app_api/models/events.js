var mongoose = require( 'mongoose' );

var locationSchema = new mongoose.Schema({
  type: {type: String, default: 'Point'},
  coordinates: []
});

var eventSchema = new mongoose.Schema({
  title: {type: String, required: true},
  category: {type: String, required: true},
  description: {type: String, required: true},
  when: {
    start: {type: Date, required: true},
    finish: {type: Date, required: false}
  },
  where: {
    address: {type: String, required: true},
    location: {
      type: locationSchema,
      required: false
    },
    country: {type: String, default: 'cl'},
    region: {
      name: {type: String, default: 'Región del Maule'},
      number: {type: Number, default: 7}
    },
    city: {type: String, default: 'Talca'}
  },
  cost: [{
    text: {type: String, required: true},
    value: {type: Number, required: true, min: 0}
  }]
});

eventSchema.index({ "when.start": 1, type: -1 });
eventSchema.index({ "where.location": '2dsphere' }, {sparse: true});
mongoose.model('Event', eventSchema);
