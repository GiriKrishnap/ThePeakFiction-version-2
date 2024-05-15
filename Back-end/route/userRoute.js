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
router.get('/novelWithId/:novelId', protect, novelController.getNovelWithId);
router.get('/getChapter', protect, novelController.getChapter);

router.get('/getAllNovels-user', protect, novelController.getAllNovels);
router.get('/get-library', protect, novelController.getLibraryNovels);
router.get('/getMostViewed', protect, novelController.getMostViewed);
router.get('/getNewUpdated', protect, novelController.getNewUpdated);
router.get('/getTrending', protect, novelController.getTrending);
router.get('/getRandom', protect, novelController.getRandom);
router.get('/getWallet', protect, userController.getWallet);
router.get('/check-GCoinSystem', protect, novelController.checkGCoinSystem);
router.get('/all-message', protect, communityController.getAllMessage);
router.get('/checkPayToRead', protect, novelController.checkPayToRead);
router.get('/get-community', protect, communityController.getCommunity);

//POST METHODS..........................................................
router.post('/signup', userController.readerSignup);
router.post('/verifyUserOtp', userController.verifyOtp);
router.post('/login', userController.readerLogin);
router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.post('/add-To-library', protect, novelController.addToLibrary);
router.post('/filterNovels-user', protect, novelController.filterNovel);
router.post('/payment-confirm', paymentController.confirmPayment);
router.post('/rateNovel', protect, novelController.addRating);
router.post('/send-message', communityController.newMessage);
router.post('/changePassword-request', userController.changePasswordRequest);
router.post('/changePassword', userController.changePassword);
router.post('/edit-profile', userController.editProfile);
router.post('/PayToReadPost', novelController.PayToReadPost);
router.post('/join-community', protect, communityController.joinCommunity);
router.post('/resend-otp', userController.resendOtp);

///---------------------------
module.exports = router;
