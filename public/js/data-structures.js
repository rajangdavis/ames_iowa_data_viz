// Bar Charts
// Average Sales Price by Year Built, Modded, and Sold
// I could represent this as one Object, but I won't...
let salesPriceByYearBuilt = {}; 
let salesPriceByYearModded = {}; 
let salesPriceByYearSold = {}; 

barChartData.map(x => {
	if(!salesPriceByYearBuilt[x['Year Built']]){
		salesPriceByYearBuilt[x['Year Built']] = [];
	}
	if(!salesPriceByYearModded[x['Year Remod/Add']]){
		salesPriceByYearModded[x['Year Remod/Add']] = [];
	}
	if(!salesPriceByYearSold[x["Yr Sold"]]){
		salesPriceByYearSold[x["Yr Sold"]] = [];
	}

	salesPriceByYearBuilt[x['Year Built']].push(x['SalePrice'])
	salesPriceByYearModded[x['Year Remod/Add']].push(x['SalePrice'])
	salesPriceByYearSold[x["Yr Sold"]].push(x['SalePrice'])
});


// Borrowed from JS Stats
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const getSum= arr => {
	return arr.reduce(reducer);
}
const getMean = arr => {
	return getSum(arr) / arr.length;
}

const averageSalesPrice = {
	"yearBuilt": Object.keys(salesPriceByYearBuilt).map(year => {
		return {"year": year, "averageSalePrice": getMean(salesPriceByYearBuilt[year])};
	}),
	"yearModded": Object.keys(salesPriceByYearModded).map(year => {
		return {"year": year, "averageSalePrice": getMean(salesPriceByYearModded[year])};
	}),
	"yearSold": Object.keys(salesPriceByYearSold).map(year => {
		return {"year": year, "averageSalePrice": getMean(salesPriceByYearSold[year])};
	})	
}

const totalSalesPrice = {
	"yearBuilt": Object.keys(salesPriceByYearBuilt).map(year => {
		return {"year": year, "totalSalePrice": getSum(salesPriceByYearBuilt[year])};
	}),
	"yearModded" : Object.keys(salesPriceByYearModded).map(year => {
		return {"year": year, "totalSalePrice": getSum(salesPriceByYearModded[year])};
	}),
	"yearSold": Object.keys(salesPriceByYearSold).map(year => {
		return {"year": year, "totalSalePrice": getSum(salesPriceByYearSold[year])};
	})
}