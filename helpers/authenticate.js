const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('message', 'Not Authorized.');
  res.redirect('/login');
};

module.exports = helpers;
