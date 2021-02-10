const mongoose = require('mongoose');
// import mongoosePaginate from 'mongoose-paginate';

const formSchema = mongoose.Schema({
  form_id: {
    type: String,
  },
  data: {},
  createdTime: {
    type: Date,
    default: Date.now
  }
});

// formSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('dynamic_forms_data', formSchema);