export default class Renderer {
  constructor() {}

  render(scene) {
    fill(255, 0, 0);
    text("Renderer working!", 100, 50);

    scene.objects.forEach((object) => {
      console.log(object);
    });
  }
}
