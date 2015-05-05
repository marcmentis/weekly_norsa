module JqgridHelper
	def create_jsGrid_obj(extract, params, total_query_count)
		# total pages needed for all records
		total_pages = (total_query_count/params[:rows].to_f).ceil  
		# Create the 'rows' array containing the actual data (hash of 'id', and 'cell')
		rows = extract.map {|r| rows = {"id" => r.id, "cell" => r} }
		# Create the return json object
		jsGrid_obj = { "total" => total_pages, 
		                "page" => params[:page].to_i, 
		                "records" => total_query_count,
		                "rows" => rows
		              }
		return jsGrid_obj
	end
end