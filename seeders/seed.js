const mongoose = require('mongoose');
const productModel = require('../models/product.model');
const mongoConnection = require('../config/mongo.connection');
require('dotenv').config();
const products = [
    { name: 'Laptop Dell', description: 'Powerful laptop for work', price: 1200, category: 'Electronics', stock: 15, imageUrl: 'laptop-dell.jpg' },
    { name: 'iPhone 15', description: 'Latest iPhone model', price: 999, category: 'Electronics', stock: 30, imageUrl: 'iphone15.jpg' },
    { name: 'Samsung TV 55"', description: '4K Smart TV', price: 800, category: 'Electronics', stock: 10, imageUrl: 'samsung-tv.jpg' },
    { name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 45, category: 'Accessories', stock: 100, imageUrl: 'wireless-mouse.jpg' },
    { name: 'USB-C Cable', description: 'Fast charging cable', price: 15, category: 'Accessories', stock: 200, imageUrl: 'usb-c-cable.jpg' },
    { name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard', price: 120, category: 'Accessories', stock: 25, imageUrl: 'keyboard.jpg' },
    { name: 'Headphones Sony', description: 'Noise-cancelling headphones', price: 350, category: 'Audio', stock: 20, imageUrl: 'sony-headphones.jpg' },
    { name: 'Bluetooth Speaker', description: 'Portable wireless speaker', price: 80, category: 'Audio', stock: 50, imageUrl: 'bluetooth-speaker.jpg' },
    { name: 'Microphone RODE', description: 'Professional condenser microphone', price: 200, category: 'Audio', stock: 12, imageUrl: 'rode-mic.jpg' },
    { name: 'Webcam HD', description: '1080p HD webcam', price: 70, category: 'Accessories', stock: 40, imageUrl: 'webcam.jpg' },
    { name: 'Monitor LG 27"', description: '4K IPS monitor', price: 400, category: 'Electronics', stock: 8, imageUrl: 'monitor-lg.jpg' },
    { name: 'Graphics Card RTX', description: 'High-performance GPU', price: 800, category: 'Electronics', stock: 5, imageUrl: 'graphics-card.jpg' },
    { name: 'SSD 1TB', description: 'Fast solid state drive', price: 120, category: 'Storage', stock: 60, imageUrl: 'ssd-1tb.jpg' },
    { name: 'RAM 16GB', description: 'DDR4 RAM memory', price: 90, category: 'Storage', stock: 45, imageUrl: 'ram-16gb.jpg' },
    { name: 'Case PC', description: 'Full tower case', price: 150, category: 'Hardware', stock: 18, imageUrl: 'case-pc.jpg' },
    { name: 'Power Supply 750W', description: '80 Plus Gold PSU', price: 120, category: 'Hardware', stock: 22, imageUrl: 'psu.jpg' },
    { name: 'Motherboard ASUS', description: 'ATX gaming motherboard', price: 250, category: 'Hardware', stock: 10, imageUrl: 'motherboard.jpg' },
    { name: 'Processor Intel i9', description: 'Latest Intel processor', price: 600, category: 'Hardware', stock: 7, imageUrl: 'intel-i9.jpg' },
    { name: 'Cooling Fan', description: 'CPU cooler tower', price: 80, category: 'Hardware', stock: 35, imageUrl: 'cpu-cooler.jpg' },
    { name: 'HDMI Cable 2.1', description: '4K 60fps HDMI cable', price: 25, category: 'Cables', stock: 150, imageUrl: 'hdmi-cable.jpg' },
    { name: 'DisplayPort Cable', description: 'High-speed display cable', price: 30, category: 'Cables', stock: 80, imageUrl: 'displayport.jpg' },
    { name: 'Power Cable 3m', description: 'Durable power cable', price: 12, category: 'Cables', stock: 200, imageUrl: 'power-cable.jpg' },
    { name: 'Desk Lamp LED', description: 'Adjustable LED desk lamp', price: 55, category: 'Furniture', stock: 40, imageUrl: 'desk-lamp.jpg' },
    { name: 'Desk Chair Gaming', description: 'Ergonomic gaming chair', price: 350, category: 'Furniture', stock: 15, imageUrl: 'gaming-chair.jpg' },
    { name: 'Desk Writing', description: 'Large wooden desk', price: 500, category: 'Furniture', stock: 6, imageUrl: 'wooden-desk.jpg' },
    { name: 'Monitor Stand', description: 'Adjustable monitor stand', price: 40, category: 'Accessories', stock: 55, imageUrl: 'monitor-stand.jpg' },
    { name: 'Laptop Stand', description: 'Portable laptop stand', price: 35, category: 'Accessories', stock: 70, imageUrl: 'laptop-stand.jpg' },
    { name: 'USB Hub 7-Port', description: 'Multi-port USB hub', price: 50, category: 'Accessories', stock: 65, imageUrl: 'usb-hub.jpg' },
    { name: 'Docking Station', description: 'Universal docking station', price: 150, category: 'Accessories', stock: 20, imageUrl: 'docking-station.jpg' },
    { name: 'External Hard Drive 2TB', description: 'Portable storage', price: 100, category: 'Storage', stock: 35, imageUrl: 'external-hdd.jpg' }
];

async function seedDatabase() {
    try {
        // Connection to MongoDB
        await mongoose.connect(process.env.url_Mongodb);
        console.log('Connected to MongoDB');

        // Clear existing products
        await productModel.deleteMany({});
        console.log('Cleared existing products');

        // Insert 30 products
        const insertedProducts = await productModel.insertMany(products);
        console.log(`Successfully added ${insertedProducts.length} products!`);

        // Display summary
        console.log('\nProducts Summary:');
        insertedProducts.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} - $${product.price} - Stock: ${product.stock}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error.message);
        process.exit(1);
    }
}

seedDatabase();
