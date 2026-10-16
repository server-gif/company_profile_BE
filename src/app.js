// Loads company_profile_BE/.env from this project's own folder before any
// module below reads process.env at import time (chatbot, R2, site config).
require("./config/env");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const adminRoutes = require("./routes/adminRoutes");
const openingRoutes = require("./routes/openingRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const chatbotRoutes = require("./routes/chatbot");
const leadershipRoutes = require("./routes/leadershipRoutes");
const blogRoutes = require("./routes/blogRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const homeStatRoutes = require("./routes/homeStatRoutes");
const aboutGalleryRoutes = require("./routes/aboutGalleryRoutes");
const siteConfigRoutes = require("./routes/siteConfigRoutes");

// Comma-separated public origins allowed to call this API (FE + Admin).
// Set it in the backend .env for local work and in the host's project
// environment for the deployed apps.
const buildAllowedOrigins = () =>
  String(process.env.CLIENT_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);

// Local dev ports are always accepted so the public site (5173) and the admin
// app (5175) work on any machine without editing .env.
const isDevOrigin = (origin) =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d{1,5})?$/.test(origin);

function createApp() {
  const app = express();
  const allowedOrigins = buildAllowedOrigins();

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(
    cors({
      origin: (origin, callback) => {
        // No Origin header = same-origin, curl, mobile app or server-to-server.
        if (!origin || isDevOrigin(origin) || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(
          new Error(`Origin ${origin} is not allowed by CORS (CLIENT_ORIGIN)`),
        );
      },
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true, limit: "2mb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ success: true, message: "API is healthy" });
  });
  app.use("/api/contacts", contactRoutes);
  app.use("/api/openings", openingRoutes);
  app.use("/api/applications", applicationRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/chatbot", chatbotRoutes);
  app.use("/api/leadership", leadershipRoutes);
  app.use("/api/blogs", blogRoutes);
  app.use("/api/portfolio", portfolioRoutes);
  app.use("/api/home-stats", homeStatRoutes);
  app.use("/api/about-gallery", aboutGalleryRoutes);
  app.use("/api/site-config", siteConfigRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
