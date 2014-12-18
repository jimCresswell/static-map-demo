(function() {
var width = 255;
var height = 340;

  if (window.itsFinished) {
    init();
  } else {
    window.addEventListener('load', init);
  }


  function init(){
    var pixel     = create2DArray(createRadialCanvas(2,2));
    var finger    = create2DArray(createRadialCanvas(14,14));

    window.pixel = pixel;
    window.finger = finger;

    var waterModel = new WaterModel(width, height, {
      resolution:3.0,
      interpolate:false,
      damping:0.985,
      clipping:5,
      evolveThreshold:0.05,
      maxFps:30,
      showStats:false
    });

    var waterCanvas = new WaterCanvas(width, height,
      "waterHolder", waterModel, {
        backgroundImageUrl:"images/water-255-340.png",
        lightRefraction:9.0,
        lightReflection:0.1,
        maxFps:20,
        showStats:false
    });

    enableMouseInteraction(waterModel, "waterHolder");
  }
})()