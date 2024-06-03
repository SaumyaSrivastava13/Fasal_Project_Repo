const mongoose = require('mongoose');
require('dotenv').config();

const uri = 'mongodb://127.0.0.1:27017/movie_users'; // Use IPv4 address


// const connectDB = async () => {
//     try {
//         await mongoose.connect(uri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log('Connected to database successfully');
//     } catch (error) {
//         console.error('Database connection failed:', error);
//     }
// };

const connectDB=mongoose.connect('mongodb://127.0.0.1:27017/movie_users')
.then(()=>{console.log("DB Connected")})
.catch((err)=>{console.log(err)});

module.exports = connectDB;

