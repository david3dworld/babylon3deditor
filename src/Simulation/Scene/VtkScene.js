export function createVtkScene() {
  var fullScreenRenderer =
    vtk.Rendering.Misc.vtkFullScreenRenderWindow.newInstance();
  var actor = vtk.Rendering.Core.vtkActor.newInstance();
  var mapper = vtk.Rendering.Core.vtkMapper.newInstance();
  var cone = vtk.Filters.Sources.vtkConeSource.newInstance();

  actor.setMapper(mapper);
  mapper.setInputConnection(cone.getOutputPort());

  var renderer = fullScreenRenderer.getRenderer();
  renderer.addActor(actor);
  renderer.resetCamera();

  var renderWindow = fullScreenRenderer.getRenderWindow();
  renderWindow.render();

  const canvasVtk = document.querySelectorAll("canvas")[2];

  canvasVtk.className = "vtk-canvas";

  const divCanvas = canvasVtk.parentElement;

  divCanvas.style.position = "relative";
  divCanvas.style.width = "100%";
  divCanvas.style.height = "100%";

  $("#simulation").append($(divCanvas).detach());
}
