const Product = require('./src/database/models/Product');
const fs = require('fs');
const path = require('path');

const seedData = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const dataPath = path.join(__dirname, 'sampledata.json');
      const rawData = fs.readFileSync(dataPath);
      const products = JSON.parse(rawData);

      await Product.insertMany(products);
      console.log('✅ Sample data inserted successfully');
    } else {
      console.log('⚡ Products already exist, skipping seeding');
    }
  } catch (err) {
    console.error('❌ Error seeding data:', err);
  }
};

module.exports = seedData;
