// Global variables
let currentScene = 0;
let countriesData; // Holds the loaded dataset

// Load the CSV file and start the visualization
d3.csv("cleaned_world_pop_2.csv").then(data => {
  console.log('data ===', data)
  countriesData = data.map(d => ({
    country: d["Country/Territory"],
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
    renderIntroScene();
  } else if (sceneIndex === 1) {
    renderPopulationLineChart();
  }
}

function renderIntroScene() {
  // Remove existing chart elements
  d3.select("#chart-container").html("");

  // Create a new div element to contain the introductory message
  const introDiv = d3.select("#message")
    .append("div")
    .attr("id", "intro-div")
    .style("background-color", "#f0f0f0")
    .style("padding", "20px")
    .style("margin-bottom", "20px");

  // Add the introductory message to the div
  introDiv.append("h2")
    .text("Exploring Population of Leading Polluters");

  introDiv.append("p")
    .text(`China, the United States, and India emerge as significant contributors to global pollution across multiple sectors, 
      reflecting the magnitude of their industrial activities and population sizes. Drawing insights from Garret Hardin's Tragedy of the Commons,
      it becomes evident that population increase plays a pivotal role in exacerbating pollution levels. As these nations experience rapid population growth,
      the strain on finite resources intensifies, leading to overexploitation and degradation of the environment.
      The tragedy of the commons highlights how individual actors, in their pursuit of self-interest, tend to deplete shared resources,
      ultimately leading to collective harm. In the context of China, the United States, and India,
      the sheer size of their populations magnifies the pressure on energy production, transportation, agriculture, and manufacturing,
      thereby intensifying pollution levels. Addressing this global challenge requires collaborative efforts, sustainable policies, and innovative technologies to mitigate the adverse impacts of human activities on the environment and preserve the planet for future generations.
      Furthermore, a comprehensive dashboard has been developed to provide a deeper look into the population habits of these three countries
      from 1970 to 2022. This interactive dashboard will allow users to explore the physical population growth within each country,
      gaining valuable insights into the dynamics of their population changes over time.`);
}


function renderPopulationLineChart() {
  // Your code for rendering the population line chart goes here

  // Filter the data for the selected country
  const selectedCountry = document.getElementById("country-select").value;
  console.log('selectedCountry ===', selectedCountry)
  const dataForCountry = selectedCountry ? countriesData.filter(d => d.country === selectedCountry) : countriesData;

  const margin = { top: 20, right: 30, bottom: 30, left: 60 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Define the scales
  const xScale = d3.scaleTime()
    .domain(d3.extent(dataForCountry, d => d.year))
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataForCountry, d => d.population)])
    .range([height, 0]);

  // Define the line
  const line = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.population));

  // Add the line path
  svg.append("path")
    .datum(dataForCountry)
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
    .attr("dy", "5em")
    .style("text-anchor", "middle")
    .text("Population");
}

// Add event listener for the country dropdown
const countrySelect = document.getElementById("country-select");
countrySelect.addEventListener("change", function () {
  // Get the selected country value
  const selectedCountry = this.value;
  console.log('countrySelect ===', this.value)
  // Call a function to update the page or redirect to the next scene
  goToNextScene(selectedCountry);
  // add more text
  document.getElementById('populate_info').innerHTML = '';
  const populateInfoDiv = d3.select("#populate_info")
    .append("div")
    .attr("id", "populate_info_div")
    .style("background-color", "#f0f0f0")
    .style("padding", "20px")
    .style("margin-bottom", "20px");

    populateInfoDiv.append("p")
    .text(`selected Country  ${this.value}`);
});

// Function to handle navigation to the next scene based on the selected country
function goToNextScene(selectedCountry) {
  // Perform actions based on the selected country
  // For example, update the chart based on the selected country

  // Assuming you have different renderScene functions for each country
  if (selectedCountry === "China" || selectedCountry === "India" || selectedCountry === "United States") {
    currentScene = 1; // Move to the next scene with the population line chart
    renderScene(currentScene);
  } else {
    // Default behavior for other countries or the "All Countries" option
    // Add code here if needed
    renderScene(1);
  }
}


