import express from 'express';
import mongoose from 'mongoose';
import urlRoutes from './routes/urlRoutes';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(urlRoutes);

mongoose.connect('mongodb://localhost:27017/urlshortener').then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});