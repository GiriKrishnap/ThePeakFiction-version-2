const express = require('express');
const router = express.Router();
//.................................................................
const { protect } = require('../middlewares/verifyToken');
const adminController = require('../controller/adminController');



//GET METHODS..........................................................
router.get('/get-all-users', protect, adminController.getAllUsers);
router.get('/get-all-authors', protect, adminController.getAllAuthors);
router.get('/get-all-genres', protect, adminController.getAllGenres);
router.get('/admin-novels', protect, adminController.getAllNovels);
router.get('/admin-dashboard', protect, adminController.adminDashboard);


//POST METHODS..........................................................
router.post('/login', adminController.adminLogin);
router.post('/add-genre', protect, adminController.addGenre);
router.post('/approve', protect, adminController.giveApprove);
router.post('/reject', protect, adminController.giveRejection);
router.post('/hide-novel', protect, adminController.hideNovel);
router.post('/block-user', protect, adminController.blockUser);
router.post('/list-genre', protect, adminController.listGenre);
router.post('/edit-genre', protect, adminController.adminEditGenre);


module.exports = router;