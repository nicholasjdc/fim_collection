const mongoose = require('mongoose');

const Schema = mongoose.Schema

const bookEntrySchema = new Schema({
    entryNumber: {
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true,
    },
    authorc:{
        type:String,
        required:true,
    },
    authorp: {
        type: String
    },
  title: {
    type: String,
    required: true
  },
  titlec: {
    type: String,
    required: true
  },
  titlep: {
    type: String, 
    required: true
  },
  publication: {
    type: String,
    required: true
  },
  pageCount: {
    type: String,
    required: true
  },
  ISBN: {
    type: String,
    required: true
  },
  seriesTitle: {
    type: String,
    required: true
  },
  seriesTitlec: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: true
  },
  resource: {
    type: String, 
    required: true
  },
  languageCode: {
    type: Array,
    required: true
  },
  subject: {
    type: Array,
    required: true
  },
  missingFields: {
    type: Array,
    required: true
  }

}, {timestamps:true});
module.exports = mongoose.model('Entries', bookEntrySchema); //automatically create Workouts