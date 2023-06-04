enum Color {
  Reset = "\x1b[0m",
  Black = "\x1b[30m",
  Red = "\x1b[31m",
  Green = "\x1b[32m",
  Yellow = "\x1b[33m",
  Blue = "\x1b[34m",
  Magenta = "\x1b[35m",
  Cyan = "\x1b[36m",
  White = "\x1b[37m",
  BlackBackground = "\x1b[40m",
  RedBackground = "\x1b[41m",
  GreenBackground = "\x1b[42m",
  YellowBackground = "\x1b[43m",
  BlueBackground = "\x1b[44m",
  MagentaBackground = "\x1b[45m",
  CyanBackground = "\x1b[46m",
  WhiteBackground = "\x1b[47m",
  BrightBlack = "\x1b[90m",
  BrightRed = "\x1b[91m",
  BrightGreen = "\x1b[92m",
  BrightYellow = "\x1b[93m",
  BrightBlue = "\x1b[94m",
  BrightMagenta = "\x1b[95m",
  BrightCyan = "\x1b[96m",
  BrightWhite = "\x1b[97m",
  BrightBlackBackground = "\x1b[100m",
  BrightRedBackground = "\x1b[101m",
  BrightGreenBackground = "\x1b[102m",
  BrightYellowBackground = "\x1b[103m",
  BrightBlueBackground = "\x1b[104m",
  BrightMagentaBackground = "\x1b[105m",
  BrightCyanBackground = "\x1b[106m",
  BrightWhiteBackground = "\x1b[107m",
  Orange = "\x1b[38;5;208m",
  BrightOrange = "\x1b[38;5;214m",
}

export function color(message: string, color: Color): string {
  return `${color}${message}${Color.Reset}`;
}

export default Color;
