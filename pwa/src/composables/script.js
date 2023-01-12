import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Vector2,
  Raycaster,
  AmbientLight,
  PCFSoftShadowMap,
  DirectionalLight,
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
const ambientLight = new AmbientLight('#FFFEFC', 3)
scene.add(ambientLight)

const directionalLight = new DirectionalLight('#ffffff', 5)
directionalLight.position.set(-0.5, 1, 2.25)
scene.add(directionalLight)

const directionalLightB = new DirectionalLight('#ffffff', 5)
directionalLightB.position.set(0.5, 1, -2.25)
scene.add(directionalLightB)

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

// import * as THREE from 'three';
// import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
// 			import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 			import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 			import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
// 			import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

// let camera, scene, renderer;
// init()
// render()

// function init() {

// const container = document.createElement('div')
// document.body.appendChild(container)

// renderer = new THREE.WebGLRenderer({ antialias: true })
// renderer.setPixelRatio(window.devicePixelRatio)
// renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.toneMapping = THREE.ACESFilmicToneMapping
// renderer.toneMappingExposure = 1
// renderer.outputEncoding = THREE.sRGBEncoding
// container.appendChild(renderer.domElement)

// camera = new THREE.PerspectiveCamera(
//   45,
//   window.innerWidth / window.innerHeight,
//   1,
//   1000,
// )
// camera.position.set(0, 50, 0)

// const environment = new RoomEnvironment()
// const pmremGenerator = new THREE.PMREMGenerator(renderer)

// scene = new THREE.Scene()
// scene.background = new THREE.Color(0xbbbbbb)
// scene.environment = pmremGenerator.fromScene(environment).texture
// environment.dispose()

// // const grid = new THREE.GridHelper(500, 10, 0xffffff, 0xffffff)
// // grid.material.opacity = 0.5
// // grid.material.depthWrite = false
// // grid.material.transparent = true
// // scene.add(grid)

// const ktx2Loader = new KTX2Loader()
//   .setTranscoderPath('jsm/libs/basis/')
//   .detectSupport(renderer)

// const loader = new GLTFLoader()
// loader.setKTX2Loader(ktx2Loader)
// loader.setMeshoptDecoder(MeshoptDecoder)
// loader.load('./models/retro_computer/scene.gltf', function (gltf) {
//   // coffeemat.glb was produced from the source scene using gltfpack:
//   // gltfpack -i coffeemat/scene.gltf -o coffeemat.glb -cc -tc
//   // The resulting model uses EXT_meshopt_compression (for geometry) and KHR_texture_basisu (for texture compression using ETC1S/BasisLZ)

//   gltf.scene.position.y = 2

//   scene.add(gltf.scene)

//   render()
// })

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.addEventListener('change', render) // use if there is no animation loop
// controls.minDistance = 10
// controls.maxDistance = 1000
// controls.target.set(0,0,0)
// controls.enableDamping = true
// controls.enableZoom = true
// controls.update()

// window.addEventListener('resize', onWindowResize)
// }

// function onWindowResize() {

//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.setSize( window.innerWidth, window.innerHeight );

//   render();

// }

// //

// function render() {

//   renderer.render( scene, camera );

// }
