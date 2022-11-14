import { createShape, loadMesh } from "../ActionsBar/ActionsBar.js";
import { scene } from "../../../index.js";

export function decrementCounter(meshType) {
  switch (meshType) {
    case "sphere":
      sphereButtonClicks--;
      break;
    case "cube":
      cubeButtonClicks--;
      break;

    case "cylinder":
      cubeButtonClicks--;
      break;
  }
}

$(document).ready(function () {
  // CTRL Z
  document.addEventListener("keydown", (e) => {
    if (e.key === "z" && e.ctrlKey) {
      // if List of actions is empty
      if (!actions.length) {
        return;
      }

      let actionObj = actions[actions.length - 1];
      switch (actionObj.action) {
        case "add":
          $("#" + actionObj.objectCompoenetContainer.id).remove();
          if (actionObj.type === "mesh") {
            actionObj.mesh[1].dispose();
          } else {
            actionObj.mesh.dispose();
            decrementCounter(actionObj.type);
          }
          actions.splice(actions.length - 1, 1);
          break;
        case "delete":
          actions.splice(actions.length - 1, 1);
          if (actionObj.type === "mesh") {
            loadMesh(actionObj.meshId, actionObj.mesh[0], "stl", 1);
          } else {
            const meshType = actionObj.type;
            const meshId = actionObj.meshId;
            createShape(meshType, meshId);
          }
          break;
        default:
          console.log("default");
          break;
      }
      console.log(actions);

      // Reset Counter
      if (!actions.length) {
        if (scene.meshes == 0) {
          const emptyScene = document.createElement("p");
          emptyScene.className = "empty-scene";
          emptyScene.innerText = "Empty Scene";
          $(".sidebar-elements").append(emptyScene);
        }
        sphereButtonClicks = 0;
        cubeButtonClicks = 0;
        cylinderButtonClicks = 0;
        return;
      }
    }
  });
});
