// https://stackoverflow.com/questions/7033639/split-large-string-in-n-size-chunks-in-javascript
export const chunkString = (str: string, length: number): string[] =>
  (str.match(new RegExp('.{1,' + length + '}', 'g')) || []) as string[];
