require 'sinatra'
require 'csv'

# I want to cache results
before do
  cache_control :public, max_age: 60
end

# I am making a transformation 
# on the raw data set because
# I don't know my data structures up front

def chart_data
	# This is a a reference to the file so that it can be read
	@data = File.new("./public/data/clean_train.csv", "r")

	# Initializes a CSV representation for Ruby
	@csv = CSV.new(@data, :headers => true, :converters => :all)

	# Parses the CSV to the @accounts_to_create array as JSON object
	@csv.to_a.map {|row| ret = row.to_hash;  ret.delete(ret.keys.first); ret.slice("Overall Qual","Year Built","Overall Cond", "SalePrice","Year Remod/Add", "Yr Sold") }.to_json
end

get '/' do  
	@chart_data = chart_data
	erb :"index"
end 