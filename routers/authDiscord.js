const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-discord').Strategy;
const MemoryStore = require(`memorystore`)(session);

module.exports = function () {
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));
    passport.use(new Strategy({
        clientID: config.bot.client_id,
        clientSecret: config.bot.client_secret,
        callbackURL: config.bot.callback,
        scope: [`identify`, `guilds`,`guilds.join`, `email`]
        }, async (accessToken, refreshToken, profile, done) => {
            let user = await userModel.findOne({ userID: profile.id });
            if (!user) {
                new userModel({
                    userID: profile.id,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                }).save();
            } else {
                await userModel.findOneAndUpdate({ userID: profile.id }, { accessToken: accessToken, refreshToken: refreshToken, updateAt: moment().format('YYYY-MM-DD HH:mm:ss') });
            }
            let role = system.fastDB.get('role');
            let guild = system.fastDB.get('guild');
            let unverify = system.fastDB.get('role_unverify');
            let member = await client.guilds.cache.get(guild).members.fetch(profile.id);
            if (!member) {
                client.guilds.cache.get(guild).members.fetch(profile.id).then(async (member) => {
                    member.roles.add(role);
                    member.roles.remove(unverify);
                });
            } else {
                member.roles.add(role);
                member.roles.remove(unverify);
            }
            process.nextTick(() => done(null, profile));
    }));

    
    app.use(session({
        store: new MemoryStore({ checkPeriod: 86400000 }),
        secret: 'CACNAACANNNCANAAAAA',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 86400000,
            httpOnly: true
        },
    }));

    app.use(passport.initialize());
    app.use(passport.session());


    app.get('/check', function (req, res) {
        if (req.isAuthenticated()) {
            res.json({ status: true, user: req.user.username, message: 'Giriş yapıldı! Discord a dönebilirsiniz.' });
        } else {
            res.send(`<center><h1>Giriş yapmadınız!</h1><a href="/login">Giriş yapmak için tıklayın!</a></center>`);
        }
    });

    /////////////////////////// AUTH ///////////////////////////
    app.get('/login', passport.authenticate('discord'));

    app.get('/auth/discord', passport.authenticate('discord', { failureRedirect: '/check' }),
        (req, res) => {
            let role = system.fastDB.get('role');
            if(!role) return res.send(`<center><h1>Botun rolü ayarlanmamış!<br>Sunucu sahibiyle iletişime geçin!</h1></center>`);
            res.redirect('https://discord.com/login?success=true&message=Giriş başarılı!');
        }
    );

    app.get('*', function (req, res) {
        res.status(404).redirect('/check');
    });
};