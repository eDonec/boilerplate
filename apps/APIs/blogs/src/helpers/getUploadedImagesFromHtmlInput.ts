export const getUploadedImagesFromHtmlInput = (input: string): string[] => {
  const regex = /<img[^>]+src="([^">]+)"/g;
  const images = [];
  let m: RegExpExecArray | null;

  // eslint-disable-next-line no-cond-assign
  while ((m = regex.exec(input)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    images.push(m[1]);
  }

  return images.map((el) => el.split("/").pop() || el);
};
