class CreateMxAssessments < ActiveRecord::Migration
  def change
    create_table :mx_assessments do |t|

      t.timestamps
    end
  end
end
