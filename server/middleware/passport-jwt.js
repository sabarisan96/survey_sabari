const PassportJWT = require('passport-jwt');
const devConfig = require('../env/development');
const User = require('../user/user.model');
const passport = require('passport');

module.exports = function configureJWTStrategy() {

    var opts = {}
    opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = devConfig.secret;
    passport.use(
        new PassportJWT.Strategy(opts, (payload, done) => {
            User.findOne({ id: payload._id }, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
        }));


}
