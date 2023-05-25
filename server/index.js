const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

require('./models/db.model');

const employeeRoutes = require('./routes/employee.routes');
const port = process.env.PORT || 3000;
const api = process.env.API_URL || "/api/v1";
const app = express();

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
  }
app.use(cors(corsOptions));

// Middelwares
app.use(bodyParser.json());

// Routes
app.use(`${api}/employees`, employeeRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.log(err);
    if (err.name === 'ValidationError') {
        const valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        return res.status(422).send(valErrors);
    }
    if (err.statusCode === 401 && err.error.code === 'BAD_REQUEST_ERROR') {
        return res.status(401).send({
            success: false,
            message: err.error.description,
        });
    }
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(500).json({
            success: false,
            message: 'Invalid Id'
        })
    }
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid Token'
        })
    }
    return res.status(503).send(err);
});

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})