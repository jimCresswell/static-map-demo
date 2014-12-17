// iPad-ish dimensions.
var width = 768,
  height = 1015;

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

  // Places.
  path.pointRadius(5);
  svg.append("path")
      .datum(topojson.feature(uk, uk.objects.places))
      .attr("d", path)
      .attr("class", "place");

  // Place names at location of places.
  svg.selectAll(".place-label")
      .data(topojson.feature(uk, uk.objects.places).features)
    .enter().append("text")
      .attr("class", "place-label")
      .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
      .text(function(d) { return d.properties.name || d.properties.NAME; });

  // Tweak position place names.
  svg.selectAll(".place-label")
      .attr("x", function(d) {
        return labelOnRight(d) ? 6 : -6;
      })
      .attr("dy", "-.3em")
      .style("text-anchor", function(d) {
        return labelOnRight(d) ? "start" : "end";
      });

  // Label the countries.
  svg.selectAll(".subunit-label")
      .data(topojson.feature(uk, uk.objects.subunits).features)
    .enter().append("text")
      .attr("class", function(d) { return "subunit-label " + d.id; })
      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) {
        return d.properties.name || d.properties.NAME;
      });
});

function labelOnRight(d) {
  var triggerLong = -1.5;
  var name = d.properties.name || d.properties.NAME;
  if (["Oxford", "Portsmouth"].indexOf(name) !== -1) {
    return false;
  }
  if (["Belfast", "Edinburgh", "Dundee", "Manchester"].indexOf(name) !== -1) {
    return true;
  }
  return d.geometry.coordinates[0] > triggerLong;
}
