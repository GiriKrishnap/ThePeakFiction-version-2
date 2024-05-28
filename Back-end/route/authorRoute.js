//.................................................................
const express = require('express');
const router = express.Router();
const multer = require('../util/multerConfig');
//.................................................................
const { protect } = require('../middlewares/verifyToken');
const novelExistChecker = require('../middlewares/novelCreateMiddleware');
//.................................................................
const authorController = require('../controller/AuthorController');
const novelController = require('../controller/novelController');


//GET METHODS..........................................................
router.get('/get-all-novels/:id', protect, authorController.getAllAuthorNovels);
router.get('/get-genres', protect, authorController.getAllGenresAuthor);
router.get('/get-chapter-details/:novelId/:chapterId', protect, authorController.chapterEditDetails);
router.get('/get-novel', protect, authorController.getNovelDetailById);
router.get('/check-gcoin-system', protect, novelController.checkGCoinSystem);

//POST METHODS..........................................................
router.post('/create/:title', protect, novelExistChecker, multer.single('photo'), authorController.authorCreate);
router.post('/add-chapter', protect, authorController.addChapter);
router.post('/payment-eligible-Check', protect, authorController.paymentEligibleCheck);
router.post('/cancel-novel', protect, authorController.cancelNovel);
router.post('/delete-chapter', protect, authorController.deleteChapter);
router.post('/edit-chapter', protect, authorController.chapterEditPost);
router.post('/edit-novel/:id/:title', protect, novelExistChecker, multer.single('photo'), authorController.authorEditNovel);


module.exports = router;