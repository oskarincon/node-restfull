//enviroment
process.env.PORT = process.env.PORT || 3000

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


let urldb;
if (node_env === 'dev')
    urldb = 'mongodb://localhost:27017/cafe'
else
    urldb = 'mongodb+srv://oskarincon:kYd0yUkdfE4nIyZi@cluster0.h6zvg.mongodb.net/test'

process.env.NODE_ENV = urldb;