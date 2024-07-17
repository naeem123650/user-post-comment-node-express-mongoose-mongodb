module.exports = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    status: "success",
    data,
  });
};
