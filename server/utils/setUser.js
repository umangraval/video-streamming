const isEmpty = require('./isEmpty');
const { User } = require('../model/User');
//= =========================================================================
const setUser = async (req, res, next) => {
    const { userId } = req.session;
    if (!isEmpty(userId)) {
        const user = await User.findById(userId)
            .lean()
            .catch(() => {});
        const payload = {
            _id: user._id,
            username: user.username,
        };
        req.user = payload;
    }
    next();
};
//= =========================================================================
module.exports = setUser;
