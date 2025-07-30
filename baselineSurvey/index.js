import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import allRouter from './src/router/allRouter.js';

dotenv.config();
const PORT = process.env.PORT

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/bflp/dev', allRouter);
app.get('/', (req, res) => {
    res.send('BaselineSurvey Service');
});

app.listen(PORT, () => {
    console.log(`Baselien Server is running on http://localhost:${PORT}`);
});