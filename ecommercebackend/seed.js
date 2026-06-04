const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Category = require('./models/Category');
const Product = require('./models/Product');

dotenv.config();
connectDB();

const categoriesData = [
  { name: 'Sofas', description: 'Comfortable sofas for living rooms' },
  { name: 'Dining', description: 'Dining tables and sets' },
  { name: 'Office', description: 'Office furniture and workstations' },
  { name: 'Shelves', description: 'Bookshelves and storage units' },
  { name: 'Chairs', description: 'Accent and dining chairs' },
  { name: 'Console', description: 'TV consoles and media units' }
];

const productsData = [
  { name: 'Big Book Shelf', category: 'Shelves', price: 299.99, image: '/assets/big-book-shelf.png', description: 'Spacious wooden bookshelf for your collection.', stock: 10 },
  { name: 'Big Sitting Room Sofa', category: 'Sofas', price: 899.99, image: '/assets/big-sitting-room-sofa.avif', description: 'Luxurious large sofa for living room.', stock: 5 },
  { name: 'Book Shelf', category: 'Shelves', price: 199.99, image: '/assets/book-shelf.avif', description: 'Compact bookshelf with modern design.', stock: 12 },
  { name: 'Chair Sofa', category: 'Chairs', price: 449.99, image: '/assets/chair-sofa.avif', description: 'Comfortable chair-sofa hybrid.', stock: 8 },
  { name: 'Chair', category: 'Chairs', price: 149.99, image: '/assets/chair.avif', description: 'Classic wooden chair.', stock: 20 },
  { name: 'City Sofa', category: 'Sofas', price: 699.99, image: '/assets/city-sofa.avif', description: 'Urban style city sofa.', stock: 6 },
  { name: 'Clear Dining', category: 'Dining', price: 599.99, image: '/assets/clear-dining.avif', description: 'Elegant glass dining table.', stock: 4 },
  { name: 'Dark Sofa', category: 'Sofas', price: 749.99, image: '/assets/dark-sofa.avif', description: 'Sophisticated dark leather sofa.', stock: 5 },
  { name: 'Dining 4', category: 'Dining', price: 699.99, image: '/assets/dining-4.avif', description: 'Dining set for four.', stock: 7 },
  { name: 'Dining 2', category: 'Dining', price: 499.99, image: '/assets/dining-2.avif', description: 'Compact dining set for two.', stock: 9 },
  { name: 'Dining', category: 'Dining', price: 599.99, image: '/assets/dining.avif', description: 'Standard dining table.', stock: 6 },
  { name: 'Full Dining', category: 'Dining', price: 1199.99, image: '/assets/full-dining.webp', description: 'Complete dining room set.', stock: 3 },
  { name: 'Full Sofa', category: 'Sofas', price: 999.99, image: '/assets/full-sofa.avif', description: 'Full-size luxury sofa.', stock: 4 },
  { name: 'Furniture Hero', category: 'Sofas', price: 899.99, image: '/assets/furniture-hero.avif', description: 'Showpiece hero sofa.', stock: 5 },
  { name: 'Furniture Sofa', category: 'Sofas', price: 799.99, image: '/assets/furniture-sofa.avif', description: 'Modern furniture sofa.', stock: 6 },
  { name: 'Jona Sofa', category: 'Sofas', price: 849.99, image: '/assets/jona-sofa.avif', description: 'Jona collection sofa.', stock: 5 },
  { name: 'Kitchen Cabinet and Dining', category: 'Dining', price: 1399.99, image: '/assets/kitchen-cabinet-and-dining.avif', description: 'Kitchen cabinet with dining set.', stock: 2 },
  { name: 'Living Room Sofa', category: 'Sofas', price: 899.99, image: '/assets/living-room-sofa.avif', description: 'Cozy living room sofa.', stock: 7 },
  { name: 'Multi Sofa', category: 'Sofas', price: 999.99, image: '/assets/multi-sofa.avif', description: 'Multi-functional sofa.', stock: 4 },
  { name: 'Office Chair', category: 'Office', price: 199.99, image: '/assets/office-chair.avif', description: 'Ergonomic office chair.', stock: 15 },
  { name: 'Office Lounge', category: 'Office', price: 699.99, image: '/assets/office-lounge.avif', description: 'Office lounge seating.', stock: 5 },
  { name: 'Office Shelf', category: 'Office', price: 399.99, image: '/assets/office-shelf.avif', description: 'Office storage shelf.', stock: 8 },
  { name: 'Office Table', category: 'Office', price: 499.99, image: '/assets/office-table.avif', description: 'Modern office table.', stock: 10 },
  { name: 'Office Work 3', category: 'Office', price: 799.99, image: '/assets/office-work-3.avif', description: 'Triple workstation.', stock: 4 },
  { name: 'Office Workstation', category: 'Office', price: 999.99, image: '/assets/office-workstation.avif', description: 'Full office workstation.', stock: 3 },
  { name: 'Palour Sofa', category: 'Sofas', price: 699.99, image: '/assets/palour-sofa.avif', description: 'Parlour style sofa.', stock: 6 },
  { name: 'Round Dining', category: 'Dining', price: 699.99, image: '/assets/round-dining.avif', description: 'Round dining table for small spaces.', stock: 5 },
  { name: 'Shelf Simple', category: 'Shelves', price: 249.99, image: '/assets/shelf-simple.avif', description: 'Simple minimalist shelf.', stock: 14 },
  { name: 'Shelf', category: 'Shelves', price: 199.99, image: '/assets/shelf.avif', description: 'Standard wall shelf.', stock: 18 },
  { name: 'Simple Dining', category: 'Dining', price: 499.99, image: '/assets/simple-dining.avif', description: 'Simple dining setup.', stock: 8 },
  { name: 'Small Workstation', category: 'Office', price: 599.99, image: '/assets/small-workstation.avif', description: 'Compact workstation.', stock: 6 },
  { name: 'Sofa Again', category: 'Sofas', price: 799.99, image: '/assets/sofa-again.avif', description: 'Another great sofa option.', stock: 5 },
  { name: 'Sofa Gr', category: 'Sofas', price: 749.99, image: '/assets/sofa-gr.avif', description: 'Grey fabric sofa.', stock: 6 },
  { name: 'Sofa Main', category: 'Sofas', price: 899.99, image: '/assets/sofa-main.avif', description: 'Main collection sofa.', stock: 5 },
  { name: 'Sofa Set', category: 'Sofas', price: 999.99, image: '/assets/sofa-set.avif', description: 'Complete sofa set.', stock: 3 },
  { name: 'Sven Sofa', category: 'Sofas', price: 849.99, image: '/assets/sven-sofa.avif', description: 'Sven designer sofa.', stock: 4 },
  { name: 'TV Console', category: 'Console', price: 384.99, image: '/assets/tv-console.avif', description: 'Stylish TV console unit.', stock: 10 },
  { name: 'Yellow Sofa', category: 'Sofas', price: 926.99, image: '/assets/yellow-sofa.avif', description: 'Vibrant yellow sofa.', stock: 4 }
];

const seed = async () => {
  try {
    await Category.deleteMany();
    await Product.deleteMany();

    const createdCategories = await Category.insertMany(categoriesData);
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    const productsWithCategory = productsData.map(p => ({
      ...p,
      category: categoryMap[p.category]
    }));

    await Product.insertMany(productsWithCategory);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seed();

