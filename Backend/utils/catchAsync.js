module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); //next(err) will throw an error so the last line in app will work and new error will be handled in globalerror handlerd
  };
};
