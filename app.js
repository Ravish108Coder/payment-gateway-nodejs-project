import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import indexRoutes from './routes/index.js';
import paymentRoutes from './routes/payment.route.js';
import { connectDB } from './db/index.js';

connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(cookieParser());
app.use(express.json()); // use for parsing application/json
app.use(express.urlencoded({ extended: true })); // use for parsing application/x-www-form-urlencoded

// Middleware to set a default error message if none is present
app.use((req, res, next) => {
    res.locals.errorMessage = null;
    next();
});

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/', paymentRoutes);

app.get('*', (req, res)=>{
    res.render('404')
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});
