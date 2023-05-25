// using mongoDB to save data and IP address is set to public to access database from any IP address
const mongoose = require('mongoose');

require('./employee.model');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI , {
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connection succeeded.');
}).catch((err) => {
    console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2));
});
