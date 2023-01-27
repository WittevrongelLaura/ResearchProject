

<script setup lang="ts">
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
  import specifications from '../../assets/specifications.json'
import { ref } from '@vue/reactivity'


  var body, windows, wheels, headlights, taillights, indicators, sidemirrors, licenseplate, exhaust
  /**
   * Base
   */

  // let body = import.meta.env.BODY
  console.log('body', import.meta.env.ASTRO_BODY)

  // Canvas
//   const canvas = document.querySelector('.car')
const car = ref<HTMLCanvasElement | null>(null)
  // Scene
  const scene = new Scene()

  //Raycast
  const raycaster = new Raycaster()
  const pointer = new Vector2()

  /**
   * Models
   */
  const dracoloader = new DRACOLoader()
  dracoloader.setDecoderPath('./draco/')

  const gltfLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(dracoloader)

  gltfLoader.load('./models/garage/scene.gltf', (gltf) => {
    gltf.scene.scale.set(5, 5, 5)
    gltf.scene.position.set(8.5, 0.75, 2)
    scene.add(gltf.scene)
  })
  gltfLoader.load('./models/car/body/body.gltf', (gltf) => {
    gltf.scene.scale.set(5, 5, 5)
    gltf.scene.position.set(0, 4, 0)
    scene.add(gltf.scene)
  })
  gltfLoader.load('./models/car/exhaust/exhaust.gltf', (gltf) => {
    gltf.scene.scale.set(5, 5, 5)
    gltf.scene.position.set(0, 4, 0)
    scene.add(gltf.scene)
  })
  gltfLoader.load('./models/car/headlights/headlights.gltf', (gltf) => {
    gltf.scene.scale.set(5, 5, 5)
    gltf.scene.position.set(0, 4, 0)
    scene.add(gltf.scene)
  })
  gltfLoader.load('./models/car/licenseplate/licenseplate_F.gltf', (gltf) => {
    gltf.scene.scale.set(5, 5, 5)
    gltf.scene.position.set(0, 4, 0)
    scene.add(gltf.scene)
  })
  gltfLoader.load('./models/car/licenseplate/licenseplate_B.gltf', (gltf) => {
    gltf.scene.scale.set(5, 5, 5)
    gltf.scene.position.set(0, 4, 0)
    scene.add(gltf.scene)
  })
  gltfLoader.load('./models/car/sidemirrors/sidemirrors.gltf', (gltf) => {
    gltf.scene.scale.set(5, 5, 5)
    gltf.scene.position.set(0, 4, 0)
    scene.add(gltf.scene)
  })
  gltfLoader.load('./models/car/taillights/taillights.gltf', (gltf) => {
    gltf.scene.scale.set(5, 5, 5)
    gltf.scene.position.set(0, 4, 0)
    scene.add(gltf.scene)
  })
  gltfLoader.load('./models/car/wheels/wheels.gltf', (gltf) => {
    gltf.scene.scale.set(5, 5, 5)
    gltf.scene.position.set(0, 4, 0)
    scene.add(gltf.scene)
  })
  // gltfLoader.load('./models/podium/podium.gltf', (gltf) => {
  //   gltf.scene.scale.set(5, 5, 5)
  //   scene.add(gltf.scene)
  // })
  // gltfLoader.position.set(0, 0, 0)

  /**
   * Lights
   */
  const ambientLight = new AmbientLight('#FFFEFC', 0.1)
  scene.add(ambientLight)

  const directionalLight = new DirectionalLight('#ffffff', 1)
  directionalLight.position.set(-0.5, 1, 2.25)
  scene.add(directionalLight)

  const directionalLightB = new DirectionalLight('#ffffff', 1)
  directionalLightB.position.set(0.5, 1, -2.25)
  scene.add(directionalLightB)

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

  /**
   * Camera
   */
  // Base camera
  const camera = new PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000,
  )
  camera.position.set(12, 16, -16)
  camera.rotation.set(0.31, 0.85, -0.23)
  scene.add(camera)

  
  /**
   * Renderer
   */

  const renderer = new WebGLRenderer({ canvas: car.value as unknown as HTMLCanvasElement, alpha: true })
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  renderer.domElement.addEventListener('click', onclick, false)


