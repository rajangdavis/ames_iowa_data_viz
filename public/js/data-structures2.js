// Stacked bar chart data
const mapData = (keys, dataToMap, count, columnToCount, condOrQual, builtModdedSold) =>{
	let tempData = {}
	
	dataToMap.map( x =>{
		let measureToCount = count == 0 ? x[columnToCount] : count;

		if(tempData[x[builtModdedSold]] == undefined){
			tempData[x[builtModdedSold]] = {}
			tempData[x[builtModdedSold]].total = 0
		}
		if(tempData[x[builtModdedSold]][x[condOrQual]] ==undefined){
			tempData[x[builtModdedSold]][x[condOrQual]] = 0	
		}
		tempData[x[builtModdedSold]][x[condOrQual]] += measureToCount;
		tempData[x[builtModdedSold]].total += measureToCount;
		return x[builtModdedSold];
	})

	return Object.keys(tempData).map( x =>{
		let data = tempData[x];
		finalJson = {total: data.total};
		finalJson[builtModdedSold]= x; 
		keys.map(i => {
			finalJson[i.toString()] = data[i.toString()] == undefined ? 0 : data[i.toString()]
		})
		return finalJson
	})
}

const qualKeys = [1,2,3,4,5,6,7,8,9,10];
const condKeys = [1,2,3,4,5,6,7,8,9];
const barChart7MappedData = mapData(qualKeys,barChartData, 1, "", "Overall Qual", "Year Built");
const barChart8MappedData = mapData(qualKeys,barChartData, 0, "SalePrice", "Overall Qual", "Year Built");
const barChart9MappedData = mapData(qualKeys,barChartData, 1, "", "Overall Qual", "Year Remod/Add");
const barChart10MappedData = mapData(qualKeys,barChartData, 0, "SalePrice", "Overall Qual", "Year Remod/Add");
const barChart11MappedData = mapData(qualKeys,barChartData, 1, "", "Overall Qual", "Yr Sold");
const barChart12MappedData = mapData(qualKeys,barChartData, 0, "SalePrice", "Overall Qual", "Yr Sold");

const barChart13MappedData = mapData(condKeys,barChartData, 1, "", "Overall Cond", "Year Built");
const barChart14MappedData = mapData(condKeys,barChartData, 0, "SalePrice", "Overall Cond", "Year Built");
// const barChart15MappedData = mapData(condKeys,barChartData, 1, "", "Overall Cond", "Year Remod/Add");
// const barChart16MappedData = mapData(condKeys,barChartData, 0, "SalePrice", "Overall Cond", "Year Remod/Add");
// const barChart17MappedData = mapData(condKeys,barChartData, 1, "", "Overall Cond", "Yr Sold");
// const barChart18MappedData = mapData(condKeys,barChartData, 0, "SalePrice", "Overall Cond", "Yr Sold");
