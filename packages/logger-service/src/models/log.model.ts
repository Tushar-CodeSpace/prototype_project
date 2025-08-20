import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    service: { type: String },
    level: { type: String },
    message: { type: String },
    metadata: { type: Object },
    timestamp: { type: Date, default: Date.now }
}, { versionKey: false });

export default mongoose.model("Log", logSchema);
