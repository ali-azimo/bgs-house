import mongoose from "mongoose";

const mininSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  imageUrls: {
    type: Array,
    required: true,
  },
  userRef: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Minin = mongoose.model('Minin', mininSchema);
export default Minin;
