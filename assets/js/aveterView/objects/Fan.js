import * as THREE from 'three';

export default class Fan extends EventTarget {
  /** @type {THREE.Group} */
  model;

  /** @type {THREE.AnimationMixer} */
  mixer;

  /** @type {THREE.AnimationAction} */
  action;

  /** @type {THREE.Raycaster} */
  raycaster;

  /** @type {THREE.Vector2} */
  mouse;

  /** @type {THREE.PerspectiveCamera | null} */
  camera;

  /** @type {HTMLCanvasElement | null} */
  canvas;

  constructor(gltf) {
    super()
    this.model = gltf.scene;
    this.mixer = new THREE.AnimationMixer(this.model)
    this.action = this.mixer.clipAction(gltf.animations[0])
    this.action.play()
    this.off()

    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
    this.camera = null;
    this.canvas = null;
  }

  /**
   * @param {THREE.PerspectiveCamera} camera
   * @param {HTMLCanvasElement} canvas
   */
  enableClick(camera, canvas) {
    this.camera = camera;
    this.canvas = canvas;
    this.handleClickBound = (event) => this.handleClick(event)
    canvas.addEventListener('click', this.handleClickBound)
  }

  /**
   * Disable click events
   */
  disableClick() {
    if (this.canvas && this.handleClickBound) {
      this.canvas.removeEventListener('click', this.handleClickBound)
    }
    this.camera = null;
    this.canvas = null;
  }

  /**
   * @param {MouseEvent} event
   */
  handleClick(event) {
    if (!this.camera || !this.canvas) return;

    const rect = this.canvas.getBoundingClientRect()
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera)
    const intersects = this.raycaster.intersectObject(this.model, true)

    if (intersects.length > 0) {
      this.dispatchEvent(new Event('click'))
    }
  }

  on () {
    this.action.paused = false;
  }

  off () {
    this.action.paused = true;
  }

  toggle () {
    this.action.paused = !this.action.paused;
  }
}
