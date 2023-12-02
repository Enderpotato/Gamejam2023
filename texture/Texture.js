export default class Texture {
  constructor(image) {
    this.image = image;
    this.pixels = [];
  }
}

Texture.prototype.loadImage = function (img) {
  this.image = img;
  this.image.loadPixels();
  this.pixels = this.image.pixels;
};

Texture.prototype.getPixel = function (u, v) {
  let x = Math.floor(u * this.image.width);
  let y = Math.floor(v * this.image.height);
  let index = (x + y * this.image.width) * 4;
  let r = this.pixels[index];
  let g = this.pixels[index + 1];
  let b = this.pixels[index + 2];
  let a = this.pixels[index + 3];
  return [r, g, b, a];
};
