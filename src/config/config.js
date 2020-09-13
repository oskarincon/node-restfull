//port
process.env.PORT = process.env.PORT || 3000
//enviroment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//seed timeout
// 60 segundos , 60 minutos, 24 horas
process.env.TIME_OUT = 60 * 60 * 24 * 30;
//seed 
process.env.SEED = process.env.SEED || 'seed-dev'


let urldb;
if (process.env.NODE_ENV === 'dev')
    urldb = 'mongodb://localhost:27017/cafe'
else
    urldb = process.env.MONGO_URI

process.env.NODE_ENV = urldb;