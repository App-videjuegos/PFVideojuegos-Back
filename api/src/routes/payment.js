const axios = require("axios")
const { json } = require("body-parser");
const { addToSales } = require("../controllers/SalesController");
const { Router } = require("express");
const express = require("express");
const Stripe = require("stripe");
const stripe = new Stripe("sk_test_51N7eXtIEe9GBUqtLmhCnbI8paifQ5nogExU3BkuN5AyMzAoGgDHqKcdAHkxPuVQHi6koSWM6stHCWpnmLPh8Wqhe00vEADGmgi");

const router = Router();
router.use(express.json());

router.post("/pay", async (req, res) => {
    const { amount, items, userId } = req.body.datos;
    const newItems = JSON.stringify(items);
    console.log(items)
    try {

        if (!amount || !items || !userId) return res.status(400).json({ message: "Faltan alguno de los datos: amount, items, userId" });
        try {
            const customer = await stripe.customers.create({
                id: userId,
            });
            console.log("Usuario creado en stripe")
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: "USD",
                description: newItems,
                payment_method_types: ["card"],
                customer: userId,
                metadata: { userId },
            });
            const clientSecret = paymentIntent.client_secret;
            res.json({ message: "Payment initiated", clientSecret });
        } catch (error) {
            if (error.raw.message === 'Customer already exists.') {
                console.log("Usuario ya existe en stripe")
                try {
                    const paymentIntent = await stripe.paymentIntents.create({
                        amount: amount,
                        currency: "USD",
                        description: newItems,
                        payment_method_types: ["card"],
                        customer: userId,
                        metadata: { userId },
                    });
                    
                    const clientSecret = paymentIntent.client_secret;
                    res.json({ message: "Payment initiated", clientSecret });
                } catch (error) {
                    return res.json({ message: error.raw.message });
                }
            }
        }

        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/createSale", async (req, res) => {
    const { paymentId, amount, items, userId } = req.body;
    const newItems = JSON.parse(items);
    try {
        const response = await addToSales(paymentId, amount, newItems, userId);
        console.log("Venta almacenada")
        res.json({ message: "ok", })

    } catch (error) {
        const refund = await stripe.refunds.create({
            payment_intent: paymentId,
        });
    
        res.status(404).send(error);
    }
});

module.exports = router;
