import mongoose from 'mongoose';
import shortId from 'shortid';

const urlSchema = new mongoose.Schema({
    originalUrl: String,
    slug: {
        type: String,
        unique: true,
        default: shortId.generate
    }
});

export default mongoose.model('Url', urlSchema);