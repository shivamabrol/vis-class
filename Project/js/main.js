console.log("Hello world");

d3.csv('data/hamilton_ohio.csv')
	.then(data => {
		console.log('Data loading complete. Work with dataset.');


		//for the line chart:
		//lets compute costs per year for the line chart
		let minYear = d3.min(data, d => d.Year);
		let maxYear = d3.max(data, d => d.Year);
		// 1980 to 2021
		let combinedData = []; //this will be our data for the line chart


		for (let i = minYear; i <= maxYear; i++) {
			let justThisYear = data.filter(d => d.Year == i); //only include the selected year
			let medianAQI = d3.sum(justThisYear, d => d.MedianAQI); //sum over the filtered array, for the cost field
			let percentile90AQI = d3.sum(justThisYear, d => d.Percentile90AQI); //sum over the filtered array, for the cost field
			let maxAQI = d3.sum(justThisYear, d => d.MaxAQI); //sum over the filtered array, for the cost field
			combinedData.push({ "year": i, "value": medianAQI, "type": "median" });
			combinedData.push({ "year": i, "value": percentile90AQI, "type": "percent" });
			combinedData.push({ "year": i, "value": maxAQI, "type": "max" });
		}
		let daysCOData = []

		for (let i = minYear; i <= maxYear; i++) {
			let justThisYear = data.filter(d => d.Year == i); //only include the selected year
			let COdata = d3.sum(justThisYear, d => d.DaysCO);
			let NO2data = d3.sum(justThisYear, d => d.DaysNO2);
			let OzoneData = d3.sum(justThisYear, d => d.DaysOzone);
			let SO2Data = d3.sum(justThisYear, d => d.DaysSO2);
			let PM25Data = d3.sum(justThisYear, d => d.DaysPM25);
			let PM10Data = d3.sum(justThisYear, d => d.DaysPM10);
			daysCOData.push({
				"year": i, "CO": COdata, "NO2": NO2data,
				"Ozone": OzoneData, "SO2": SO2Data, "PM25": PM25Data, "PM10": PM10Data
			})
		}

		// a chart (pie or bar) for each individual pollutant (CO, NO2, Ozone, SO2, PM2.5, PM10 ) showing the percentage of days in the year with that pollutant as the main pollutant (Vis 5) 
		let data2021 = data.filter(d => d.Year == 2019)
		console.log(data2021)

		let AQIData = []
		for (let i = minYear; i <= maxYear; i++) {
			let justThisYear = data.filter(d => d.Year == i);
			let AQIVal = d3.sum(justThisYear, d => d.DayswithAQI);
			if(AQIVal >= 365) {
				AQIData.push({ "year": i, "value": 0, "type": "median" });
			} else {
				AQIData.push({ "year": i, "value": 365 - AQIVal, "type": "median" });
			}
		}

		let newval = new Line({
			
			'parentElement': '#line',
			'color': 'blue',
			'containerHeight': 300,
            'containerWidth': 600
		}, combinedData);

		console.log(AQIData)
		let med = new Line({
			'parentElement': '#measurement',
			'color': 'blue',
			'containerHeight': 300,
			'containerWidth': 600
		}, AQIData);

		// drawChart(data)
		let pc = new PieChart({
			'parentElement': '#piechart',
			'color': 'blue',
			'containerHeight': 500,
			'containerWidth': 500
		}, data2021);

		// let nc = new NewFile({
		// 	'parentElement': '#my_dataviz',
		// 	'color': 'blue',
		// 	'containerHeight': 1000,
		// 	'containerWidth': 1000
		// }, data2021);

	})
	.catch(error => {
		console.error(error);
	});



function computeDays(disasterDate) {
	let tokens = disasterDate.split("-");

	let year = +tokens[0];
	let month = +tokens[1];
	let day = +tokens[2];

	return (Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 0)) / 24 / 60 / 60 / 1000;

}

function nonRecordedDays(days) {

	return 0;
}


