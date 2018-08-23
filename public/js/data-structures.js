// Stacked bar chart data

// Add for year built and modded
const mapData = (keys, dataToMap, count, columnToCount, condOrQual) =>{
	let tempData = {}
	
	dataToMap.map( x =>{

		let measureToCount = count == 0 ? x[columnToCount] : count;

		if(tempData[x['Year Built']] == undefined){
			tempData[x['Year Built']] = {}
			tempData[x['Year Built']].total = 0
		}
		if(tempData[x['Year Built']][x[condOrQual]] ==undefined){
			tempData[x['Year Built']][x[condOrQual]] = 0	
		}
		tempData[x['Year Built']][x[condOrQual]] += measureToCount;
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
const condKeys = [1,2,3,4,5,6,7,8,9];
const barChart1MappedData = mapData(qualKeys,barChart1Data, 1, "", "Overall Qual");
const barChart2MappedData = mapData(qualKeys,barChart1Data, 0, "SalePrice", "Overall Qual");
const barChart5MappedData = mapData(condKeys,barChart1Data, 1, "", "Overall Cond");
const barChart6MappedData = mapData(condKeys,barChart1Data, 0, "SalePrice", "Overall Cond");














// Average Sales Price by Year Built and Modded
const salesPriceByYearBuilt = {}; 
const salesPriceByYearModded = {}; 

barChart1Data.map(x => {
	if(!salesPriceByYearBuilt[x['Year Built']]){
		salesPriceByYearBuilt[x['Year Built']] = [];
	}
	if(!salesPriceByYearModded[x['Year Remod/Add']]){
		salesPriceByYearModded[x['Year Remod/Add']] = [];
	}

	salesPriceByYearBuilt[x['Year Built']].push(x['SalePrice'])
	salesPriceByYearModded[x['Year Remod/Add']].push(x['SalePrice'])
});

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const getSum= arr => {
	return arr.reduce(reducer);
}
const getMean = arr => {
	return getSum(arr) / arr.length;
}

const averageSalesPriceByYearBuilt = Object.keys(salesPriceByYearBuilt).map(year => {
	return {"year": year, "averageSalePrice": getMean(salesPriceByYearBuilt[year])};
})

const totalSalesPriceByYearBuilt = Object.keys(salesPriceByYearBuilt).map(year => {
	return {"year": year, "totalSalePrice": getSum(salesPriceByYearBuilt[year])};
})

const averageSalesPriceByYearModded = Object.keys(salesPriceByYearModded).map(year => {
	return {"year": year, "averageSalePrice": getMean(salesPriceByYearModded[year])};
})

const totalSalesPriceByYearModded = Object.keys(salesPriceByYearModded).map(year => {
	return {"year": year, "totalSalePrice": getSum(salesPriceByYearBuilt[year])};
})