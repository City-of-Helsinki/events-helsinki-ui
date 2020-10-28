const getSecureImage = (imageUrl: string): string => {
  if (!process.env.REACT_APP_IMAGE_PROXY_URL) {
    return imageUrl;
  }

  const url = new URL(imageUrl);

  return imageUrl.startsWith('https://')
    ? imageUrl
    : [process.env.REACT_APP_IMAGE_PROXY_URL, url.host, url.pathname].join('');
};

export default getSecureImage;
