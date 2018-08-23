// Stacked bar chart data

// Add for year built and modded
const mapData = (keys, dataToMap, count, columnToCount, condOrQual, builtOrModded) =>{
	let tempData = {}
	
	dataToMap.map( x =>{

		let measureToCount = count == 0 ? x[columnToCount] : count;

		if(tempData[x[builtOrModded]] == undefined){
			tempData[x[builtOrModded]] = {}
			tempData[x[builtOrModded]].total = 0
		}
		if(tempData[x[builtOrModded]][x[condOrQual]] ==undefined){
			tempData[x[builtOrModded]][x[condOrQual]] = 0	
		}
		tempData[x[builtOrModded]][x[condOrQual]] += measureToCount;
		tempData[x[builtOrModded]].total += measureToCount;
		return x[builtOrModded];
	})

	return Object.keys(tempData).map( x =>{
		let data = tempData[x];
		finalJson = {builtOrModded: x , total: data.total};
		keys.map(i => {
			finalJson[i.toString()] = data[i.toString()] == undefined ? 0 : data[i.toString()]
		})
		return finalJson
	})
}

const qualKeys = [1,2,3,4,5,6,7,8,9,10];
const condKeys = [1,2,3,4,5,6,7,8,9];
const barChart5MappedData = mapData(qualKeys,barChart1Data, 1, "", "Overall Qual", "Year Built");
const barChart6MappedData = mapData(qualKeys,barChart1Data, 0, "SalePrice", "Overall Qual", "Year Built");
// const barChart7MappedData = mapData(condKeys,barChart1Data, 1, "", "Overall Cond", "Year Built");
// const barChart8MappedData = mapData(condKeys,barChart1Data, 0, "SalePrice", "Overall Cond", "Year Built");














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
	return {"year": year, "totalSalePrice": getSum(salesPriceByYearModded[year])};
})