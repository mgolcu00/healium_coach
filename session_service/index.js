const app = require('./src/config/express');
const connectDb = require('./src/config/mongo');
require('dotenv').config();

// connect to MongoDB
connectDb();

// insert controllers here
const authController = require('./src/features/auth/auth.controller');
app.use('/auth', authController);

// session controller
const sessionController = require('./src/features/session/session.controller');
app.use('/session', sessionController);


const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
app.listen(port, () => {
  console.log(`Server started on http://${host}:${port}/`);
});
