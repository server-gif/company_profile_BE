// Single entry point for environment loading.
//
// Two things this guarantees, which `require("dotenv").config()` alone did not:
//  1. The file is resolved from THIS project's root folder, never from
//     `process.cwd()`. Starting the API from the workspace root
//     (`node company_profile_BE/src/server.js`), from an IDE run-config, or via
//     a shared runner previously loaded zero variables and the app died with
//     "MONGODB_URI is required".
//  2. It is required as the very first line of every entry point (server.js,
//     app.js, scripts/*), so modules that read `process.env` while being
//     imported still see the values.
//
// Hosted platforms (Vercel) inject real environment variables and ship no .env
// file; dotenv never overwrites a variable that already exists, so platform
// values always win over the local file.
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const PROJECT_ROOT = path.resolve(__dirname, "..", "..");

// Most specific first: dotenv does not override already-set keys, so
// `.env.local` (personal machine overrides) wins over the shared `.env`.
[".env.local", ".env"].forEach((file) => {
  const filePath = path.join(PROJECT_ROOT, file);
  if (fs.existsSync(filePath)) {
    dotenv.config({ path: filePath, quiet: true });
  }
});

/**
 * Read a trimmed string variable, so a blank/whitespace value in .env falls
 * back to the shipped default instead of rendering an empty slot.
 */
const envString = (name, fallback = "") => {
  const value = process.env[name];
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
};

/**
 * Fail fast with a readable message instead of a vague driver error deep in a
 * third-party constructor.
 */
const requireEnv = (name) => {
  const value = envString(name);
  if (!value) throw new Error(`${name} is not set (see .env / .env.example)`);
  return value;
};

module.exports = { PROJECT_ROOT, envString, requireEnv };
