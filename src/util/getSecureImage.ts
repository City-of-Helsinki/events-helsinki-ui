const getSecureImage = (imageUrl: string): string => {
  if (!process.env.REACT_APP_IMAGE_PROXY_URL) {
    return imageUrl;
  }
  try {
    if (imageUrl.startsWith('https://')) {
      return imageUrl;
    } else {
      const url = new URL(imageUrl);
      return [process.env.REACT_APP_IMAGE_PROXY_URL, url.href].join('');
    }
  } catch (e) {
    return '';
  }
};

export default getSecureImage;
