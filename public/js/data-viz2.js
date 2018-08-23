// borrowed from https://bl.ocks.org/mbostock/3885304
const plotBarChart = (elemSelector, data, xAxis, xAxisTitle, yAxis, yAxisTitle) =>{
    let barChart = d3.select(elemSelector),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +barChart.attr("width") - margin.left - margin.right,
        height = +barChart.attr("height") - margin.top - margin.bottom;

    let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    let g = barChart.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function(d) { return d[xAxis]; }));
    y.domain([0, d3.max(data, function(d) { return d[yAxis]; })]);

    g.append("g")
        .attr("class", "axis")
        .attr("fill", "#000")
        .attr("transform", "translate(0," + height + ")")
        .append("text")
            .style("fill","#000")
            .attr("y", 24.5)
            .attr("x", (width / 2 ) )
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .text(xAxisTitle)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")
        .call(d3.axisBottom(x));

    g.append("g")
        .style("fill","#000")
        .attr("class", "axis")
            .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
            .style("fill","#000")
            .attr("x", -35)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "-1.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text(yAxisTitle);

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d[xAxis]); })
            .attr("y", function(d) { return y(d[yAxis]); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d[yAxis]); });
}

plotBarChart("#bar-chart-1", averageSalesPriceByYearBuilt, "year" , "Year Built (1872 - 2010)", "averageSalePrice", "Average Sales Price")
plotBarChart("#bar-chart-2", totalSalesPriceByYearBuilt, "year" , "Year Built (1872 - 2010)", "totalSalePrice", "Total of Sales Price")
plotBarChart("#bar-chart-3", totalSalesPriceByYearModded, "year" , "Year Modified (1950 - 2010)", "totalSalePrice", "Total of Sales Price")
plotBarChart("#bar-chart-4", averageSalesPriceByYearModded, "year" , "Year Modified (1950 - 2010)", "averageSalePrice", "Average Sales Price")