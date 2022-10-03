const mongoSecret = require('../mongoDB/db')
const userSchema = require('../mongoDB/users-schema')

var JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function (passport) {
	var opts = {}
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = mongoSecret.secret;
	passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
		userSchema.findOne({ id: jwt_payload.sub }, function (err, user) {
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
