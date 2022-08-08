"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
const env_schema_mjs_1 = require("./env-schema.mjs");
const _env = env_schema_mjs_1.envSchema.safeParse(process.env);
const formatErrors = (
/** @type {import('zod').ZodFormattedError<Map<string,string>,string>} */
errors) => Object.entries(errors)
    .map(([name, value]) => {
    if (value && "_errors" in value)
        return `${name}: ${value._errors.join(", ")}\n`;
})
    .filter(Boolean);
if (!_env.success) {
    console.error("❌ Invalid environment variables:\n", ...formatErrors(_env.error.format()));
    process.exit(1);
}
exports.env = _env.data;
