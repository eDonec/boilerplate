export const assertFileType = async (_file: Express.Multer.File) => true;
// /* eslint-disable no-continue */
// /* eslint-disable no-labels */
// /* eslint-disable no-restricted-syntax */
// /* eslint-disable no-await-in-loop */
// /* eslint-disable no-bitwise */
// import fs from "fs-extra";

/**
 * TODO : implement file type assertion
 * following example of matching leading bytes
 * ressource : https://mimesniff.spec.whatwg.org/#pattern-matching-algorithm
 */

// const mimetypePatternDict: Record<
//   string,
//   { pattern: Uint8Array; mask: Uint8Array; ignored?: Uint8Array }[]
// > = {
//   "image/png": [
//     {
//       pattern: Uint8Array.from([
//         0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
//       ]),
//       mask: Uint8Array.from([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]),
//     },
//   ],
// };

// export const assertFileType = async ({
//   path,
//   mimetype,
// }: Express.Multer.File) => {
//   const entry = mimetypePatternDict[mimetype];

//   if (!entry) throw new Error(`Unhandled file type ${mimetype}`);
//   const fd = await fs.open(path, "r");

//   outer: for (let i = 0; i < entry.length; i++) {
//     const { pattern, mask, ignored } = entry[i];
//     const buffer = Buffer.alloc(pattern.length);

//     await fs.read(fd, buffer, 0, pattern.length, 0);
//     const input = Uint8Array.from(buffer);

//     let s = 0;
//     let p = 0;

//     while (s < input.length) {
//       if (ignored?.includes(input[s])) {
//         s++;
//         break;
//       }
//       if ((input[s] & mask[p]) !== pattern[p]) continue outer;
//       s++;
//       p++;
//     }

//     return;
//   }
//   throw new Error(`File is not a valid ${mimetype}`);
// };
