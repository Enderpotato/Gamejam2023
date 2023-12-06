export default class TextureBuffer {
  constructor() {}
}

TextureBuffer.prototype.addTexture = function (image, name) {
  this[name] = image;
};
