import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String , required: true},
  category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory", required: true},
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
  winner: { type: mongoose.Schema.Types.ObjectId, ref: "Bid" },
  status: {
    type: String,
    enum: ["upcoming", "active", "over"],
    default: "upcoming",
  },
  location: {type:String },
  image:{type:String,required:true},
  startingPrice: { type: Number, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
}, 
{
  timestamps: true,
});

const Auction = mongoose.model("Auction", auctionSchema);


export default Auction;