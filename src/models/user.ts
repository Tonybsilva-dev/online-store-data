import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  description: String,
  phone: String,
  cpf: String,
  address: {
    street: String,
    suite: String,
    uf: String,
    city: String,
    zipcode: String
  },
  value: Number,
});

module.exports = mongoose.model('User', UserSchema);
