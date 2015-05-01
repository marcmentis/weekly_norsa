class CreatePatients < ActiveRecord::Migration
  def change
    create_table :patients do |t|
      t.string :firstname
      t.string :lastname
      t.string :number
      t.string :facility
      t.string :ward
      t.date :doa
      t.date :dob
      t.date :dod
      t.string :updated_by
      t.string :facility
      t.string :ward

      t.timestamps
    end
    add_index :patients, :facility
    add_index :patients, :ward
  end
end
