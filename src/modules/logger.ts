import fs from "fs";

import LogType from "./log-type.js";
import Color from "./color.js";
import Timestamp from "../utility/timestamp/timestamp.js";

class Logger {
  private logDirectoryPath: string;
  private logFileName: string;
  private logToFile: boolean;
  private colorLog: string;
  private colorWarning: string;
  private colorError: string;

  constructor(
    logDirectoryPath?: string,
    logFileName?: string,
    logToFile?: boolean
  ) {
    this.logDirectoryPath = logDirectoryPath || "./";
    this.logFileName = logFileName || "./log.txt";
    this.logToFile = logToFile || false;
    this.colorLog = Color.Blue;
    this.colorWarning = Color.Orange;
    this.colorError = Color.BrightRed;
  }

  public setColorLog(color: string): void {
    this.colorLog = color;
  }

  public setColorWarning(color: string): void {
    this.colorWarning = color;
  }

  public setColorError(color: string): void {
    this.colorError = color;
  }

  public log(message: string): void {
    const messages = this.formatLogMessage(LogType.LOG, message);
    console.log(messages.logMessage);
    this.writeLogToFile(messages.fileLogMessage);
  }

  public warning(message: string): void {
    const messages = this.formatLogMessage(LogType.WARNING, message);
    console.log(messages.logMessage);
    this.writeLogToFile(messages.fileLogMessage);
  }

  public error(message: string): void {
    const messages = this.formatLogMessage(LogType.ERROR, message);
    console.log(messages.logMessage);
    this.writeLogToFile(messages.fileLogMessage);
  }

  private formatLogMessage(type: LogType, message: string): any {
    const timestamp: string = Timestamp.getCurrentTimestamp();
    const dateTime = Timestamp.getDateTime(timestamp);
    let logMessage: string = `${dateTime} [${type}] ${message}`;
    let fileLogMessage: string = logMessage;
    let restOfMessage: string = logMessage + Color.Reset;

    switch (type) {
      case LogType.LOG:
        logMessage = this.colorLog + restOfMessage;
        break;
      case LogType.WARNING:
        logMessage = this.colorWarning + restOfMessage;
        break;
      case LogType.ERROR:
        logMessage = this.colorError + restOfMessage;
        break;
      default:
        break;
    }

    return { logMessage: logMessage, fileLogMessage: fileLogMessage };
  }

  private writeLogToFile(logMessage: string): void {
    if (!this.logToFile) {
      return;
    }

    if (!fs.existsSync(this.logDirectoryPath)) {
      fs.mkdirSync(this.logDirectoryPath, { recursive: true });
    }

    const fullFilePath = `${this.logDirectoryPath}/${this.logFileName}`;
    console.log(fullFilePath);

    if (!fs.existsSync(fullFilePath)) {
      fs.writeFileSync(fullFilePath, "");
    }

    fs.appendFileSync(fullFilePath, logMessage + "\n");
  }
}

const timestamp: string = Timestamp.getCurrentTimestamp();
const date: string = Timestamp.getDate(timestamp);
const time: string = Timestamp.getTime(timestamp, "-");
export const logger: Logger = new Logger(
  "./logs",
  `log-${date}-${time}.txt`,
  true
);

export default Logger;
