import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CAMERA, CONTROLS, LIGHT, RENDERER, ROOM, SCENE, ANIMAL, FAN } from './config.js';
import { createAnimals, createFan, createRoom } from './objects/factory.js';

export default class AvaterView extends EventTarget {

    /** @type {HTMLElement} */
    element;

    /** @type {THREE.Scene} */
    scene;

    /** @type {THREE.PerspectiveCamera} */
    camera;

    /** @type {THREE.WebGLRenderer} */
    renderer;

    /** @type {import('./objects/Animals.js').default | null} */
    animals;

    /** @type {import('./objects/Fan.js').default | null} */
    fan;

    /** @type {Array<THREE.AnimationMixer>} */
    mixers;

    /** @type {THREE.Clock} */
    clock;

    /** @type {OrbitControls} */
    controls;

    constructor({
        element,
        fanGlbUrl,
        animalsGlbUrl,
        roomGlbUrl
    } = {
            element: document.body,
            fanGlbUrl: null,
            animalsGlbUrl: null,
            roomGlbUrl: null
        }) {
        super()

        this.animals = null;
        this.fan = null;

        if (!fanGlbUrl) {
            throw new Error('fanGlbUrl is required')
        }
        if (!animalsGlbUrl) {
            throw new Error('animalsGlbUrl is required')
        }
        if (!roomGlbUrl) {
            throw new Error('roomGlbUrl is required')
        }

        this.element = element;
        this.fanGlbUrl = fanGlbUrl;
        this.animalsGlbUrl = animalsGlbUrl;
        this.roomGlbUrl = roomGlbUrl;

        const scene = new THREE.Scene()
        scene.background = new THREE.Color(SCENE.BACKGROUND_COLOR)
        this.scene = scene;

        const cameraAspect = RENDERER.DEFAULT_WIDTH / RENDERER.DEFAULT_HEIGHT;
        const camera = new THREE.PerspectiveCamera(
            CAMERA.FOV,
            cameraAspect,
            CAMERA.NEAR,
            CAMERA.FAR
        )
        this.camera = camera;

        const renderer = new THREE.WebGLRenderer({
            antialias: RENDERER.ANTIALIAS,
            alpha: true
        })
        renderer.setSize(
            RENDERER.DEFAULT_WIDTH, RENDERER.DEFAULT_HEIGHT
        )
        renderer.shadowMap.enabled = RENDERER.SHADOW_MAP_ENABLED;
        this.renderer = renderer;

        // canvasをコンテナに追加
        element.appendChild(renderer.domElement)

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = CONTROLS.ENABLE_DAMPING;
        controls.dampingFactor = CONTROLS.DAMPING_FACTOR;
        this.controls = controls;

        // Add lights
        const ambientLight = new THREE.AmbientLight(LIGHT.COLOR, LIGHT.AMBIENT_INTENSITY)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(LIGHT.COLOR, LIGHT.DIRECTIONAL_INTENSITY)
        directionalLight.position.copy(LIGHT.DIRECTIONAL_POSITION)
        directionalLight.castShadow = LIGHT.CAST_SHADOW;
        scene.add(directionalLight)

        camera.position.copy(CAMERA.DEFAULT_POSITION)
        controls.target.copy(CAMERA.DEFAULT_TARGET)
        controls.update()

        this.mixers = [];
        this.clock = new THREE.Clock()

        this.initObjects()

        this.animate()

        let resizeTimeout;
        const resizeObserver = new ResizeObserver(() => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(() => {
                const width = element.clientWidth || RENDERER.DEFAULT_WIDTH;
                const height = element.clientHeight || RENDERER.DEFAULT_HEIGHT;
                camera.aspect = width / height;
                camera.updateProjectionMatrix()
                renderer.setSize(width, height)
            }, 100)
        })

        // コンテナ要素のサイズ変化を監視
        resizeObserver.observe(element)
    }

    async initObjects() {
        const [
            room,
            fan,
            animals
        ] = await Promise.all([
            createRoom(this.roomGlbUrl),
            createFan(this.fanGlbUrl),
            createAnimals(this.animalsGlbUrl)
        ])

        room.model.position.copy(ROOM.POSITION)
        room.model.rotation.copy(ROOM.ROTATION)
        room.model.scale.copy(ROOM.SCALE)
        this.scene.add(room.model)

        animals.model.position.copy(ANIMAL.POSITION)
        animals.model.rotation.copy(ANIMAL.ROTATION)
        animals.model.scale.copy(ANIMAL.SCALE)
        animals.enableClick(this.camera, this.renderer.domElement)
        animals.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('animal-click', { detail: { target: animals } }))
        })
        this.scene.add(animals.model)
        this.mixers.push(animals.mixer)
        this.animals = animals;
        fan.model.position.copy(FAN.POSITION)
        fan.model.rotation.copy(FAN.ROTATION)
        fan.model.scale.copy(FAN.SCALE)
        this.scene.add(fan.model)
        this.mixers.push(fan.mixer)
        this.fan = fan;
        fan.enableClick(this.camera, this.renderer.domElement)
        fan.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('fan-click', { detail: { target: fan } }))
        })

        this.dispatchEvent(new Event('load'))
    }

    /**
     * @param {Parameters<typeof import('./objects/Animals.js').default.prototype.changeMotion>[0]} motionName
     */
    changeAnimalMotion(motionName) {
        if (!this.animals) {
            console.warn('No animal loaded yet')
            return;
        }
        this.animals.changeMotion(motionName)
    }

    animate() {
        const delta = this.clock.getDelta()

        this.controls.update()

        this.mixers.forEach((mixer) => {
            if (!mixer) return;
            mixer.update(delta)
        })

        this.renderer.render(this.scene, this.camera)

        window.requestAnimationFrame(() => this.animate())
    }
}
