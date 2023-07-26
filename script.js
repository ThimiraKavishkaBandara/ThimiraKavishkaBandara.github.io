// Global variables
let currentScene = 0;
let countriesData; // Holds the loaded dataset

// Load the CSV file and start the visualization
d3.csv("cleaned_world_pop.csv").then(data => {
  countriesData = data.map(d => ({
    country: d.["Country/Territory"],
    year: +d.Year,
    population: +d.Population
  }));

  renderScene(currentScene);
});

function renderScene(sceneIndex) {
  // Remove existing chart elements
  d3.select("#chart-container").html("");

  // Determine which scene to render based on the sceneIndex
  if (sceneIndex === 0) {
    renderScene1();
  } else if (sceneIndex === 1) {
    renderScene2();
  } else if (sceneIndex === 2) {
    renderScene3();
  }
}

function renderScene1() {
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
  
    const svg = d3.select("#chart-container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Parse the data
    const parseDate = d3.timeParse("%Y");
    const data = [
      { year: "1970", population: 822534450 },
      { year: "1980", population: 982372466 },
      { year: "1990", population: 1153704252 },
      { year: "2000", population: 1264099069 },
      { year: "2010", population: 1348191368 },
      { year: "2015", population: 1393715448 },
      { year: "2020", population: 1424929781 },
      { year: "2022", population: 1425887337 }
    ];
  
    // Format the data
    const formatDate = d3.timeFormat("%Y");
    data.forEach(d => {
      d.year = parseDate(d.year);
    });
  
    // Define the scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.year))
      .range([0, width]);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.population)])
      .range([height, 0]);
  
    // Define the line
    const line = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.population));
  
    // Add the line path
    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);
  
    // Add the X-axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));
  
    // Add the Y-axis
    svg.append("g")
      .call(d3.axisLeft(yScale));
  
    // Add X-axis label
    svg.append("text")
      .attr("transform", `translate(${width / 2},${height + 30})`)
      .style("text-anchor", "middle")
      .text("Year");
  
    // Add Y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Population");
  }
  



