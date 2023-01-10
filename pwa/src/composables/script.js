import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Vector2,
  Raycaster,
  AmbientLight,
  PCFSoftShadowMap,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new Scene()

//Raycast
const raycaster = new Raycaster()
const pointer = new Vector2()

// const onPointerMove = (e)=> {
//   //calculate mouse position in normalized device coordinates
//   // (-1 to +1) for both components
//   pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
//   pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

//   //update the picking ray with the camera and mouse position
//   const intersects = raycaster.intersectObjects(scene.children);

//   for (let i = 0; i < intersects.length; i++) {
//       console.log(intersects[i]);
//       intersects[i].object.material.color.set(0x0000ff);
//   }
// }

/**
 * Models
 */
const dracoloader = new DRACOLoader()
dracoloader.setDecoderPath('./draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoloader)

gltfLoader.load('./models/nissan_skyline_r32_gt-r/scene.gltf', (gltf) => {
  gltf.scene.scale.set(3, 3, 3)
  scene.add(gltf.scene)
})

/**
 * Lights
 */
const ambientLight = new AmbientLight(0xffffff)
scene.add(ambientLight)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// window.addEventListener('resize', () => {
//   // Update sizes
//   sizes.width = window.innerWidth;
//   sizes.height = window.innerHeight;

//   // Update camera
//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();

//   // Update renderer
//   renderer.setSize(sizes.width, sizes.height);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

/**
 * Camera
 */
// Base camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(1.75, 8, 40)
camera.rotation.set(0.31, 0.85, -0.23)
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0, 0)
controls.rotateSpeed = 2
controls.enableDamping = true
controls.enableZoom = true
controls.autoRotate = true

// Controls

/**
 * Renderer
 */

const renderer = new WebGLRenderer({ canvas: canvas, alpha: true })
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const Animate = () => {
  controls.update() //raycaster
  raycaster.setFromCamera(pointer, camera)

  renderer.render(scene, camera)

  // Call Animate again on the next frame
  window.requestAnimationFrame(Animate)
}

// window.addEventListener('pointermove', (e) => {onPointerMove(e)});
Animate()
