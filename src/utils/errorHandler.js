export class AppErr extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

export const catchError = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  const status = err.status || "error";
  const stack = err.stack;

  return res.status(statusCode).json({
    status,
    message,
    stack,
  });
};
