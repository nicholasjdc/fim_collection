const mongoose = require('mongoose');

const Schema = mongoose.Schema

const bookEntrySchema = new Schema({
    entryNumber: {
        type:String,
        required:true,
        unique: true
    },
    authorAgg:{
      type:String
    },
    author:{
        type:String,
    },
    authorc:{
        type:String,
    },
    authorp: {
        type: String
    },
  title: {
    type: String,
  },
  titlec: {
    type: String,
  },
  titlep: {
    type: String, 
  },
  publication: {
    type: String,
  },
  pageCount: {
    type: String,
  },
  ISBN: {
    type: String,
  },
  seriesTitle: {
    type: String,
  },
  seriesTitlec: {
    type: String,
  },
  note: {
    type: String,
  },
  resource: {
    type: String, 
  },
  languageCode: {
    type: Array,
  },
  subjects: {
    type: Array,
  },
  missingFields: {
    type: Array,
  }

}, {timestamps:true});
module.exports = mongoose.model('Entries', bookEntrySchema); 