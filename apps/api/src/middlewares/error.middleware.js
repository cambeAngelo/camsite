export function errorHandler(err, req, res, next) {
  console.error("❌ ERROR:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    ok: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

export function notFound(req, res) {
  res.status(404).json({ ok: false, error: "Route not found" });
}
