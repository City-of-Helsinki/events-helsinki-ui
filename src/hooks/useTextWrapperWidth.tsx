import React from 'react';

// We want to have event padding for the text wrapper. By using pure CSS we can set
// max-width for the wrapper but when the text is longer that max-width the text
// will take space of max-width and there might be wider right padding.
// So we need to calculate the max-width of each text row and set max-width of
// text wrapper to same
const useTextWrapperWidth = ({
  font,
  maxTextWrapperWidth,
  title,
}: {
  font: string;
  maxTextWrapperWidth: number | undefined;
  title: string;
}): number | null => {
  const textWrapperWidth = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context && maxTextWrapperWidth && title) {
      context.font = font;

      const words = title.trim().split(' ');
      let i = 0;
      let text = words[i];
      let maxTextWidth = 0;
      let prevTextWidth = 0;
      let textWidth = 0;

      // Loop through all the words
      while (i < words.length) {
        textWidth = context.measureText(text).width;

        if (textWidth <= maxTextWrapperWidth) {
          // Add new word to text if text width is smaller than max text wrapper width
          prevTextWidth = textWidth;
          i = i + 1;
          text = [text, words[i]].join(' ');
        } else {
          if (text === words[i]) {
            // If single word is longer than max text wrapper width compare
            // maxTextWidth and single word width
            maxTextWidth = Math.max(maxTextWidth, textWidth);
            i = i + 1;
          } else {
            maxTextWidth = Math.max(maxTextWidth, prevTextWidth);
          }
          text = words[i];
        }
      }

      return Math.ceil(maxTextWidth);
    }

    return null;
  }, [font, maxTextWrapperWidth, title]);

  return textWrapperWidth;
};

export default useTextWrapperWidth;
