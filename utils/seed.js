// You can use this script to seed sample products into the database for testing.
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  {
    title: 'Classic White T-Shirt',
    description: 'Minimalist white t-shirt for everyday wear.',
    price: 19.99,
    category: 't-shirt',
    sizes: ['S', 'M', 'L'],
    imageUrl: 'https://example.com/images/white-tshirt.jpg',
    isFeatured: true
  },
  {
    title: 'Black Jogger',
    description: 'Comfortable black jogger pants.',
    price: 29.99,
    category: 'jogger',
    sizes: ['M', 'L', 'XL'],
    imageUrl: 'https://example.com/images/black-jogger.jpg',
    isFeatured: false
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Sample products seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
