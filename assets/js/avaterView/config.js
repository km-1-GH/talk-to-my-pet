import * as THREE from 'three';

export const SCENE = Object.freeze({
  BACKGROUND_COLOR: 0x87ceeb,
})

export const CAMERA = Object.freeze({
  FOV: 30,
  NEAR: 0.1,
  FAR: 1000,
  DEFAULT_POSITION: new THREE.Vector3(-120, 20, 30),
  DEFAULT_TARGET: new THREE.Vector3(-5, 20, -3),
})

export const RENDERER = Object.freeze({
  ANTIALIAS: true,
  SHADOW_MAP_ENABLED: true,
  DEFAULT_WIDTH: 800,
  DEFAULT_HEIGHT: 600,
})

export const CONTROLS = Object.freeze({
  ENABLE_DAMPING: true,
  DAMPING_FACTOR: 0.05,
})

export const LIGHT = Object.freeze({
  COLOR: 0xffffff,
  CAST_SHADOW: true,
  AMBIENT_INTENSITY: 0.6,
  DIRECTIONAL_INTENSITY: 0.8,
  DIRECTIONAL_POSITION: new THREE.Vector3(10, 10, 5),
})

export const ROOM = Object.freeze({
  POSITION: new THREE.Vector3(0, 0, 0),
  ROTATION: new THREE.Euler(0, 0, 0),
  SCALE: new THREE.Vector3(20, 20, 20),
})

export const ANIMAL = Object.freeze({
  POSITION: new THREE.Vector3(0, 2, 0),
  ROTATION: new THREE.Euler(-1.6, 0, -2),
  SCALE: new THREE.Vector3(20, 20, 20),
})

export const FAN = Object.freeze({
  POSITION: new THREE.Vector3(15, 13, 15),
  ROTATION: new THREE.Euler(0, -0.5, 0),
  SCALE: new THREE.Vector3(4, 4, 4),
})
