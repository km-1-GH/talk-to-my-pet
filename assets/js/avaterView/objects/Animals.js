import * as THREE from 'three';

const animalTypes = ['sparrow', 'gecko', 'herring', 'taipan', 'muskrat', 'pudu', 'colobus', 'inkfish']

const animalType = animalTypes[Math.floor(Math.random() * animalTypes.length)]

export const ObjectNameByMotionName = Object.freeze({
  // SPARROW
  'sparrow-idle': 'Rig',
  'sparrow-attack': 'Rig009',
  'sparrow-rolling': 'Rig023',
  'sparrow-confused': 'Sparrow_LOD1004',
  'sparrow-damaged': 'Sparrow_LOD1005',
  'sparrow-shifty': 'Sparrow_LOD1006',
  // GECKO
  'gecko-idle': 'Rig001',
  'gecko-attack': 'Rig010',
  'gecko-shifty': 'Rig025',
  'gecko-damaged': 'Gecko_LOD1003',
  'gecko-rolling': 'Gecko_LOD1004',
  'gecko-confused': 'Gecko_LOD1004',
  // HERRING
  'herring-idle': 'Rig002',
  'herring-confused': 'Rig011',
  'herring-attack': 'Rig018',
  'herring-4': 'Rig027',
  'herring-damaged': 'Herring_LOD1004',
  'herring-rolling': 'Herring_LOD1005',
  'herring-shifty': 'Herring_LOD1006',
  // TAIPAN
  'taipan-idle': 'Rig003',
  'taipan-attack': 'Rig012',
  'taipan-rolling': 'Rig026',
  'taipan-damaged': 'Taipan_LOD1003',
  'taipan-confused': 'Taipan_LOD1005',
  'taipan-shifty': 'Taipan_LOD1005',
  // MUSKRAT
  'muskrat-idle': 'Rig004',
  'muskrat-attack': 'Rig013',
  'muskrat-rolling': 'Rig022',
  'muskrat-damaged': 'Rig024',
  'muskrat-shifty': 'Muskrat_LOD1004',
  'muskrat-confused': 'Muskrat_LOD1005',
//   'muskrat-shifty': 'Muskrat_LOD1006',
  // PUDU
  'pudu-idle': 'Rig005',
  'pudu-attack': 'Rig014',
  'pudu-rolling': 'Rig020',
  'pudu-damaged': 'Pudu_LOD1003',
  'pudu-confused': 'Pudu_LOD1004',
  // COLOBUS
  'colobus-idle': 'Rig006',
  'colobus-attack': 'Rig015',
  'colobus-rolling': 'Rig021',
  'colobus-damaged': 'Colobus_LOD1003',
  'colobus-confused': 'Colobus_LOD1004',
  'colobus-shifty': 'Colobus_LOD1005',
  // INKFISH
  'inkfish-idle': 'Rig007',
  'inkfish-attack': 'Rig016',
  'inkfish-rolling': 'Rig019',
  'inkfish-damaged': 'Inkfish_LOD1003',
  'inkfish-confused': 'Inkfish_LOD1004',
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
  changeMotion(motionName) {
    let motion = `${animalType}-${motionName}`;
    if (!ObjectNameByMotionName[motion]) {
        motion = `${animalType}-idle`;
    }

    // dev
    // motion = 'muskrat-7';
    console.log({ motion })

    const visibleObjectName = ObjectNameByMotionName[motion];

    for (const child of this.rootNode.children) {
      child.visible = child.name === visibleObjectName;
    }
  }
}
