export function randDarkColor() {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}

export function assembleColor(r, g, b, transparency) {
  var trans = transparency? transparency : '0.5'; // 50% transparency
  var color = 'rgba(';
  color += r + ',';
  color += g + ',';
  color += b + ',';
  color += trans + ')'; // add the transparency
  return color;
}

export function getColorRGBnumber() {
    return Math.floor(Math.random() * 255);
  }
  