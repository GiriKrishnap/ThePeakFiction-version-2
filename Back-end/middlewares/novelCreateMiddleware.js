const NovelModel = require('../model/novelModel');

const novelExistChecker = async (req, res, next) => {
    // console.log('novelExistCheckerID is here', req.params.id);
    // console.log('novelExistCheckerTitle is here', req.params.title);
    if (req.params.id) {
        const checkExist = await NovelModel.findOne({
            title: { $regex: new RegExp(req.params.title, 'i') },
            _id: { $ne: req.params.id }
        });

        if (checkExist) {
            res.json({ status: false, message: 'Title Already Exist' });
        } else {

            next();
        }

    } else {

        console.log('....title in novelMiddleware - ', req.params.title);
        const checkExist = await NovelModel.findOne({ title: req.params.title });

        if (checkExist) {

            res.json({ status: false, message: 'Title Already Exist' });

        } else {

            next();
        }
    }
}

module.exports = novelExistChecker