import fs from "fs";

import LogType from "./log-type.js";
import Color from "./color.js";
import formatTimestamp from "../utility/date-and-time/format-timestamp.js";

export class Logger {
  private logFilePath: string;
  private logToFile: boolean;
  private colorLog: string;
  private colorWarning: string;
  private colorError: string;

  constructor(logFilePath?: string, logToFile?: boolean) {
    this.logFilePath = logFilePath || "./log.txt";
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

  private getCurrentTimestamp(): string {
    const now = new Date();
    return now.toISOString();
  }

  private formatLogMessage(type: LogType, message: string): any {
    const timestamp: string = this.getCurrentTimestamp();
    const { date, time } = formatTimestamp(timestamp);
    let logMessage: string = `[${date} || ${time}] [${type}] ${message}`;
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

    fs.appendFileSync(this.logFilePath, logMessage + "\n");
  }
}
