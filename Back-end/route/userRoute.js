//.................................................................
const express = require('express');
const router = express.Router();
//.................................................................
const { protect } = require('../middlewares/verifyToken');
//.................................................................
const userController = require('../controller/userController');
const paymentController = require('../controller/paymentController');
const novelController = require('../controller/novelController');
const communityController = require('../controller/communityController');


//GET METHODS.......................................................... 
router.get('/get-novel/:novelId', protect, novelController.getNovelWithId);
router.get('/get-chapter/:novelId/:chapterNumber/:userId', protect, novelController.getChapter);

router.get('/get-all-novels', protect, novelController.getAllNovels);
router.get('/get-library', protect, novelController.getLibraryNovels);
router.get('/get-most-viewed', protect, novelController.getMostViewed);
router.get('/get-new-updated', protect, novelController.getNewUpdated);
router.get('/get-trending', protect, novelController.getTrending);
router.get('/get-random', protect, novelController.getRandom);
router.get('/get-wallet', protect, userController.getWallet);
router.get('/all-message', protect, communityController.getAllMessage);
router.get('/check-pay-to-read/:novelId/:chapterNo/:userId', protect, novelController.checkPayToRead);
router.get('/get-community', protect, communityController.getCommunity);

//POST METHODS..........................................................
router.post('/signup', userController.readerSignup);
router.post('/verify-user-otp', userController.verifyOtp);
router.post('/login', userController.readerLogin);
router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.post('/add-To-library', protect, novelController.addToLibrary);
router.post('/filter-novels', protect, novelController.filterNovel);
router.post('/payment-confirm', paymentController.confirmPayment);
router.post('/rate-novel', protect, novelController.addRating);
router.post('/send-message', communityController.newMessage);
router.post('/change-password-request', userController.changePasswordRequest);
router.post('/change-password', userController.changePassword);
router.post('/edit-profile', userController.editProfile);
router.post('/pay-to-read-post', novelController.PayToReadPost);
router.post('/join-community', protect, communityController.joinCommunity);
router.post('/resend-otp', userController.resendOtp);
router.post('/text-to-speech', protect, userController.textToSpeech);

///---------------------------
module.exports = router;
