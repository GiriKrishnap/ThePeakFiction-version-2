///---------------------------
require('dotenv/config');
const cloudinary = require('../config/cloudinaryConfig')
///---------------------------
const UserModel = require('../model/UserModel');
const GenreModel = require('../model/genreModel');
const NovelModel = require('../model/novelModel');
const generateToken = require('../util/generateToken');
///---------------------------



module.exports = {

    ///---------------------------
    adminLogin: async (req, res) => {
        try {

            let email = process.env.ADMIN_EMAIL
            let password = process.env.ADMIN_PASSWORD

            if (req.body.email !== email || req.body.password !== password) {

                res.json({ status: false, message: 'email or password is wrong!' });

            } else {

                const adminToken = generateToken(email, 'admin');

                res.json({ status: true, message: 'the login is completed', adminToken });
            }

        } catch (error) {
            res.json({ status: false, message: 'admin catch error server side :: adminLogin' });
            console.log(error.message);
        }
    },

    ///---------------------------
    getAllUsers: async (req, res) => {
        try {

            let users = await UserModel.find({ is_Author: false });

            if (users) {

                res.json({ status: true, users })

            } else {

                res.json({ status: false })
                console.log('error on get users');
            }

        } catch (error) {
            res.json({ status: false, message: 'admin catch error server side :: getAllUsers' });
            console.log(error.message);
        }

    },

    ///---------------------------
    getAllAuthors: async (req, res) => {
        try {

            let authors = await UserModel.find({ is_Author: true });
            if (authors) {

                res.json({ status: true, authors })

            } else {

                res.json({ status: false })
                console.log('error on get authors');

            }
        } catch (error) {
            res.status(401).json({ status: false, message: 'admin catch error server side :: getAllAuthors' });
            console.log(error.message);
        }

    },

    ///---------------------------
    getAllGenres: async (req, res) => {
        try {

            let genres = await GenreModel.find()
                .sort({ 'name': 1 })
                .collation({ locale: "en", caseLevel: true });

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

    ///---------------------------
    addGenre: async (req, res) => {
        try {

            let genres = await GenreModel.findOne({ name: { $regex: new RegExp(req.body.genreName, 'i') } });

            if (genres) {

                res.json({ status: false, message: 'Already added' });

            } else {

                GenreModel.create({

                    name: req.body.genreName,
                    description: req.body.genreDescription,

                }).then(() => {
                    res.json({ status: true, message: 'Added' });
                })
            }

        } catch (error) {
            res.status(400).json({ status: false, message: 'admin catch error server side :: addGenres' });
            console.log("catch error addGenre " + error.message);
        }

    },

    ///---------------------------
    getAllNovels: async (req, res) => {
        try {

            let novels = await NovelModel.find()
                .populate('genre')
                .populate('author_id')
                .sort({ 'publish_date': -1 })

            if (novels) {

                res.json({ status: true, novels })

            } else {

                res.json({ status: false });
                console.og('novels is empty or there is error :: getAllNovels')

            }
        } catch (error) {
            res.status(400).json({ status: false, message: 'admin catch error server side :: getAllNovels' });
            console.log('catch error ::giveAllNovels Admin controller ' + error.message);
        }

    },

    ///--------------------------- 
    giveApprove: async (req, res) => {
        try {

            const novel = await NovelModel.updateOne({ _id: req.body.novelId }, { $set: { status: 'ongoing' } });

            if (novel) {

                res.json({ status: true, message: 'Approved' });

            } else {

                res.json({ status: false, message: 'Can\'t Approve' });
            }
        } catch (error) {
            res.status(400).json({ status: false, message: 'admin catch error server side :: giveApprove' });
            console.log('catch error at :: giveApprove adminController ' + error.message);
        }
    },

    ///---------------------------
    giveRejection: async (req, res) => {
        try {

            const { novelId, reason } = req.body
            console.log(novelId, reason)
            if (novelId, reason) {


                const novel = await NovelModel.updateOne({ _id: novelId },
                    {
                        $set: { status: 'rejected', reason: reason },
                    });

                if (novel) {

                    res.json({ status: true, message: 'Rejected' });

                } else {

                    res.json({ status: false, message: 'Can\'t reject' });
                }
            } else {
                res.json({ status: false, message: "give the reason" });
            }

        } catch (error) {
            res.status(400).json({ status: false, message: 'admin catch error server side :: giveRejection' });
            console.log('catch error at :: giveRejection adminController ' + error.message);
        }
    },

    ///---------------------------
    hideNovel: async (req, res) => {
        try {

            const { id, isHide } = req.body

            if (id) {
                await NovelModel.updateOne({ _id: id }, { $set: { is_hide: !isHide } })
                res.json({ status: true })
            }

        } catch (error) {
            res.status(400).json({ status: false, message: 'admin catch error server side :: hideNovel' });
            console.log('catch error at :: hideNovel adminController - ' + error.message)
        }
    },

    ///---------------------------
    blockUser: async (req, res) => {
        try {

            const { userId, isBlock } = req.body;

            if (userId) {
                await UserModel.updateOne({ _id: userId }, { $set: { is_Block: !isBlock } });
                res.json({ status: true });
            };

        } catch (error) {
            res.status(400).json({ status: false, message: 'admin catch error server side :: blockUser' });
            console.log('catch error at :: blockUser adminController - ' + error.message)
        }
    },
    ///---------------------------
    listGenre: async (req, res) => {
        try {

            const { genreId, isHide } = req.body;

            if (genreId) {
                await GenreModel.updateOne({ _id: genreId }, { $set: { is_Hide: !isHide } });
                res.json({ status: true });
            };

        } catch (error) {
            res.status(400).json({ status: false, message: 'admin catch error server side :: blockUser' });
            console.log('catch error at :: blockUser adminController - ' + error.message)
        }
    },
    ///---------------------------
    adminDashboard: async (req, res) => {
        try {

            const users = await UserModel.countDocuments({ is_Author: false });
            const authors = await UserModel.countDocuments({ is_Author: true });

            const aggregationPipeline = [
                {
                    $facet: {
                        novelsCount: [
                            {
                                $count: "count"
                            }
                        ],
                        mostWatched: [
                            {
                                $sort: { views: -1 }
                            },
                            {
                                $limit: 1
                            }
                        ],
                        trending: [
                            {
                                $sort: { in_library: -1 }
                            },
                            {
                                $limit: 1
                            }
                        ],
                        topRated: [
                            {
                                $sort: { rate: -1 }
                            },
                            {
                                $limit: 1
                            }
                        ]
                    }
                }
            ];

            const result = await NovelModel.aggregate(aggregationPipeline);

            const { novelsCount, mostWatched, trending, topRated } = result[0];

            const novels = novelsCount[0] ? novelsCount[0].count : 0;
            const mostWatchedNovel = mostWatched[0];
            const trendingNovel = trending[0];
            const topRatedNovel = topRated[0];

            if (users && authors && novels) {
                res.json({
                    status: true, users, authors, novels,
                    mostWatchedNovel, trendingNovel, topRatedNovel
                });
            };


        } catch (error) {
            res.status(400).json({ status: false, message: 'admin catch error server side :: adminDashboard' });
            console.log('catch error at :: adminDashboard adminController - ' + error.message)
        }
    },
    ///---------------------------
    adminEditGenre: async (req, res) => {
        try {

            const { genreId, name, description } = req.body;

            const exist = await GenreModel.findOne({
                name: { $regex: new RegExp(name, 'i') },
                _id: { $ne: genreId }
            });


            if (!exist) {

                await GenreModel.updateOne({ _id: genreId }, { $set: { name: name, description: description } });
                res.json({ status: true });
            } else {
                res.json({ status: false, message: "Already Exist" });
            }

        } catch (error) {
            res.status(400).json({ status: false, message: 'admin catch error server side :: adminEditGenre' });
            console.log('catch error at :: adminEditGenre adminController - ' + error.message)
        }
    },
    ///---------------------------


}


