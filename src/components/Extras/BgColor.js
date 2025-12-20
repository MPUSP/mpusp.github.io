export default function BgColor(colors, bgvalue) {
  return (
    colors[Math.floor(bgvalue * colors.length)]
  );
}
