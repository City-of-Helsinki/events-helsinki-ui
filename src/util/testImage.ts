/**
 * Test that loading image is successful
 */
const testImage = (url: string): Promise<unknown> => {
  // Define the promise
  const imgPromise = new Promise<void>((resolve, reject) => {
    // Create the image
    const imgElement = new Image();

    // When image is loaded, resolve the promise
    imgElement.addEventListener('load', () => resolve());

    // When there's an error during load, reject the promise
    imgElement.addEventListener('error', () => reject());

    // Assign URL
    imgElement.src = url;
  });

  return imgPromise;
};

export default testImage;
