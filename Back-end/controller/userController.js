const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateToken = require('../util/generateToken');
const axios = require("axios")

//-MODELS---------------------------------------------------
const UserModel = require('../model/UserModel');
const WalletModel = require('../model/walletModel');
const OtpModel = require('../model/otpModel');
//----------------------------------------------------------
const { sendOtp, changePasswordEmail } = require('../util/generateOTP')
//----------------------------------------------------------

module.exports = {

    readerSignup: async (req, res) => {
        try {

            let isAuthor = req.body.isAuthor;
            let emailExist = await UserModel.findOne({ email: req.body.email });


            if (emailExist) {

                if (emailExist.is_verified) {

                    res.json({ status: false, message: "User Already Exists", });
                } else {

                    res.json({ status: false, message: "Email Not Verified", need_verify: true });
                }

            } else {

                const securePassword = await bcrypt.hash(req.body.password, 10);

                const { email, userName } = req.body

                const userCreate = await UserModel.create({
                    userName: userName,
                    email: email,
                    password: securePassword,
                    is_Author: isAuthor
                })

                await WalletModel.create({
                    user_id: userCreate._id
                })

                sendOtp(email);

                let details = {
                    firstName: userName,
                    email: email,
                    is_Author: isAuthor
                }

                res.json({ status: true, details });

            }

        } catch (error) {
            res.status(400).json(error.message);
            console.log(error + 'error in reader signup' + error.message);
        }
    },

    //---------------------------------------------------------

    readerLogin: async (req, res) => {
        try {

            if (req.body.googleAccessToken) {
                const { googleAccessToken } = req.body;

                axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${googleAccessToken}`
                    }

                }).then(async (response) => {

                    const email = response.data.email;

                    const emailExist = await UserModel.findOne({ email: email });

                    if (!emailExist) {

                        res.json({ status: false, message: 'Email Not Exist' });

                    } else if (!emailExist.is_verified) {

                        res.json({ status: false, message: 'Email Not Verified', need_verify: true });

                    } else {
                        const role = emailExist.is_Author ? 'author' : 'reader'
                        const token = generateToken(emailExist._id, role);

                        const details = {
                            id: emailExist._id,
                            userName: emailExist.userName,
                            email: emailExist.email,
                            token,
                            isAuthor: emailExist.is_Author
                        }

                        res.cookie('access_token', token, {
                            httpOnly: false, // Prevent client-side JavaScript access
                            secure: process.env.NODE_ENV === 'production', // Transmit only over HTTPS in production
                            sameSite: 'lax', // Mitigate CSRF attacks
                            path: '/', // Accessible from all paths on your domain
                            maxAge: 900000, // Set expiration time (in milliseconds)
                        });

                        res.json({ status: true, message: 'Login successful', details, token });
                    }

                })

            } else {

                const emailExist = await UserModel.findOne({ email: req.body.email })

                if (!emailExist) {

                    res.json({ status: false, message: "User Does Not Exist" });

                } else if (emailExist.is_Block) {

                    res.json({ status: false, message: "Account Blocked by Admin" });

                } else if (!emailExist.is_verified) {
                    sendOtp(emailExist.email);
                    res.json({ status: false, message: "Email Not Verified", need_verify: true });
                } else {

                    const checkPassword = await bcrypt.compare(req.body.password, emailExist.password);

                    if (!checkPassword) {

                        res.json({ status: false, message: "Wrong Password" })

                    } else {

                        const role = emailExist.is_Author ? 'author' : 'reader'
                        const token = generateToken(emailExist._id, role);

                        const details = {

                            id: emailExist._id,
                            userName: emailExist.userName,
                            email: emailExist.email,
                            token,
                            isAuthor: emailExist.is_Author
                        }


                        res.cookie('access_token', token, {
                            httpOnly: false, // Prevent client-side JavaScript access
                            sameSite: 'None', // Mitigate CSRF attacks
                            maxAge: 7 * 24 * 60 * 60 * 1000, // Set expiration time (in milliseconds)
                            withCredentials: true
                        });

                        res.json({ status: true, message: 'Login successful', details, token });
                    }
                }
            }

        } catch (error) {

            res.status(400).json({ status: false, message: "oops catch error" });
            console.log(error + 'error in reader LOGIN' + error.message);
        }
    },

    //---------------------------------------------------------

    getWallet: async (req, res) => {
        try {

            const { userId } = req.query;

            const walletDetails = await WalletModel.findOne({ user_id: userId });

            if (!walletDetails) {
                res.json({ status: false, message: 'No Wallet' });
            } else {

                res.json({ status: true, walletDetails });
            }


        } catch (error) {
            res.status(400).json({ status: false, message: 'server catch error :: getUserWithId' });
            console.log('catch error :: getUserWithId', error.message);
        }
    },

    //---------------------------------------------------------

    verifyOtp: async (req, res) => {
        try {

            const { email, otp } = req.body;

            const otpExist = await OtpModel.findOne({ email: email });

            if (!otpExist) {

                res.json({ status: false, message: 'Create a Account First ‼' })

            } else if (otpExist.otp === otp) {

                await otpExist.deleteOne()
                await UserModel.updateOne({ email: email }, { $set: { is_verified: true } });

                res.json({ status: true, message: 'Verified' })

            } else {

                res.json({ status: false, message: 'Wrong Otp' })
            }



        } catch (error) {
            res.status(400).json({ status: false, message: 'server catch error :: verifyOtp' });
            console.log('catch error :: verifyOtp', error.message);
        }
    },
    //---------------------------------------------------------
    changePasswordRequest: async (req, res) => {
        try {

            const { email } = req.body;
            console.log(email);

            const user = await UserModel.findOne({ email: email });
            if (!user) {
                res.json({ status: false, message: 'email not found' });
            } else if (user.is_verified === false) {

                res.json({ status: false, message: 'Email Not Verified' });

            } else {

                if (user) {
                    const userId = user._id;
                    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
                        expiresIn: "10m"
                    })

                    if (token) {
                        const link = `https://thepeakfiction.vercel.app/new-password?token=${token}`;
                        changePasswordEmail(email, link);
                        res.json({ status: true });
                    }
                }
            }

        } catch (error) {
            console.log('catch error :: changePasswordRequest', error.message);
            res.status(400).json({ status: false, message: 'server catch error :: changePasswordRequest' });
        }
    },
    //---------------------------------------------------------
    changePassword: async (req, res) => {
        try {

            const { token, password } = req.body;
            console.log('token - ', token, 'password - ', password);
            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {

                if (err) {

                    console.error('Token verification failed:', err.message);
                    res.json({ status: false, message: 'Link Expired' });

                } else {

                    const userIdFromToken = decoded.userId;
                    const securePassword = await bcrypt.hash(password, 10);

                    await UserModel.updateOne({ _id: userIdFromToken }, { $set: { password: securePassword } });
                    res.json({ status: true, message: 'password changed' });

                }
            });

        } catch (error) {
            res.status(400).json({ status: false, message: 'server catch error :: changePassword' });
            console.log('catch error :: changePassword', error.message);
        }
    },
    //---------------------------------------------------------
    editProfile: async (req, res) => {
        try {

            const { userId, userName, email } = req.body;

            if (userId && userName && email) {
                const emailExist = await UserModel.findOne({ email: email });

                if (emailExist) {

                    if (emailExist._id.toString() !== userId) {
                        res.json({ status: false, message: "email already exist" })
                    } else {

                        await UserModel.updateOne({ _id: userId }, {
                            $set: { userName: userName }
                        })
                        res.json({ status: true, message: "UserName Updated" });
                    }
                } else {

                    await UserModel.updateOne({ _id: userId }, {
                        $set: { userName: userName, email: email, is_verified: false }
                    })
                    res.json({ status: true, need_verify: true, message: "verify your new email" });
                }
            }
        } catch (error) {
            res.status(400).json({ status: false, message: 'server catch error :: editProfile' });
            console.log('catch error :: editProfile', error.message);
        }
    },

    //....................................................................................

    resendOtp: async (req, res) => {
        try {

            const { email } = req.body;
            sendOtp(email);
            res.json({ status: true, message: 'check your email' });

        } catch (error) {
            res.status(400).json({ status: false, message: 'server catch error :: resendOtp' });
            console.log('catch error :: resendOtp', error.message);
        }
    }

}

//---------------------------------------------------------
