// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Create the Wrapper
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

// Import Data - Do error log per Learning Assistant recommendation
d3.csv("data.csv").then(function(healtData) {
    if (err) throw err;
    console.log(healthData)

      // Step 1: Parse Data/Cast as numbers
        healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
      });

      // Step 2: Create scale functions
      var xLinearScale = d3.scaleLinear().range([0, width]);
      var yLinearScale = d3.scaleLinear().range([height, 0]);
  
      
      // Step 3: Create axis functions - Assistance of Learning Assistant
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);

      var xMin;
      var xMax;
      var yMin;
      var yMax;
  
      xMin = d3.min(healthData, function(data) {
      return data.healthcare;
      });
  
      xMax = d3.max(healthData, function(data) {
      return data.healthcare;
      });
  
      yMin = d3.min(healthData, function(data) {
      return data.poverty;
      });
  
      yMax = d3.max(healthData, function(data) {
      return data.poverty;
      });
  
      xLinearScale.domain([xMin, xMax]);
      yLinearScale.domain([yMin, yMax]);
      console.log(xMin);
      console.log(yMax);


      // Step 4: Append Axes to the chart
         chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

      chartGroup.append("g")
        .call(leftAxis);

      // Step 5: Create Circles
      var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.healthcare +1.5))
        .attr("cy", d => yLinearScale(d.poverty +0.2))
        .attr("r", "12")
        .attr("fill", "blue")
        .attr("opacity", ".5")

        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });

       // Step 6: Initialize Tool Tip
       var toolTip = d3.tip()
       .attr("class", "tooltip")
       .offset([80, -60])
       .html(function(d) {
         return (abbr + '%');
       });
 
       // Step 7: Create tooltip in the chart
       chartGroup.call(toolTip);

       // Step 8: Create event listeners to display and hide the tooltip
       circlesGroup.on("click", function(data) {
        toolTip.show(data, this);
      })
        // onmouseout event
        .on("mouseout", function(data, index) {
          toolTip.hide(data);
        });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("No Healthcare");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
  });


     
      
