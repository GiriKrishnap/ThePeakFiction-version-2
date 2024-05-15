const { json } = require('express');
const CommunityModel = require('../model/communityModel');
const UserModel = require('../model/UserModel');
//---------------------------------------------------------

module.exports = {

    getAllMessage: async (req, res) => {
        try {

            const { novelId } = req.query

            const communityExist = await CommunityModel.findOne({ novel_id: novelId })
                .populate('novel_id')
                .populate("messages.user_id");

            if (!communityExist) {

                console.log("No communityExist here - ");

                res.json({ status: false, message: 'community not exist in the given id' });

            } else {

                console.log("communityExist.name here - ", communityExist.name);
                res.json({
                    status: true, message: communityExist.messages, members: communityExist.members,
                    name: communityExist.name, communityId: communityExist._id
                });
            }

        } catch (error) {
            res.status(400).json({ status: false, message: "oops catch error on getCommunity backend" });
            console.log(error + ' error in getCommunity - ' + error.message);
        }
    },

    //------------------------------------------------

    newMessage: async (req, res) => {
        try {

            const { message, user_id, date, novelId, image_url } = req.body;

            console.log(message, user_id, novelId, '\n', image_url);


            const data = {
                user_id: user_id,
                message: message,
                date: date,
                image_url
            }

            const addMessage = await CommunityModel.findOneAndUpdate({ novel_id: novelId },
                { $push: { messages: data } },
                { new: true }
            ).populate('messages.user_id')

            if (addMessage) {
                res.json({ status: true, data: addMessage.messages });
            } else {
                res.json({ status: false });
            }

        } catch (error) {
            console.log('catch error on ::newMessage - ', error.message)
            res.status(400).json({ status: false, message: "oops catch error on newMessage backend" })
        }
    },

    //------------------------------------------------
    joinCommunity: async (req, res) => {
        try {
            const { communityId, userId } = req.body;
            const userData = await UserModel.findOne({ _id: userId });
            const exist = userData.community.find((item) => item.toString() === communityId)

            if (!exist) {
                await UserModel.updateOne({ _id: userId }, { $push: { community: communityId } })

                res.json({ status: true, message: "joined to community" });

            } else {

                await UserModel.updateOne({ _id: userId }, { $pull: { community: communityId } })
                res.json({ status: true, message: "Exited From community" });

            }

        } catch (error) {
            console.log('catch error on ::joinCommunity - ', error.message)
            res.status(400).json({ status: false, message: "oops catch error on joinCommunity backend" })
        }
    },
    //------------------------------------------------
    getCommunity: async (req, res) => {
        try {
            const { userId } = req.query;
            const community = await UserModel.findOne({ _id: userId }, { _id: 0, community: 1 }).populate('community');
            res.json({ status: true, community });

        } catch (error) {
            console.log('catch error on ::getCommunity - ', error.message)
            res.status(400).json({ status: false, message: "oops catch error on getCommunity backend" });
        }
    }
    //------------------------------------------------


}


