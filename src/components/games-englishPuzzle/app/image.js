const calcNewSize = (width, height, targetWidth, targetHeight) => {
  const aspectRatio = width / height;
  if (targetHeight * aspectRatio < targetWidth) {
    return [targetWidth, targetWidth / aspectRatio];
  }
  return [targetHeight * aspectRatio, targetHeight];
};

const getCroppedImageUrl = async (imageUrl, width, height) => {
  return fetch(imageUrl)
    .then((resp) => resp.blob())
    .then((image) => URL.createObjectURL(image))
    .then((url) =>
      width
        ? new Promise((resolve) => {
            const canvasElement = document.createElement('canvas');
            const canvas = canvasElement.getContext('2d');
            canvasElement.width = width;
            canvasElement.height = height;
            const imgBuffer = new Image();
            imgBuffer.src = url;
            imgBuffer.addEventListener('load', () => {
              const [newWidth, newHeight] = calcNewSize(
                imgBuffer.width,
                imgBuffer.height,
                width,
                height
              );
              canvas.drawImage(imgBuffer, 0, 0, newWidth, newHeight);
              const dataUrl = canvasElement.toDataURL('image/jpeg');
              canvas.clearRect(0, 0, canvas.width, canvas.height);
              resolve(dataUrl);
            });
          })
        : url
    );
};

export default getCroppedImageUrl;
