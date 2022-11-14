import { scene } from "../../../index.js";
import { frameCamera } from "../Scene/BabylonScene.js";
import createComponent from "../ObjectComponent/ObjectComponent.js";
import "./ModalCostumizedShape.js";
import { openModal } from "./ModalCostumizedShape.js";
import { chooseMaterial } from "../ObjectComponent/ContextMenu.js";

// var ListOfMeshes = {};

// Upload STL File ------------------------------------//
export function loadMesh(fileName, url, extension, s) {
  BABYLON.Scene;
  BABYLON.SceneLoader.ImportMesh(
    "",
    "",
    url,
    scene,
    function (newMeshes) {
      const mesh = newMeshes[0];
      mesh.name = fileName;
      mesh.id = fileName;
      mesh.scaling = new BABYLON.Vector3(s, s, s);
      mesh.rotation = new BABYLON.Vector3(0, 0, 0);
      mesh.position = new BABYLON.Vector3(0, 0, 0);
      mesh.material = new BABYLON.NormalMaterial("stlMaterial", scene);
      $(".empty-scene").remove();

      mesh.material = new BABYLON.NormalMaterial(fileName, scene);
      if (getNumberOfPickedMeshes() > 0) {
        mesh.visibility = 0.5;
      }
      const objectCompoenetContainer = createComponent(mesh, "meshIcon", scene);
      $(".sidebar-elements").append(objectCompoenetContainer);
      frameCamera(1.5, mesh);

      actions.push({
        mesh: [url, mesh],
        meshId: fileName,
        action: "add",
        objectCompoenetContainer: objectCompoenetContainer,
        type: "mesh",
      });

      console.log(actions);
    },
    null,
    null,
    extension
  );
}
export function importSTLFile() {
  let input = document.createElement("input");
  input.type = "file";
  input.accept = ".stl";
  input.multiple = true;

  input.onchange = (_) => {
    let file = input.files[0];
    let fileName = file.name.split(".")[0];

    // let numberUploadedFiles = input.files.length;

    const ext = "." + file.name.split(".").pop().toLowerCase(); //ext|exts

    if (ext !== ".stl") {
      alert(ext + " file format is not supported! Please enter an STL File");
      return 0;
    } else {
      //   alert("you uploaded " + numberUploadedFiles + " files");
    }

    const url = URL.createObjectURL(file);
    loadMesh(fileName, url, ext, 1);
  };
  input.click();
}

// Create Shapes : Sphere, Cube, Cylinder --------------//
export function createShape(meshType, buttonsClicks, cubeObj) {
  let mesh;
  let objectCompoenetContainer;
  switch (meshType) {
    case "sphere":
      mesh = BABYLON.MeshBuilder.CreateSphere(
        meshType + buttonsClicks,
        {},
        scene
      );

      mesh.material = new BABYLON.NormalMaterial(meshType, scene);

      sphereButtonClicks += 1;
      objectCompoenetContainer = createComponent(mesh, "sphereIcon", scene);

      break;
    case "cube":
      mesh = BABYLON.MeshBuilder.CreateBox(cubeObj.name, {}, scene);
      mesh.position.x = cubeObj.xmin;
      mesh.position.y = cubeObj.ymin;
      mesh.position.z = cubeObj.zmin;
      mesh.scaling.x = cubeObj.xmax - cubeObj.xmin;
      mesh.scaling.y = cubeObj.ymax - cubeObj.ymin;
      mesh.scaling.z = cubeObj.zmax - cubeObj.zmin;
      mesh.material = chooseMaterial(cubeObj.material, scene);
      console.log(mesh);

      frameCamera(1.5, mesh);

      cubeButtonClicks += 1;
      objectCompoenetContainer = createComponent(mesh, "cubeIcon", scene);
      break;

    case "cylinder":
      mesh = BABYLON.MeshBuilder.CreateCylinder(
        meshType + buttonsClicks,
        {},
        scene
      );
      cylinderButtonClicks += 1;
      mesh.material = new BABYLON.NormalMaterial(meshType, scene);
      objectCompoenetContainer = createComponent(mesh, "cylinderIcon", scene);
      break;
    default:
      console.log("default");
  }
  $(".sidebar-elements").append(objectCompoenetContainer);

  actions.push({
    mesh: mesh,
    meshId: buttonsClicks,
    action: "add",
    objectCompoenetContainer: objectCompoenetContainer,
    type: meshType,
  });

  console.log(actions);

  buttonsClicks = buttonsClicks + 1;
  if (getNumberOfPickedMeshes() > 0) {
    mesh.visibility = 0.5;
  }
  return mesh;
}

// function showSpehreModal() {
//   alert("sphere modal");
// }

const addCube = (e) => {
  openModal(e).then(
    (resolve) => {
      $(".empty-scene").remove();
      let cubeObj = resolve;
      createShape("cube", cubeButtonClicks, cubeObj);
    },
    (reject) => {
      console.log(reject);
    }
  );
};

var addSphereBtn = document.querySelector("#sphere-button");
// addSphereBtn.addEventListener("click", addSphere);

var addCubeBtn = document.querySelector("#cube-button");
addCubeBtn.addEventListener("click", addCube);

$(document).ready(function () {
  // $("#sphere-button").click(function () {
  //   // showSpehreModal();
  //   createShape("sphere", sphereButtonClicks);
  // });

  // $("#cube-button").click(function () {
  //   $(".empty-scene").remove();
  //   createShape("cube", cubeButtonClicks);
  // });

  // $("#cylinder-button").click(function () {
  //   $(".empty-scene").remove();
  //   createShape("cylinder", cylinderButtonClicks);
  // });

  $(".upload-button").click(function () {
    importSTLFile();
  });
});

export function getNumberOfPickedMeshes() {
  var numberOfPickedMeshes = 0;
  scene.meshes.forEach((mesh) => {
    if (mesh.showBoundingBox) {
      numberOfPickedMeshes += 1;
    }
  });
  return numberOfPickedMeshes;
}
