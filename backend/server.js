import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const port = 1337;

// Cors for frontend to make requests
app.use(cors());
app.use(express.json());

// Load products and courier charges from JSON files
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf-8'));
const courierCharges = JSON.parse(fs.readFileSync('data/courierCharges.json', 'utf-8'));

console.log(products);
console.log(courierCharges);

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Get courier charges
app.get('/courier-charges', (req, res) => {
  res.json(courierCharges);
});

// Place order logic API
app.post('/place-order', (req, res) => {
    const selectedProductIds = req.body.selectedProducts;
    const selectedProducts = products.filter(product => selectedProductIds.includes(product.id));

    // const packages = () => {
    //     let totalWeight = 0;
    //     let totalVolume = 0;
    //     let totalCost = 0;
    //     let packages = [];
    //     selectedProducts.forEach(product => {
    //         totalWeight += product.weight;
    //         totalVolume += product.volume;
    //         totalCost += product.price;
    //     });
    //     let package = {
    //         weight: totalWeight,
    //         volume: totalVolume,
    //         cost: totalCost
    //     };
    //     packages.push(package);
    //     return packages;
    // };
    res.json(selectedProducts);
    console.log(selectedProducts);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

