//enviroment
process.env.PORT = process.env.PORT || 3000

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


let urlDb;
if (node_env = 'dev')
    urlDb = 'mongodb://localhost:27017/cafe'
else
    urlDb = 'mongodb+srv://oskarincon:kYd0yUkdfE4nIyZi@cluster0.h6zvg.mongodb.net/test'

process.env.NODE_ENV = urlDb;