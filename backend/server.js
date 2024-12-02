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

    function optimizePackages(selectedProducts) {
        // Sort products by price in descending order
      const sortedProducts = [...selectedProducts].sort((a, b) => b.price - a.price);
      const packages = [];
    
      while (sortedProducts.length > 0) {
        const currentPackage = {
          items: [],
          totalWeight: 0,
          totalPrice: 0,
          courierPrice: 0
        };
    
        // Add products to package while respecting constraints
        for (let i = 0; i < sortedProducts.length; i++) {
          const product = sortedProducts[i];
          
          if (currentPackage.totalPrice + product.price <= 250) {
            currentPackage.items.push(product);
            currentPackage.totalWeight += product.weight;
            currentPackage.totalPrice += product.price;
            sortedProducts.splice(i, 1);
            i--;
          }
        }
    
        // Determine courier price based on weight
        currentPackage.courierPrice = getCourierPrice(currentPackage.totalWeight);
        packages.push(currentPackage);
      }
    
      return packages;
    }
    
    function getCourierPrice(weight) {
      if (weight <= 200) return 5;
      if (weight <= 500) return 10;
      if (weight <= 1000) return 15;
      return 20;
    }
    
    res.json(optimizePackages(selectedProducts));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

