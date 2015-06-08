class Accessauditlog < ActiveRecord::Base
	# self.table_name = 'aurora.accessauditlog' # THIS WORKS IN OMH - ROR1 HAS ROLE IN AURORA
	self.table_name = "accessauditlog"	


	# self.primary_key = "accessauditlog_id"
	# self.sequence_name = "med_order_seq"  # Name of "sequences" used by a trigger in this database
	# establish_connection "#{Rails.env}"
end