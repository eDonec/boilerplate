export default (url: string, width = 200, height = 200): string =>
  url.replace("$w", `${width}`).replace("$h", `${height}`);
