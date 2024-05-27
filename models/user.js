const user = new mongoose.Schema({
    userID: String,
    accessToken: String,
    refreshToken: String,
    updateAt: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') },
    createdAt: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') },
});

module.exports = mongoose.model('user', user);