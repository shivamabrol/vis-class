class StackedBarChart {

    /**
     * Class constructor with basic chart configuration
     * @param {Object}
     * @param {Array}
     */
    constructor(_config, _data) {
      this.config = {
        parentElement: _config.parentElement,
        containerWidth: 2000,
        containerHeight: 500,
        margin: {top: 10, right: 10, bottom: 30, left: 30},
      }
      this.data = _data;
      this.initVis();
    }

    
    /**
     * Initialize scales/axes and append static chart elements
     */
    initVis() {
      let vis = this;
  
      vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
      vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
  
      vis.xScale = d3.scaleBand()
          .range([0, vis.width])
          .paddingInner(0.2)
          .paddingOuter(0.2);
  
      vis.yScale = d3.scaleLinear()
          .range([vis.height, 0]);
      
      // Initialize axes
      vis.xAxis = d3.axisBottom(vis.xScale);
      vis.yAxis = d3.axisLeft(vis.yScale).ticks(6);
  
      // Define size of SVG drawing area
      vis.svg = d3.select(vis.config.parentElement)
          .attr('width', vis.config.containerWidth)
          .attr('height', vis.config.containerHeight);
  
      // Append group element that will contain our actual chart
      vis.chart = vis.svg.append('g')
          .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);
  
      // Append empty x-axis group and move it to the bottom of the chart
      vis.xAxisG = vis.chart.append('g')
          .attr('class', 'axis x-axis')
          .attr('transform', `translate(0,${vis.height})`);
      
      // Append y-axis group
      vis.yAxisG = vis.chart.append('g')
          .attr('class', 'axis y-axis');
  
      // Initialize stack generator and specify the categories or layers
      // that we want to show in the chart

      // DaysCO,DaysNO2,DaysOzone,DaysSO2,DaysPM2.5,DaysPM10
      vis.stack = d3.stack()
          .keys(['CO' ,'NO2','Ozone','SO2',
          'PM25.5','PM10']);

      vis.updateVis();
      //plot all 6 pollutants on the stacked chart acc to year
    }
  
    /**
     * Prepare the data and scales before we render it.
     */
    updateVis() {
      let vis = this;
  
      // vis.xScale.domain([1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]);
      vis.xScale.domain([1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]);
      vis.yScale.domain([0,300]);
  
      // Call stack generator on the dataset
      vis.stackedData = vis.stack(vis.data);

      vis.renderVis();
    }
  
    /**
     * This function contains the D3 code for binding data to visual elements
     * Important: the chart is not interactive yet and renderVis() is intended
     * to be called only once; otherwise new paths would be added on top
     */
    renderVis() {
      let vis = this;
      let colors = ["#C9D6DF", "#F7EECF", "#E3E1B2", "#F9CAC8"];

      // vis.chart.selectAll('category')
      //     .data(vis.stackedData)
      //   .join('g')
      //     .attr('class', d => `category cat-${d.key}`)
      //   .selectAll('rect')
      //     .data(d => d)
      //   .join('rect')
      //     .attr('x', d => vis.xScale(d.data.Year))
      //     .attr('y', d => vis.yScale(d[1]))
      //     .attr('height', d => vis.yScale(d[0]) - vis.yScale(d[1]))
      //     .attr('width', vis.xScale.bandwidth());
  
      // Update the axes
      vis.xAxisG.call(vis.xAxis);
      vis.yAxisG.call(vis.yAxis);
    }
  }