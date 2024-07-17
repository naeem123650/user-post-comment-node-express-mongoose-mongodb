const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const groupedErrors = errors.array().reduce((acc, err) => {
      if (!acc[err.path]) {
        acc[err.path] = [];
      }
      acc[err.path].push(err.msg);
      return acc;
    }, {});

    return res.status(400).json({
      status: "failed",
      errors: groupedErrors,
    });
  }

  next();
};

module.exports = handleValidationErrors;
