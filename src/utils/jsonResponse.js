export const response = (res, message, data) => {
  return res.json({
    status: "success",
    message,
    data,
  });
};
