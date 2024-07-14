const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use('/cors/dapi', createProxyMiddleware({
  target: 'https://www.swiggy.com',
  changeOrigin: true,
  pathRewrite: {
    '^/cors/dapi': '/dapi',
  },
  on : {
    proxyReq: (proxyReq, req, res) => {
        console.log('Proxying request:', req.url);
      },
      proxyRes: (proxyRes, req, res) => {
        console.log('Received response from target:', proxyRes.statusCode);
      },
     error: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error');
  },
  }
}));

app.get("/", (req,res) => {
  res.send("ha bhai sahi kaam chl raha hai")
})

app.listen(PORT, () => {
  console.log(`chalo ho gaya ji server`);
});
