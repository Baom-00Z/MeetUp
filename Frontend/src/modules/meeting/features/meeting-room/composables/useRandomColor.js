export const randomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70;
  const light1 = 60;
  const light2 = 40;
  const light3 = 25;
  const color1 = `hsl(${hue}, ${saturation}%, ${light1}%)`;
  const color2 = `hsl(${hue}, ${saturation}%, ${light2}%)`;
  const color3 = `hsl(${hue}, ${saturation}%, ${light3}%)`;
  return `radial-gradient(circle, ${color1} 0%, ${color2} 50%, ${color3} 100%)`;
};
