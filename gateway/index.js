import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();
const PORT = process.env.PORT

const app = express();

app.use(cors())

// Route to User Service
app.use('/bflp/dev/user', createProxyMiddleware({ target: 'http://localhost:8081/bflp/dev/user', changeOrigin: true }));

// Route to baselineSurvey Service
app.use('/bflp/dev', createProxyMiddleware({ target: 'http://localhost:8082/bflp/dev', changeOrigin: true }));

app.get('/', (req, res) => {
    res.send('Gateway Service');
});

app.listen(PORT, () => {
    console.log(`Gateway Server is running on http://localhost:${PORT}`);
});