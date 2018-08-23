// borrowed from https://bl.ocks.org/mbostock/3886208
const plotStackedBarChart = (elementSelector,finalData,keys, chartTitle, legendFill) =>{
	let localLegendFill = legendFill == undefined ? "#000" : legendFill;
	const barChart = d3.select(elementSelector),
    barChartMargin = {top: 20, right: 20, bottom: 30, left: 40},
    barChartWidth = +barChart.attr("width") - barChartMargin.left - barChartMargin.right,
    barChartHeight = +barChart.attr("height") - barChartMargin.top - barChartMargin.bottom,
    g = barChart.append("g").attr("transform", "translate(" + barChartMargin.left + "," + barChartMargin.top + ")");

	var x = d3.scaleBand()
	    .rangeRound([0, barChartWidth])
	    .paddingInner(0.05)
	    .align(0.1);

	var y = d3.scaleLinear()
	    .rangeRound([barChartHeight, 0]);

	var z = d3.scaleOrdinal()
		// http://colorbrewer2.org/#type=diverging&scheme=RdYlGn&n=10
	    .range(['#a50026','#d73027','#f46d43','#fdae61','#fee08b','#d9ef8b','#a6d96a','#66bd63','#1a9850','#006837']);

	x.domain(finalData.map(function(d) {return d['Year Built']; }));
	y.domain([0, d3.max(finalData, function(d) { return d.total; })]).nice();
	z.domain(keys);

	g.append("g")
		.selectAll("g")
		.data(d3.stack().keys(keys)(finalData))
		.enter().append("g")
		.attr("fill", function(d) { return z(d.key); })
	.selectAll("rect")
	.data(function(d) { return d; })
	.enter().append("rect")
		.attr("class",function(d) { return y(d[1]); })
		.attr("x", function(d) { return x(d.data['Year Built']); })
		.attr("y", function(d) { return y(d[1]); })
		.attr("height", function(d) { return y(d[0]) - y(d[1]); })
		.attr("width", x.bandwidth());

	g.append("g")
		.attr("class", "axis")
		.attr("fill", localLegendFill)
		.attr("transform", "translate(0," + barChartHeight + ")")
		.append("text")
			.style("fill",localLegendFill)
			.attr("y", y(y.ticks().pop()) + 0.5)
			.attr("x", (barChartWidth / 2 ))
			.attr("dy", "2.32em")
			.attr("fill", "#000")
			.attr("font-weight", "bold")
			.text("Year Built (1872 - 2010)")
				.attr("text-anchor", "middle")
				.attr("dominant-baseline", "central")
		.call(d3.axisBottom(x));

	g.append("g")
		.style("fill",localLegendFill)
		.attr("class", "axis")
			.call(d3.axisLeft(y).ticks(null, "s"))
		.append("text")
			.style("fill",localLegendFill)
			.attr("x", 2)
			.attr("y", y(y.ticks().pop()) + 0.5)
			.attr("dy", "0.32em")
			.attr("fill", "#000")
			.attr("font-weight", "bold")
			.attr("text-anchor", "start")
			.text(chartTitle);

	let legend = g.append("g")
		.attr("font-family", "sans-serif")
		.attr("font-size", 10)
		.attr("text-anchor", "end")
			.selectAll("g")
		.data(keys.slice().reverse())
			.enter().append("g")
		.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	legend.append("rect")
		.attr("x", barChartWidth - 19)
		.attr("width", 19)
		.attr("height", 19)
		.attr("fill", z)
		.attr("class",function(d) { return d; });

	legend.append("text")
		.attr("x", barChartWidth - 24)
		.attr("y", 9.5)
		.attr("dy", "0.32em")
		.style("fill",localLegendFill)
		.text(function(d) { return d; });	
}

plotStackedBarChart("#bar-chart-1", barChart1MappedData, qualKeys, "Count of Houses Sold");
plotStackedBarChart("#bar-chart-2", barChart2MappedData, qualKeys, "Sum of Sales Prices by Quality",);
plotStackedBarChart("#bar-chart-5", barChart5MappedData, condKeys, "Count of Houses Sold");
plotStackedBarChart("#bar-chart-6", barChart6MappedData, condKeys, "Sum of Sales Prices by Condition",);


