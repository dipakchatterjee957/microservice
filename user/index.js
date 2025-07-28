import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './src/router/user.router.js';

dotenv.config();
const PORT = process.env.PORT

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/user', userRouter);
app.get('/', (req, res) => {
    res.send('User Service');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});