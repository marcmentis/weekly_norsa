class MxaTrackerController < ApplicationController
  def index
  	mxassessment = MxAssessment.new
  	@mxaw_jqGrid_obj = mxassessment.get_mxaw_jqGrid_obj(params)

  	respond_to do |format|
      format.html
      format.json {render json: @mxaw_jqGrid_obj }
    end
  end
end
