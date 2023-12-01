export default class Scene {
  constructor(objects) {
    this.objects = [...objects];
  }

  update(dt) {
    this.objects.forEach((object) => {
      object.update(dt);
      // console.log(object)
    });
  }
}
