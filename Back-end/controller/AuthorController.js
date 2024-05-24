const fs = require('fs');
//-MODELS--------------------------------------------------
const GenreModel = require('../model/genreModel');
const NovelModel = require('../model/novelModel')
const CommunityModel = require('../model/communityModel');
const novelModel = require('../model/novelModel');
const cloudinary = require('../config/cloudinaryConfig')
//---------------------------------------------------------
module.exports = {

    authorCreate: async (req, res) => {
        try {

            const { title, description, authorId } = req.body;

            const CoverPath = req.file.path;
            const genre = req.body.genre.split(',')

            console.log("CoverPath - ", CoverPath)


            const uploadResult = await cloudinary.uploader.upload(CoverPath, {
                public_id: title,
                folder: 'novel-covers',
                overwrite: true,
            }).catch((error) => { console.log(error) });
            console.log('Uploaded image URL CLoudinary:', uploadResult.secure_url);


            const novelCreate = await NovelModel.create({

                title: title,
                description: description,
                cover: uploadResult.secure_url,
                genre: genre,
                publish_date: new Date(),
                updated_date: new Date(),
                author_id: authorId

            })

            if (novelCreate) {

                await CommunityModel.create({
                    name: `${novelCreate.title} Community`,
                    novel_id: novelCreate._id
                })

                res.json({ status: true, message: 'Novel Created!' });
                fs.unlinkSync(CoverPath);

            } else {

                res.json({ status: false, message: "error on backend!" });
            }

        } catch (error) {

            res.status(400).json({ status: false, message: "oops catch error" });
            console.log(error + ' error in AuthorCreateNovel ' + error.message);
        }
    },

    //------------------------------------------------
    getAllAuthorNovels: async (req, res) => {
        try {
            const authorId = req.params.id;
            const page = req.query.page;
            const queryFilter = { author_id: authorId }

            const novels = await NovelModel.find(queryFilter)
                .sort({ publish_date: -1 })
                .populate('genre')
                .skip((page - 1) * 6)
                .limit(6);

            const totalNovels = await NovelModel.countDocuments(queryFilter);


            res.json({ status: true, novels, totalNovels })


        } catch (error) {
            res.status(400).json({ status: false, message: "oops catch error" });
            console.log(error + ' error in AuthorGetNovels ' + error.message);
        }
    },

    //--------------------------------------------------
    addChapter: async (req, res) => {
        try {
            const { NovelId, title, content, gcoin, chapterNumber } = req.body;

            const currentDate = new Date();

            const obj = {
                number: chapterNumber,
                title,
                content,
                publish_date: currentDate,
                gcoin: gcoin || 0
            }

            NovelModel.updateOne({ _id: NovelId }, {
                $push: { chapters: obj },
                $inc: { chapter_count: 1 },
                $set: { updated_date: currentDate }
            }).then(() => {
                res.json({ status: true, message: 'created' })
            })

        } catch (error) {
            res.status(400).json({ status: false, message: "oops catch error ::addChapter serverSide" });
            console.log('catch error on :: addChapter - ', error.message)
        }
    },

    //--------------------------------------------------

    paymentEligibleCheck: async (req, res) => {
        try {

            const { NovelId } = req.body;
            const novelCheck = await NovelModel.findOne({ _id: NovelId });

            if (novelCheck.views > 1000) {

                await NovelModel.updateOne({ _id: NovelId }, { $set: { gcoin_system: true } });

                res.json({ status: true });
            } else {
                res.json({ status: false });
            }
        } catch (error) {
            res.status(400).json({ status: false, message: "oops catch error ::paymentEligibleCheck serverSide" });
            console.log('catch error on :: paymentEligibleCheck - ', error.message);
        }
    },

    //--------------------------------------------------------

    getAllGenresAuthor: async (req, res) => {
        try {

            let genres = await GenreModel.find({ is_Hide: false })
                .sort({ 'name': 1 });

            if (genres) {

                res.json({ status: true, genres })

            } else {

                res.json({ status: false })
                console.log('error on get genres');

            }

        } catch (error) {
            res.status(400).json({ status: false, message: 'admin catch error server side :: getAllGenres' });
            console.log("catch error getAllGenre " + error.message);
        }

    },
    //---------------------------------------------------------
    cancelNovel: async (req, res) => {
        try {

            const { novelId } = req.body
            const novelCancel = await NovelModel.updateOne({ _id: novelId }, { $set: { status: 'cancelled' } });
            if (novelCancel) {
                res.json({ status: true, message: 'Novel Cancelled' });
            }

        } catch (error) {
            console.log('catch error on :: cancelNovel - ', error.message)
            res.status(400).json({ status: false, message: "oops catch error ::cancelNovel serverSide" });
        }
    },
    //---------------------------------------------------------
    deleteChapter: async (req, res) => {
        try {

            const { novelId, chapterId } = req.body

            const novelCancel = await NovelModel.updateOne({ _id: novelId },
                {
                    $pull: { chapters: { _id: chapterId } },
                    $inc: { chapter_count: -1 }
                }
            );

            if (novelCancel) {
                res.json({ status: true, message: 'Chapter Deleted' });
            }

        } catch (error) {
            console.log('catch error on :: cancelNovel - ', error.message)
            res.status(400).json({ status: false, message: "oops catch error ::cancelNovel serverSide" });
        }
    },

    //---------------------------------------------------------

    chapterEditDetails: async (req, res) => {
        try {

            const { novelId, chapterId } = req.query

            const chapter = await NovelModel.findOne(
                { _id: novelId, "chapters._id": chapterId },
                { "chapters.$": 1 }
            );



            if (chapter) {
                res.json({ status: true, content: chapter.chapters[0].content, title: chapter.chapters[0].title });
            }

        } catch (error) {
            console.log('catch error on :: chapterEditDetails - ', error.message)
            res.status(400).json({ status: false, message: "oops catch error ::chapterEditDetails serverSide" });
        }
    },
    //---------------------------------------------------------

    chapterEditPost: async (req, res) => {
        try {

            const { NovelId, chapterId, title, content } = req.body;

            const result = await NovelModel.updateOne(
                { _id: NovelId, "chapters._id": chapterId },
                { $set: { "chapters.$.title": title, "chapters.$.content": content } }
            );

            if (result) {
                res.json({ status: true });
            } else {
                res.json({ status: false });
            }

        } catch (error) {
            console.log('catch error on :: chapterEditDetails - ', error.message)
            res.status(400).json({ status: false, message: "oops catch error ::chapterEditDetails serverSide" });
        }
    },
    //---------------------------------------------------------

    getNovelDetailById: async (req, res) => {
        try {

            const { novelId } = req.query;

            if (novelId) {
                const novelData = await NovelModel.findOne({ _id: novelId }).populate('genre')
                res.json({ status: true, novelData });
            }

        } catch (error) {
            console.log('catch error on :: getNovelDetailById - ', error.message)
            res.status(400).json({ status: false, message: "oops catch error ::getNovelDetailById serverSide" });
        }
    },

    //---------------------------------------------------------

    authorEditNovel: async (req, res) => {
        try {

            const { title, description, novelId } = req.body;

            let uploadUrl = null;
            const CoverPath = req.file?.path || null
            const genre = req.body.genre.split(',')

            if (CoverPath) {

                const uploadResult = await cloudinary.uploader.upload(CoverPath, {
                    public_id: req.params.title,
                    folder: 'novel-covers',
                    overwrite: true,
                }).catch((error) => { console.log(error) });

                console.log('UPDATE IMAGE image URL CLoudinary:', uploadResult.secure_url);

                if (uploadResult.secure_url) {
                    uploadUrl = uploadResult.secure_url;
                    fs.unlinkSync(CoverPath);
                }
            }


            const updatedFields = {
                title: title,
                description: description,
                updated_date: new Date(),
            };

            if (uploadUrl) {
                updatedFields.cover = uploadUrl;
            }

            if (genre.length > 0 && genre[0] !== '') {
                updatedFields.genre = genre;
            }

            const updatedNovel = await NovelModel.findOneAndUpdate({ _id: novelId },
                updatedFields,
                { new: true }
            );

            if (updatedNovel) {

                res.json({ status: true, message: 'Novel Edited!' });

            } else {

                res.json({ status: false, message: "error on backend!" });
            }

        } catch (error) {

            res.status(400).json({ status: false, message: "oops catch error" });
            console.log(error + ' error in AuthorCreateNovel ' + error.message);
        }
    },

    //---------------------------------------------------------


}

