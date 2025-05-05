require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/create-checkout-session", async (req, res) => {
    try {
        const { products } = req.body;

        if (!products || !Array.isArray(products)) {
            return res.status(400).json({ error: "Products array is required" });
        }

        console.log("Received products:", products);

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.category,
                    images: [product.thumbnail],
                },
                unit_amount: Math.round(product.price * 100), 
            },
            quantity: product.quantity > 0 ? product.quantity : 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/OrderConfirmation",
            cancel_url: "http://localhost:5173/cancel",
        });

        res.json({ id: session.id, url: session.url });
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
