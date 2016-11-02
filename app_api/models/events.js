var mongoose = require( 'mongoose' );

var eventSchema = new mongoose.Schema({
  title: {type: String, required: true},
  category: {type: String, required: true},
  description: {type: String, required: true},
  when: {
    start: {type: String, required: true},
    finish: {type: String, required: false}
  },
  where: {type: String, required: true},
  cost: [{
    text: {type: String, required: true},
    value: {type: Number, required: true, min: 0}
  }]
});

mongoose.model('Event', eventSchema);
