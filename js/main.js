// iPad-ish dimensions.
var width = 768,
  height = 1024;

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json("uk.json", function(error, uk) {
  if (error) return console.error(error);

  var subunits = topojson.feature(uk, uk.objects.subunits);

  var projection = d3.geo.albers()
      .center([0, 55.4])
      .rotate([4.4, 0])
      .parallels([50, 60])
      .scale(5000)
      .translate([width / 2, height / 2]);

  var path = d3.geo.path()
      .projection(projection);

  // Draw the individual countries as features.
  svg.selectAll(".subunit")
      .data(topojson.feature(uk, uk.objects.subunits).features)
    .enter().append("path")
      .attr("class", function(d) {
        console.log(uk);
        return "subunit " + d.id;
      })
      .attr("d", path);

  // Interior boundaries and not boundaries with Ireland.
  svg.append("path")
      .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a !== b && a.id !== "IRL"; }))
      .attr("d", path)
      .attr("class", "subunit-boundary");

  // Exterior boundary of Ireland.
  svg.append("path")
      .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a === b && a.id === "IRL"; }))
      .attr("d", path)
      .attr("class", "subunit-boundary IRL");
});
