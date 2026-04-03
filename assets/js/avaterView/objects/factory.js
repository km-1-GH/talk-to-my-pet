import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Animals from './Animals.js';
import Fan from './Fan.js';
import Room from './Room.js';

/**
 *
 * @param {string} gltfPath
 * @param {{ new (...args: any[]): T }} ObjectClass
 * @returns {Promise<T>}
 */
async function loadAndCreate (gltfPath, ObjectClass) {
  const loader = new GLTFLoader()
  const gltf = await loader.loadAsync(gltfPath)
  return new ObjectClass(gltf)
}

/**
 *
 * @param {string} gltfPath
 * @returns {Promise<Animals>}
 */
export async function createAnimals (gltfPath) {
  return loadAndCreate(gltfPath, Animals)
}

/**
 *
 * @param {string} gltfPath
 * @returns {Promise<Fan>}
 */
export async function createFan (gltfPath) {
  return loadAndCreate(gltfPath, Fan)
}

/**
 *
 * @param {string} gltfPath
 * @returns {Promise<Room>}
 */
export async function createRoom (gltfPath) {
  return loadAndCreate(gltfPath, Room)
}
