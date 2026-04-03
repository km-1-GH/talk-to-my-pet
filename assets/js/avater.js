import AvaterView from './avaterView/index.js'

const container = document.getElementById('avater')

export const view = new AvaterView({
    element: container,
    roomGlbUrl: './assets/glb/room.glb',
    fanGlbUrl: './assets/glb/fan.glb',
    animalsGlbUrl: './assets/glb/animals.glb',
})

view.addEventListener('load', () => {
    view.changeAnimalMotion('idle')
})
