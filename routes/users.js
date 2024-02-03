const mongoose = require('mongoose');


mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  


const UserSchema = new mongoose.Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    },
    content: {
        type: String
    }
},{timestamps:true});

module.exports = mongoose.model('data', UserSchema);