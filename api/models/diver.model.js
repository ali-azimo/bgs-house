import mongoose from "mongoose";

const diverSchema = new mongoose.Schema({
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

const Diver = mongoose.model('Diver', diverSchema);
export default Diver;
