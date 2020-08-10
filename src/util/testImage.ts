/**
 * Test that loading image is successful
 * @param {string} url
 */
export default (url: string) => {
  // Define the promise
  const imgPromise = new Promise(function imgPromise(resolve, reject) {
    // Create the image
    const imgElement = new Image();

    // When image is loaded, resolve the promise
    imgElement.addEventListener('load', () => {
      resolve();
    });

    // When there's an error during load, reject the promise
    imgElement.addEventListener('error', () => {
      reject();
    });

    // Assign URL
    imgElement.src = url;
  });

  return imgPromise;
};
