const SPEED = 0.02;

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
    this.reset();
  }
//funkce pro získání pozice platformy
  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--position")
    )
  }

  set position(value) {
    this.paddleElem.style.setProperty("--position", value);
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }
  //reset pozic
  reset() {
    this.position = 50;
  }
//update funkce pro platformu ovládanou počítačem
  update(delta, ballHeight) {
    this.position += SPEED * delta * (ballHeight - this.position);
  }
}