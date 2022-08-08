"use strict";
// Example of a restricted endpoint that only authenticated users can access from https://next-auth.js.org/getting-started/example
Object.defineProperty(exports, "__esModule", { value: true });
const next_auth_1 = require("next-auth");
const ____nextauth_1 = require("./auth/[...nextauth]");
const restricted = async (req, res) => {
    const session = await (0, next_auth_1.unstable_getServerSession)(req, res, ____nextauth_1.authOptions);
    if (session) {
        res.send({
            content: "This is protected content. You can access this content because you are signed in.",
        });
    }
    else {
        res.send({
            error: "You must be signed in to view the protected content on this page.",
        });
    }
};
exports.default = restricted;
