import createObjectContextMenu from "./ContextMenu.js";
import { getNumberOfPickedMeshes } from "../ActionsBar/ActionsBar.js";
// import { scene } from "../../index.js";

export default function createComponent(mesh, meshIcon, scene) {
  const objectCompoenetContainer = document.createElement("div");
  objectCompoenetContainer.className = "objectInTheScene";
  objectCompoenetContainer.id = mesh.id;

  const MeshObject = {
    HtmlElement: objectCompoenetContainer,
    mesh: mesh,
    isSelected: false,
  };

  //   ListOfMeshes[mesh.id] = MeshObject;
  //   console.log(ListOfMeshes);

  // Object Icon and Name
  const objIcon = document.createElement("p");
  objIcon.className = `objIcon ${meshIcon}`;
  const objName = document.createElement("p");
  objName.innerText = mesh.name;
  objName.className = "objName";
  objectCompoenetContainer.appendChild(objIcon);
  objectCompoenetContainer.appendChild(objName);

  // Toggle mesh Visivility
  const hideShowBtn = document.createElement("button");
  hideShowBtn.className = "hideShow show";
  hideShowBtn.title = "hide";
  hideShowBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (mesh.isEnabled()) {
      e.target.className = "hideShow hide";
      hideShowBtn.title = "show";
      mesh.setEnabled(false);
    } else {
      e.target.className = "hideShow show";
      hideShowBtn.title = "hide";
      mesh.setEnabled(true);
    }
  });
  objectCompoenetContainer.appendChild(hideShowBtn);

  // Select Mesh - Ctrl click on component for multiple select
  objectCompoenetContainer.addEventListener("click", (event) => {
    // When user unselect a mesh
    if (mesh.showBoundingBox) {
      // Bounding Box and visibility
      mesh.showBoundingBox = false;
      if (event.ctrlKey == false) {
        scene.meshes.forEach((mesh) => {
          mesh.visibility = 1;
        });
      }

      // Highlights 3D Object
      //   ListOfMeshes[mesh.id].isSelected = false;
      // ListOfMeshes.forEach();
      // jQuery.each(ListOfMeshes, function (index, value) {
      //   console.log(value);
      // });
    }

    // When user select a mesh
    else {
      if (event.ctrlKey == false) {
        scene.meshes.forEach((mesh) => {
          mesh.showBoundingBox = false;
          mesh.visibility = 0.5;
        });
      }
      mesh.showBoundingBox = true;
      mesh.visibility = 1;
      //   ListOfMeshes[mesh.id].isSelected = true;
    }
    scene.meshes.forEach((mesh) => {
      // If no mesh is selected
      if (mesh.showBoundingBox === false && getNumberOfPickedMeshes() == 0) {
        mesh.visibility = 1;
      }
      // If at least one mesh is already selected
      else if (
        mesh.showBoundingBox === false &&
        getNumberOfPickedMeshes() > 0
      ) {
        mesh.visibility = 0.5;
      }
    });

    // object componenet highlight
    // console.log(Object.keys(ListOfMeshes).length);
  });

  // ---------------- Right Click Event - Object Context Menu ------------------
  createObjectContextMenu(mesh, objectCompoenetContainer, scene);

  return objectCompoenetContainer;
}
