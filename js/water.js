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
    var raindrop  = create2DArray(createRadialCanvas(4,4));

    window.pixel = pixel;
    window.finger = finger;

    var waterModel = new WaterModel(textureWidth, textureheight, {
      resolution:4.0,
      interpolate:true,
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

    var rainMaker = new RainMaker(textureWidth, textureheight, waterModel, raindrop, xScale, yScale);
    rainMaker.start(0.75);

    stopButton = window.document.getElementById("stopButton");
    stopButton.addEventListener('click', function(){
      rainMaker.stop();
      waterModel.evolving = false;
      waterModel.touchWater = function(){};
      waterCanvas.drawNextFrame= function(){};
      waterCanvas.canvas.parentNode.removeChild(waterCanvas.canvas);
      this.parentNode.removeChild(this);
    });
  }
})()