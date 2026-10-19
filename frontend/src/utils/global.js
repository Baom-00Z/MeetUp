export const formatMessageTime = (time) => {
  return new Date(time).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase();
};

export const attachStream = (deviceElement, mediaStream) => {
  if (deviceElement.value) {
    deviceElement.value.srcObject = mediaStream.value;
  }
};
