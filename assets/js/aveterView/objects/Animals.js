import * as THREE from 'three';

export const ObjectNameByMotionName = Object.freeze({
  // SPARROW
  'idle': 'Rig',
  'attack': 'Rig009',
  'rolling': 'Rig023',
  'confused': 'Sparrow_LOD1004',
  'damaged': 'Sparrow_LOD1005',
  'shifty': 'Sparrow_LOD1006',
  // GECKO
  'gecko-1': 'Rig001',
  'gecko-2': 'Rig010',
  'gecko-3': 'Rig025',
  'gecko-4': 'Gecko_LOD1003',
  'gecko-5': 'Gecko_LOD1004',
  // HERRING
  'herring-1': 'Rig002',
  'herring-2': 'Rig011',
  'herring-3': 'Rig018',
  'herring-4': 'Rig027',
  'herring-5': 'Herring_LOD1004',
  'herring-6': 'Herring_LOD1005',
  'herring-7': 'Herring_LOD1006',
  // TAIPAN
  'taipan-1': 'Rig003',
  'taipan-2': 'Rig012',
  'taipan-3': 'Rig026',
  'taipan-4': 'Taipan_LOD1003',
  'taipan-5': 'Taipan_LOD1005',
  // MUSKRAT
  'muskrat-1': 'Rig004',
  'muskrat-2': 'Rig013',
  'muskrat-3': 'Rig022',
  'muskrat-4': 'Rig024',
  'muskrat-5': 'Muskrat_LOD1004',
  'muskrat-6': 'Muskrat_LOD1005',
  'muskrat-7': 'Muskrat_LOD1006',
  // PUDU
  'pudu-1': 'Rig005',
  'pudu-2': 'Rig014',
  'pudu-3': 'Rig020',
  'pudu-4': 'Pudu_LOD1003',
  'pudu-5': 'Pudu_LOD1004',
  // COLOBUS
  'colobus-1': 'Rig006',
  'colobus-2': 'Rig015',
  'colobus-3': 'Rig021',
  'colobus-4': 'Colobus_LOD1003',
  'colobus-5': 'Colobus_LOD1004',
  'colobus-6': 'Colobus_LOD1005',
  // INKFISH
  'inkfish-1': 'Rig007',
  'inkfish-2': 'Rig016',
  'inkfish-3': 'Rig019',
  'inkfish-4': 'Inkfish_LOD1003',
  'inkfish-5': 'Inkfish_LOD1004',
})

const ANIMAL = Object.freeze({
  POSITION: new THREE.Vector3(0, 0, 0),
  ROTATION: new THREE.Euler(0, 0, 0),
  SCALE: new THREE.Vector3(20, 20, 20),
})

export default class Animals extends EventTarget {
  /** @type {THREE.Group} */
  model;

  /** @type {THREE.Group} */
  rootNode;

  /** @type {THREE.AnimationMixer} */
  mixer;

  /** @type {THREE.Raycaster} */
  raycaster;

  /** @type {THREE.Vector2} */
  mouse;

  /** @type {THREE.PerspectiveCamera | null} */
  camera;

  /** @type {HTMLCanvasElement | null} */
  canvas;

  /**
   *
   * @param {THREE.GLTF} gltf
   */
  constructor(gltf) {
    super()
    const model = gltf.scene;
    model.position.set(0, 0, 0)
    this.model = model;

    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
    this.camera = null;
    this.canvas = null;

    const rootNode = model.getObjectByName('RootNode')
    for (const child of rootNode.children) {
      child.visible = false;
      child.position.copy(ANIMAL.POSITION)
      child.rotation.copy(ANIMAL.ROTATION)
    }
    this.rootNode = rootNode;

    const mixer = new THREE.AnimationMixer(this.model)
    this.mixer = mixer;

    const currentAction = mixer.clipAction(gltf.animations[0])
    currentAction.play()
    this.currentAction = currentAction;
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

  /**
   * @param {[keyof typeof ObjectNameByMotionName]} motion
   */
  changeMotion(motion) {
    const visibleObjectName = ObjectNameByMotionName[motion];

    for (const child of this.rootNode.children) {
      child.visible = child.name === visibleObjectName;
    }
  }
}
