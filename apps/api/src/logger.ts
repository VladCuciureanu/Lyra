export function log(...args: any) {
  console.log(args);
}

export function warn(...args: any) {
  console.warn(args);
}

export function error(...args: any) {
  console.error(args);
}

export function info(...args: any) {
  console.info(args);
}

export function debug(...args: any) {
  console.debug(args);
}

export function trace(...args: any) {
  console.trace(args);
}

export default {
  log,
  warn,
  error,
  info,
  debug,
  trace,
};
