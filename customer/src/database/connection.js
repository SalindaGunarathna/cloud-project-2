const mongoose = require('mongoose');
const { DB_URL } = require('../config');

module.exports = async() => {

    try {
        await mongoose.connect(DB_URL);
        console.log('✅ customer service Database Connected');
        
    } catch (error) {
        console.log('============ Error while connecting to customer service database ============');
        console.log(error);
        process.exit(1);
    }
 
};

 