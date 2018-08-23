// Stacked bar chart data
const mapData = (keys, dataToMap, count, columnToCount, getAverage) =>{
	let tempData = {}
	
	dataToMap.map( x =>{

		let measureToCount = count == 0 ? x[columnToCount] : count;

		if(tempData[x['Year Built']] == undefined){
			tempData[x['Year Built']] = {}
			tempData[x['Year Built']].total = 0
		}
		if(tempData[x['Year Built']][x["Overall Qual"]] ==undefined){
			tempData[x['Year Built']][x["Overall Qual"]] = 0	
		}
		tempData[x['Year Built']][x["Overall Qual"]] += measureToCount;
		tempData[x['Year Built']].total += measureToCount;
		return x['Year Built'];
	})

	return Object.keys(tempData).map( x =>{
		let data = tempData[x];
		finalJson = {"Year Built": x , total: data.total};
		keys.map(i => {
			finalJson[i.toString()] = data[i.toString()] == undefined ? 0 : data[i.toString()]
		})
		return finalJson
	})
}

const qualKeys = [1,2,3,4,5,6,7,8,9,10];
const barChart1MappedData = mapData(qualKeys,barChart1Data, 1);
const barChart2MappedData = mapData(qualKeys,barChart1Data, 0, "SalePrice");



// Average Sales Price by Year
const salesPriceByYear = {}; 

barChart1Data.map(x => {
	if(!salesPriceByYear[x['Year Built']]){
		salesPriceByYear[x['Year Built']] = [];
	}

	salesPriceByYear[x['Year Built']].push(x['SalePrice'])
});

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const getSum= arr => {
	return arr.reduce(reducer);
}
const getMean = arr => {
	return getSum(arr) / arr.length;
}

const averageSalesPriceByYear = Object.keys(salesPriceByYear).map(year => {
	return {"year": year, "averageSalePrice": getMean(salesPriceByYear[year])};
})

const totalSalesPriceByYear = Object.keys(salesPriceByYear).map(year => {
	return {"year": year, "totalSalePrice": getSum(salesPriceByYear[year])};
})