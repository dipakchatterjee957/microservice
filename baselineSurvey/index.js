import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import baselineSurveyRouter from './src/router/baselineSurvey.router.js';

dotenv.config();
const PORT = process.env.PORT

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/bflp/dev/baselineSurvey', baselineSurveyRouter);
app.get('/', (req, res) => {
    res.send('BaselineSurvey Service');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});