// Controls
  const controls = new OrbitControls(camera, car, renderer.domElement)
  controls.target.set(0, 0, 0)
  // controls.rotateSpeed = 2
  controls.enableDamping = true
  controls.enableZoom = true
  // controls.autoRotate = true

  function onclick(event) {
    event.preventDefault()

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(pointer, camera)
 
    const intersects = raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0) {
      if (intersects[0].object.material.name === 'Body') {
        console.log('BODY')
        const bodyarr = [
          ['Brand', specifications.body.brand],
          ['Model', specifications.body.model],
          ['Year', specifications.body.year],
        ]
        console.table(bodyarr)
        body = true
      } else if (intersects[0].object.material.name === 'Windows') {
        console.log('WINDOWS')
        const windowsarr = [
          ['Brand', specifications.windows.brand],
          ['Type', specifications.windows.type],
        ]
        console.table(windowsarr)
        windows = true
      } else if (intersects[0].object.material.name === 'Sidemirrors') {
        console.log('SIDEMIRRORS')
        const sidemirrorsarr = [
          ['Brand', specifications.sidemirrors.brand],
          ['Type', specifications.sidemirrors.type],
        ]
        console.table(sidemirrorsarr)
        sidemirrors = true
      } else if (intersects[0].object.material.name === 'Headlights') {
        console.log('HEADLIGHTS')
        const headlightsarr = [
          ['Brand', specifications.headlights.brand],
          ['Type', specifications.headlights.type],
        ]
        console.table(headlightsarr)
        headlights = true
      } else if (intersects[0].object.material.name === 'Taillights') {
        console.log('TAILLIGHTS')
        const taillightsarr = [
          ['Brand', specifications.taillights.brand],
          ['Type', specifications.taillights.type],
        ]
        console.table(taillightsarr)
         taillights = true
      } else if (intersects[0].object.material.name === 'Indicator') {
        console.log('INDICATORS')
        const indicatorsarr = [
          ['Brand', specifications.indicators.brand],
          ['Type', specifications.indicators.type],
        ]
        console.table(indicatorsarr)
         indicators = true
      } else if (
        intersects[0].object.material.name === 'Licenseplate' ||
        intersects[0].object.material.name === 'Licenseplate.001'
      ) {
        console.log('LICENSEPLATE')
        licenseplate = true
      } else if (intersects[0].object.material.name === 'Wheelhouse_B') {
        console.log('WHEEL')
        const tiresarr = [
          ['Brand', specifications.wheels.tires.brand],
          ['Model', specifications.wheels.tires.model],
          ['Size', specifications.wheels.tires.size],
        ]
        const rimsarr = [
          ['Brand', specifications.wheels.rims.brand],
          ['Model', specifications.wheels.rims.model],
          ['Size', specifications.wheels.rims.size],
        ]
        console.table(tiresarr)
        console.table(rimsarr)
        wheels = true
      } else if (
        intersects[0].object.material.name === 'Sidemirror_L' ||
        intersects[0].object.material.name === 'Sidemirror_R'
      ) {
        console.log('SIDEMIRROR')
        const sidemirrorsarr = [
          ['Brand', specifications.sidemirrors.brand],
          ['Type', specifications.sidemirrors.type],
        ]
        console.table(sidemirrorsarr)
        sidemirrors = true
      } else if (intersects[1].object.material.name === 'Exhaust') {
        console.log('EXHAUST')
        const exhaustarr = [
          ['Brand', specifications.exhaust.brand],
          ['Model', specifications.exhaust.model],
        ]
        console.table(exhaustarr)
         exhaust = true
      }
    }
  }

  const Animate = () => {
    controls.update() //raycaster
    raycaster.setFromCamera(pointer, camera)

    renderer.render(scene, camera)

    // Call Animate again on the next frame
    window.requestAnimationFrame(Animate)
  }

  Animate()

   // export { car, body, windows, sidemirrors, headlights, taillights, indicators, licenseplate, wheels, exhaust}

</script>

<template>
   <canvas class="car absolute z-40 w-screen h-screen" ref="car"></canvas> 

</template>