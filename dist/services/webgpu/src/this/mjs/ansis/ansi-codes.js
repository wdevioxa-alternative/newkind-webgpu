/**
 * @param {Object?} processMock The mock of process object, used by unit test only.
 * @returns {boolean}
 */
export const isSupported = (processMock) => {
  /**
   * Detect whether flags exist with `-` or `--` prefix in command-line arguments.
   *
   * @param {RegExp} regex The RegEx to match all possible flags.
   * @return {boolean}
   */
  const oneOfFlags = (regex) => !!argv.find((value) => regex.test(value));

  const proc = processMock ? processMock : typeof process !== 'undefined' ? process : {};
  const { stdout, platform } = proc;
  const env = proc.env || {};
  const argv = proc.argv || [];

  const hasForceColor = 'FORCE_COLOR' in env;
  const forceColorValue = env.FORCE_COLOR;
  const forceColor = forceColorValue === 'true' || parseInt(forceColorValue) > 0;

  const isForceDisabled = 'NO_COLOR' in env
    || (hasForceColor && !forceColor)
    || oneOfFlags(/^-{1,2}(no-color|color=false|color=never)$/);

  const isForceEnabled = (hasForceColor && forceColor) || oneOfFlags(/^-{1,2}(color|color=true|color=always)$/);

  const isTerm = stdout && 'isTTY' in stdout &&
    /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM);

  return !isForceDisabled && (isForceEnabled || isTerm || platform === 'win32' || 'CI' in env);
};

const noColor = { open: '', close: '' };
const esc = (open, close) => {

  return ({ open: `\x1b[${open}m`, close: `\x1b[${close}m` })
 // return !isSupported() ? (open, close) => ({ open: `\x1b[${open}m`, close: `\x1b[${close}m` }) : () => noColor;
}
export const ansi256 = (code) => esc(`38;5;${code}`, 39);
export const bgAnsi256 = (code) => esc(`48;5;${code}`, 49);
export const rgb = (r, g, b) => esc(`38;2;${r};${g};${b}`, 39);
export const bgRgb = (r, g, b) => esc(`48;2;${r};${g};${b}`, 49);

export const baseStyles = {
  // misc
  visible: noColor,
  reset: esc(0, 0),
  inverse: esc(7, 27),
  hidden: esc(8, 28),

  // styles
  bold: esc(1, 22),
  dim: esc(2, 22),
  faint: esc(2, 22), // alias for dim, TODO: remove in next major release
  italic: esc(3, 23),
  underline: esc(4, 24),
  doubleUnderline: esc(21, 24), // not widely supported, TODO: remove in next major release
  strikethrough: esc(9, 29),
  strike: esc(9, 29), // alias for strikethrough
  frame: esc(51, 54), // not widely supported, TODO: remove in next major release
  encircle: esc(52, 54), // not widely supported, TODO: remove in next major release
  overline: esc(53, 55), // not widely supported, TODO: remove in next major release

  // foreground colors
  black: esc(30, 39),
  red: esc(31, 39),
  green: esc(32, 39),
  yellow: esc(33, 39),
  blue: esc(34, 39),
  magenta: esc(35, 39),
  cyan: esc(36, 39),
  white: esc(37, 39),
  grey: esc(90, 39), // UK spelling alias for blackBright
  gray: esc(90, 39), // US spelling alias for blackBright
  blackBright: esc(90, 39),
  redBright: esc(91, 39),
  greenBright: esc(92, 39),
  yellowBright: esc(93, 39),
  blueBright: esc(94, 39),
  magentaBright: esc(95, 39),
  cyanBright: esc(96, 39),
  whiteBright: esc(97, 39),

  // background colors
  bgBlack: esc(40, 49),
  bgRed: esc(41, 49),
  bgGreen: esc(42, 49),
  bgYellow: esc(43, 49),
  bgBlue: esc(44, 49),
  bgMagenta: esc(45, 49),
  bgCyan: esc(46, 49),
  bgWhite: esc(47, 49),
  bgBlackBright: esc(100, 49),
  bgRedBright: esc(101, 49),
  bgGreenBright: esc(102, 49),
  bgYellowBright: esc(103, 49),
  bgBlueBright: esc(104, 49),
  bgMagentaBright: esc(105, 49),
  bgCyanBright: esc(106, 49),
  bgWhiteBright: esc(107, 49),
};
