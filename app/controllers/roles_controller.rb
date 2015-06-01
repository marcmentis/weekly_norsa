class RolesController < ApplicationController
  include JqgridHelper

  # GET /roles/
  def all_roles
    @roles = Role.all
    respond_to do |format|
      format.json {render json: @roles}
    end
  end

end