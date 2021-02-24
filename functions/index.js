const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51IONJ7LCK8ZAFqBVwQKm6LPyOlr0IWiSYIj9FO0VTGMKDJtk6TDWYOoDbAUzfWjB4PVMyO6HzmxxNVssB6QTgV1u00XdV723bE")

// API

// App config
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// API routes
app.get('/', (request, response) => response.status(200).send('hello world'));

app.post('/payments/create', async (request, response) => {
    const total = request.query.total; // amount of subunits
    console.log('Payment Request Recieved BOOM!! for this amount >>>', total);
    const paymentIntent = await stripe.paymentIntent.create({
        amount: total, // subunits of the currency
        currency: "usd",
    });

    // OK - created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
});

// Listen command
exports.api = functions.https.onRequest(app);

// example endpoint
// http://localhost:5001/clone-3c77b/us-central1/api