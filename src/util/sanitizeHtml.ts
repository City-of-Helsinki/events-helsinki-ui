import sanitize from 'sanitize-html';

const sanitazeHtml = (html: string): string => {
  return sanitize(unescape(html), {
    allowedTags: [
      'br',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'bold',
      'italic',
      'ol',
      'ul',
      'li',
      'hr',
      'a',
      'p',
    ],
    allowedAttributes: {
      a: ['href'],
    },
  });
};

export default sanitazeHtml;
