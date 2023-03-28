const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { region: 'Africa' }, // 0
    { region: 'Asia' }, // 1
    { region: 'Caribbean' }, // 2
    { region: 'Central America' }, // 3
    { region: 'Europe' }, // 4
    { region: 'North America' }, //  5
    { region: 'Oceania' }, // 6
    { region: 'South America' }, // 7
  ]);

  console.log('categories - regions seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Trip 1',
      description:
        'Weekend trip to New York!',
      image: 'cookie-tin.jpg',
      country: 'United States',
      price: 499.99,
      discount: 25, 
      quantity: 20,
      rating: 4,
      departure: 2023-04-04,
      duration: 2,
      allinclusive: false,
      activities: true,     
      category: categories[5]._id,
    },
    {
      name: 'Trip 2',
      description:
        'A week vacation in Cayo Coco!',
      image: 'cookie-tin.jpg',
      country: 'Cuba',
      price: 1099.99,
      discount: 50, 
      quantity: 30,
      rating: 5,
      departure: 2023-04-09,
      duration: 7,
      allinclusive: true,
      activities: false,     
      category: categories[2]._id,
    },
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Shohei',
    lastName: 'Mochizuki',
    email: 'smochizuki@gmail.com',
    password: 'password',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@gmail.com',
    password: 'password'
  });

  console.log('users seeded');

  process.exit();
});
