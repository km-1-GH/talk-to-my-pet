import * as THREE from 'three';

export default class Room {
  /** @type {THREE.Group} */
  model;

  /** @type {Array<THREE.AnimationClip>} */
  animations;

  /**
   *
   * @param {THREE. } gltf
   */
  constructor(gltf) {
    this.model = gltf.scene;
    this.animations = gltf.animations;
  }
}
