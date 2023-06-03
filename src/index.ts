import { Logger } from "./modules/logger.js";

let logger: Logger = new Logger("./log.txt", true);
logger.log("Hello World!");
logger.warning("Hello World!");
logger.error("Hello World!");
