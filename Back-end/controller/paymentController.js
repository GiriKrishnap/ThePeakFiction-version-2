//-----------------------------
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIP_SECRET_KEY);
///---------------------------
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

                success_url: `https://the-peak-fiction-version-2.vercel.app/profile/success?sessionId={CHECKOUT_SESSION_ID}`,
                cancel_url: `https://the-peak-fiction-version-2.vercel.app/profile`,

            });

            session.success_url = `https://the-peak-fiction-version-2.vercel.app/profile/success?sessionId=${session.id}`

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

            const query = {
                user_id: userId,
                amountAdd: { $elemMatch: { session_id: sessionId } }
            };
            const projection = { _id: 0, user_id: 0, walletAmount: 0 };

            let walletData = await WalletModel.find(query, projection)

            if (walletData[0]?.amountAdd) {

                res.json({ status: true, message: 'Wallet Already Updated' });

            } else {

                const session = await stripe.checkout.sessions.retrieve(sessionId);

                if (session.payment_status === 'paid') {

                    let AddHistory = {
                        amount: session.amount_total / 100,
                        session_id: sessionId,
                        date: new Date()
                    };

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
                    res.json({ status: true, message: 'payment Failed' });
                }
            }


        } catch (error) {
            res.status(500).json({ error: 'server catch error :: confirm payment' });
            console.log(error.message);

        }
    }
    ///---------------------------
}


