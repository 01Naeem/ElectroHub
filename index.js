// Load environment variables
require('dotenv').config();
const port = process.env.PORT;

// Core modules and third-party middleware
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

// Initialize express app
const app = express();

// Database connection
const dataBaseConnection = require('./database/DataBaseConnection');
dataBaseConnection();

// Middleware setup
const allowedOrigins = [process.env.CLIENT_URL];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('./routes/auth');
const AdminRoutes = require('./routes/AdminRoutes');
const ProductRoutes = require('./routes/ProductRoutes');
const UserRoutes = require('./routes/UserRoutes');
const PaymentRoute = require('./routes/Payment')

app.use('/api/auth', authRoutes);
app.use('/admin', AdminRoutes);
app.use('/product', ProductRoutes);
app.use('/user', UserRoutes);
app.use('/api/payment', PaymentRoute);

// Start server
app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
