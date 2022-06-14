var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_fastify = __toESM(require("fastify"));
var import_path = require("path");
var import_autoload = __toESM(require("@fastify/autoload"));
const fastify = (0, import_fastify.default)({
  logger: true
});
fastify.register(import_autoload.default, {
  dir: (0, import_path.join)(__dirname, "routes")
});
const start = async () => {
  try {
    await fastify.listen(3e3);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
