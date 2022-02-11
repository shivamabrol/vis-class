class PieChart {

    constructor(_config, _data) {
        this.config = {
          parentElement: _config.parentElement,
          containerWidth: _config.containerWidth || 500,
          containerHeight: _config.containerHeight || 500,
        //   color: _config.color || "blue",
          margin: { top: 10, bottom: 30, right: 50, left: 50 }
        }
        this.data = _data;
    
        // Call a class function
        this.initVis();
      }
    

    initVis() {
        const svg = d3.select('body').append('svg')
        .attr('width', 1000)
        .attr('height', 1100);
    
        // DaysCO,DaysNO2,DaysOzone,DaysSO2,DaysPM25,DaysPM10

    const data2 = {'CO': this.data[0].DaysCO/365, 'NO2': this.data[0].DaysNO2/365, 'Ozone':this.data[0].DaysOzone/365, 
    'SO2':this.data[0].DaysSO2/365, 'PM25':this.data[0].DaysPM25/365, 'PM10': this.data[0].DaysPM10/365}
    
    // set the color scale
    const color = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#97ebdb"])
    
    // Compute the position of each group on the pie:
    const pie = d3.pie()
      .value(function(d) {return d[1]})
    const data_ready = pie(Object.entries(data2))
    console.log(data_ready)
    
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('whatever')
      .data(data_ready)
      .join('path')
      .attr('d', d3.arc()
        .innerRadius(20)
        .outerRadius(50)
      )
      .attr('cx', 1000)
      .attr('cy', 500)
      .attr('fill', function(d){ return(color(d.data[1])) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
    }
}