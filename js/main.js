var width = 960,
  height = 1160;

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json("uk.json", function(error, uk) {
  if (error) return console.error(error);

  var subunits = topojson.feature(uk, uk.objects.subunits);

  var projection = d3.geo.mercator()
      .scale(500)
      .translate([width / 2, height / 2]);

  var path = d3.geo.path()
      .projection(projection);


  svg.append("path")
      .datum(subunits)
      .attr("d", path);
});