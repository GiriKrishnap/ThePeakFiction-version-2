//-----------------------------
require('dotenv').config();
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIP_SECRET_KEY);
///---------------------------
const UserModel = require('../model/UserModel');
const GenreModel = require('../model/genreModel');
const NovelModel = require('../model/novelModel');
const WalletModel = require('../model/walletModel');
///---------------------------


module.exports = {

    ///---------------------------
    createPaymentIntent: async (req, res) => {

        const { amount } = req.body;
        console.log("amount is here - ", amount)

        try {

            let session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: "inr",
                            product_data: {
                                name: 'amount'
                            },
                            unit_amount: amount * 100,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',

                success_url: `https://thepeakfiction.vercel.app/profile/success?sessionId={CHECKOUT_SESSION_ID}`,
                cancel_url: `https://thepeakfiction.vercel.app/profile`,

            });

            session.success_url = `https://thepeakfiction.vercel.app/profile/success?sessionId=${session.id}`
            console.log(session);

            res.json({ id: session.id });

        } catch (error) {
            res.status(400).json({ status: false, message: 'server catch error  :: createPayment' });
            console.log(error.message);
        }
    },
    ///---------------------------
    confirmPayment: async (req, res) => {

        try {

            const { sessionId, userId } = req.body;

            const session = await stripe.checkout.sessions.retrieve(sessionId);

            if (session.payment_status === 'paid') {

                console.log('the payment is successful ⭐⭐⭐⭐');

                let AddHistory = {
                    amount: session.amount_total / 100,
                    date: new Date()
                };

                console.log(' \n add history is here - ', AddHistory)

                await WalletModel.updateOne(
                    { user_id: userId },
                    {
                        $inc: { walletAmount: session.amount_total / 100 },
                        $push: { amountAdd: AddHistory }
                    },
                    { upsert: true }
                );

                res.json({ status: true, message: 'Wallet Updated' });

            } else {
                console.log('the payment is a Failed  🤑🤑');
            }

        } catch (error) {
            res.status(500).json({ error: 'server catch error :: confirm payment' });
            console.log(error.message);

        }
    }
    ///---------------------------
    ///---------------------------
    ///---------------------------
}


