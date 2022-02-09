console.log("Hello world");

d3.csv('data/hamilton.csv')
  .then(data => {
  	console.log('Data loading complete. Work with dataset.');

    // //process the data - this is a forEach function.  You could also do a regular for loop.... 
    // data.forEach(d => { //ARROW function - for each object in the array, pass it as a parameter to this function
    //   	d.cost = +d.cost; // convert string 'cost' to number
    //   	d.daysFromYrStart = computeDays(d.start); //note- I just created this field in each object in the array on the fly

	// 			let tokens = d.start.split("-");
  	// 		d.year = +tokens[0];

  	// });

    //for the line chart:
    //lets compute costs per year for the line chart
  	let minYear = d3.min( data, d => d.Year);
  	let maxYear = d3.max( data, d=> d.Year );
// 1980 to 2021
  	let combinedData = []; //this will be our data for the line chart
  	// CO, NO2, Ozone, SO2, PM2.5, PM10
	// DaysCO,DaysNO2,DaysOzone,DaysSO2,DaysPM2.5,DaysPM10

	// let daysCOData = []
	
	// for(let i = minYear; i < maxYear; i++){

  	// 	let justThisYear = data.filter( d => d.Year == i ); //only include the selected year
  	// 	let medianAQI = d3.sum(justThisYear, d => d.MedianAQI); //sum over the filtered array, for the cost field
  	// 	let percentile90AQI = d3.sum(justThisYear, d => d.Percentile90AQI); //sum over the filtered array, for the cost field
  	// 	let maxAQI = d3.sum(justThisYear, d => d.MaxAQI); //sum over the filtered array, for the cost field
	// 	// let CO = data.filter( d => d.DaysCO > 0)
	// 	let COdata = d3.sum(justThisYear, d => d.DaysCO);
	// 	let NO2data = d3.sum(justThisYear, d => d.DaysNO2);
	// 	let OzoneData = d3.sum(justThisYear, d => d.DaysOzone);
	// 	let SO2Data = d3.sum(justThisYear, d => d.DaysSO2);
	// 	let PM25Data = d3.sum(justThisYear, d => d.DaysPM25);
	// 	let PM10Data = d3.sum(justThisYear, d => d.DaysPM10);
	// 	daysCOData.push({"year": i, "CO":COdata, "CO":COdata, "NO2":NO2data,
	// 	"Ozone":OzoneData, "SO2":SO2Data, "PM25":PM25Data, "PM10":PM10Data})
	// 	medianData.push({"year": i, "value":medianAQI});
  	// 	perData.push({"year": i, "value":maxAQI});
  	// 	maxData.push({"year": i, "value":percentile90AQI});
  	// }
	
	for(let i = minYear; i <= maxYear; i++) {
		let justThisYear = data.filter( d => d.Year == i ); //only include the selected year
		let medianAQI = d3.sum(justThisYear, d => d.MedianAQI); //sum over the filtered array, for the cost field
		combinedData.push({"year": i, "value":medianAQI, "type": "median"}); 
	}

	for(let i = minYear; i <= maxYear; i++) {
		let justThisYear = data.filter( d => d.Year == i ); //only include the selected year
		let percentile90AQI = d3.sum(justThisYear, d => d.Percentile90AQI); //sum over the filtered array, for the cost field
		combinedData.push({"year": i, "value":percentile90AQI, "type": "percent"}); 
	}

	for(let i = minYear; i <= maxYear; i++) {
		let justThisYear = data.filter( d => d.Year == i ); //only include the selected year
		let maxAQI = d3.sum(justThisYear, d => d.MaxAQI); //sum over the filtered array, for the cost field
		combinedData.push({"year": i, "value":maxAQI, "type": "max"}); 
	}

	
	// console.log(costsPerYear)

		//TO DO:  Make a line chart object.  Make it 200 pixels tall by 1000 pixels wide. 
		//Be sure to send it the costsPerYear data 
		// The svg for this element has already been created in index.html, above the timeline circles- check it out
		
		
		let med = new Line({
			
			'parentElement': '#line',
			'color': 'blue',
			'containerHeight': 300,
            'containerWidth': 600
		}, combinedData);

		// let per = new Line({
			
		// 	'parentElement': '#line',
		// 	'color': 'red',
		// 	'containerHeight': 300,
        //     'containerWidth': 300
		// }, [perData]);

		// let max = new Line({
			
		// 	'parentElement': '#line',
		// 	'color': 'yellow',
		// 	'containerHeight': 300,
        //     'containerWidth': 300
		// }, [maxData]);

		// let stackedBarChart = 
		//   new StackedBarChart({ parentElement: '#chart'}, daysCOData);

		//   // Create chart

})
.catch(error => {
    console.error(error);
});


/// OLD VERSION.... 
// function drawChart(data){

// 	console.log("Let's draw a chart!!");
	

// 	// Margin object with properties for the four directions
// 	const margin = {top: 40, right: 50, bottom: 10, left: 50};

// 	// Width and height as the inner dimensions of the chart area
// 	const width = 1000 - margin.left - margin.right;
// 	const height = 1100 - margin.top - margin.bottom;

// 	// Define 'svg' as a child-element (g) from the drawing area and include spaces
// 	// Add <svg> element (drawing space)
// 	const svg = d3.select('body').append('svg')
// 	    .attr('width', width + margin.left + margin.right)
// 	    .attr('height', height + margin.top + margin.bottom)
// 	    .append('g')
// 	    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// 	// Initialize linear and ordinal scales (input domain and output range)
// 	const xScale = d3.scaleLinear()
// 		.domain([0, 365])
// 		.range([0, width]);

// 	console.log(d3.min(data, d => d.year) );

// 	const yScale = d3.scaleLinear()
// 		.domain([d3.max(data, d => d.year), d3.min( data, d => d.year)]) 
// 		.range([0, height]);

// 	const rScale = d3.scaleLinear()
// 		.domain(d3.extent(data, d=> d.cost))
// 		.range([5, 100]);

// 	// Construct a new ordinal scale with a range of ten categorical colours
// 	let colorPalette = d3.scaleOrdinal(d3.schemeTableau10)
// 	colorPalette.domain( "tropical-cyclone", "drought-wildfire", "severe-storm", "flooding" );

// 		// Initialize axes
// 		const xAxis = d3.axisTop(xScale);
// 		const yAxis = d3.axisLeft(yScale);

// 		// Draw the axis
// 		const xAxisGroup = svg.append('g')
// 		  .attr('class', 'axis x-axis') 
// 		  .call(xAxis);

// 		const yAxisGroup = svg.append('g')
// 		  .attr('class', 'axis y-axis')
// 		  .call(yAxis);

// 		//Add circles for each event in the data
// 	svg.selectAll('circle')
// 	    .data(data)
// 	    .enter()
// 	  .append('circle')
// 	  	.attr('fill', (d) => colorPalette(d.category) )
// 	    .attr('opacity', .8)
// 	    .attr('stroke', "gray")
// 	    .attr('stroke-width', 2)
// 	    .attr('r', (d) => rScale(d.cost) ) 
// 	    .attr('cy', (d) => yScale(d.year) ) 
// 	    .attr('cx',(d) =>  xScale(d.daysFromYrStart) );


// }

function computeDays(disasterDate){
  	let tokens = disasterDate.split("-");

  	let year = +tokens[0];
  	let month = +tokens[1];
  	let day = +tokens[2];

    return (Date.UTC(year, month-1, day) - Date.UTC(year, 0, 0)) / 24 / 60 / 60 / 1000 ;

  }