var requireOption = require('../common').requireOption;

/**
 * Gets all the messages of a conversation
 */
module.exports = function (objectrepository) {
    var conversationModel = requireOption(objectrepository, 'conversationsModel');

    return function (req, res, next) {
        console.log("getConversationData");
        conversationModel.findOne({
            _id: req.param("id")
        }).populate("_messages _user1 _user2").exec(function (err, results) {
            if (err) {
                return next(new Error('Error getting conversation'));
            }

            res.tpl.conversation = results;
            return next();
        });
    };

};