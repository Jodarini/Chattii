"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../../server/db/client");
const examples = async (req, res) => {
    const examples = await client_1.prisma.message.findMany();
    res.status(200).json(examples);
};
exports.default = examples;
