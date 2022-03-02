// aplicaciones
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require("./helpers/jwt");
const errorHandler = require('./helpers/error-handler');

const dotenv = require('dotenv')

dotenv.config();
app.use(cors());
app.options("*", cors());

//variables de entorno
const PORT = process.env.PORT;
const api = process.env.API_URL;
const DATABASE= process.env.URL_DATABASE;

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use("/public/uploads",express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

//conexion a la base de datos
mongoose.connect(DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName: 'E-Commerce'
})
.then(() => { console.log('Base de datos conectada...') } )
.catch((err) => console.log(err) );

//api
app.use(`${api}/categories`,categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//server
app.listen(PORT,()=>{
    console.log('server is running http://localhost:3000')
})