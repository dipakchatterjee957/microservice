import express from 'express';
import dotenv from 'dotenv';
import cros from 'cors';
import createProxyMiddleware from 'http-proxy-middleware';

dotenv.config();
const PORT = process.env.PORT

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cros())

// Route to User Service
app.use('/user', createProxyMiddleware({ target: 'http://localhost:8081', changeOrigin: true }));

// Route to Product Service
app.use('/product', createProxyMiddleware({ target: 'http://localhost:8082', changeOrigin: true }));

app.get('/', (req, res) => {
    res.send('Gateway Service');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});