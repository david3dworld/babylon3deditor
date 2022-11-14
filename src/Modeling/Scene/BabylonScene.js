import { scene } from "../../../index.js";

const canvas = document.querySelectorAll("canvas")[0];

const engine = new BABYLON.Engine(canvas, true, {});
engine.disablePerformanceMonitorInBackground = true;
engine.disableWebGL2Support = false;
engine.preserveDrawingBuffer = false;
engine.enableOfflineSupport = false;
engine.doNotHandleContextLost = false;
engine.loadingUIBackgroundColor = "#000000e1";
window.addEventListener("resize", function () {
  engine.resize();
});

export function createBabylonScene() {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  scene.autoClear = false;
  scene.autoClearDepthAndStencil = false;
  scene.blockMaterialDirtyMechanism = true;

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    0,
    0,
    10,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.zoomToMouseLocation = true;
  camera.wheelDeltaPercentage = 0.03;

  // Enable mouse wheel inputs.
  // camera.inputs.addMouseWheel();

  camera.setPosition(new BABYLON.Vector3(-1, 0.5, 1)); // initial
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);
  setCamera(camera);

  const ambient = new BABYLON.HemisphericLight(
    "ambient",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  ambient.diffuse = new BABYLON.Color3(0.8, 0.8, 0.8);
  ambient.specular = new BABYLON.Color3(0.7, 0.7, 0.7);
  ambient.groundColor = new BABYLON.Color3(0.6, 0.6, 0.6);
  ambient.intensity = 0.5;

  const light = new BABYLON.DirectionalLight(
    "direct",
    new BABYLON.Vector3(0, -1, 0),
    scene
  );
  setLightPositionByAngle(light, 120, 50, 100);
  light.autoUpdateExtends = true; // to REFRESHRATE_RENDER_ONCE
  light.diffuse = BABYLON.Color3.FromHexString("#ffffbb");
  light.intensity = 1;

  const light2 = new BABYLON.DirectionalLight(
    "direct_noshadow",
    new BABYLON.Vector3(0, -1, 0),
    scene
  );
  setLightPositionByAngle(light2, 310, 50, 100);
  light2.diffuse = BABYLON.Color3.FromHexString("#ffffbb");
  light2.intensity = 1;
  if (scene.meshes == 0) {
    const emptyScene = document.createElement("p");
    emptyScene.className = "empty-scene";
    emptyScene.innerText = "Empty Scene";
    $(".sidebar-elements").append(emptyScene);
  }
  return [scene, engine];
}

export function frameCamera(radius = 1.5, mesh) {
  scene.activeCamera.useFramingBehavior = true;
  scene.activeCamera.framingBehavior.radiusScale = radius;
  // const currentMesh = scene.getMeshByName("currentMesh");
  scene.activeCamera.setTarget(mesh);
  // scene.activeCamera.target = new BABYLON.Vector3(0, 0.01, 0); // workaround: prevent panning-lock in certain conditions
  setCamera(scene.activeCamera); // need to re-apply settings
  scene.activeCamera.useFramingBehavior = true;
}

function setCamera(camera) {
  camera.useFramingBehavior = true;
  camera.framingBehavior.zoomStopsAnimation = true;
  camera.framingBehavior.radiusScale = 1.5;
  camera.framingBehavior.positionScale = 0.5;
  camera.framingBehavior.defaultElevation = 0.3;
  camera.framingBehavior.elevationReturnTime = 1500;
  camera.framingBehavior.elevationReturnWaitTime = 1000;
  camera.framingBehavior.framingTime = 1000;
  camera.lowerRadiusLimit = 5;
  camera.upperRadiusLimit = 500;
  camera.wheelPrecision = 10;
  camera.panningSensibility = 300;
  camera.pinchPrecision = 100;
}

function setLightPositionByAngle(light, angle, distance, height) {
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const z = Math.sin((angle * Math.PI) / 180) * distance;
  light.position = new BABYLON.Vector3(x, height, z);
  light.setDirectionToTarget(BABYLON.Vector3.Zero());
}
