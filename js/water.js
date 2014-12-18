(function() {
var canvasWidth = 768;
var canvasHeight = 1024;
var textureWidth = 255;
var textureheight = 340;
var xScale = canvasHeight/textureheight;
var yScale = canvasWidth/textureWidth;

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

    var waterModel = new WaterModel(textureWidth, textureheight, {
      resolution:3.0,
      interpolate:false,
      damping:0.985,
      clipping:5,
      evolveThreshold:0.05,
      maxFps:30,
      showStats:false
    });

    var waterCanvas = new WaterCanvas(textureWidth, textureheight,
      "waterHolder", waterModel, {
        backgroundImageUrl:"images/water-255-340.png",
        lightRefraction:9.0,
        lightReflection:0.1,
        maxFps:20,
        showStats:false
    });

    enableMouseInteraction(waterModel, "waterHolder", xScale, yScale);
  }
})()