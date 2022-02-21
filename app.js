// aplicaciones
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const dotenv = require('dotenv')

dotenv.config();

//variables de entorno
const PORT = process.env.PORT;
const api = process.env.API_URL;
const DATABASE= process.env.URL_DATABASE;


//configuraciones del servidor
app.use(express.json());
app.use(morgan('tiny'));

//conexion a la base de datos
console.log('database:', DATABASE)

mongoose.connect(DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName: 'E-Commerce'
})
.then(()=>{console.log('Base de datos conectada...')})
.catch((err)=> console.log(err));

//api
app.get(`${api}/products`,(req,res)=>{
    res.send('Hello Api')
})


app.listen(PORT,()=>{
    console.log('port:',PORT+" "+api)
})