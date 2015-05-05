class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :firstname
      t.string :lastname
      t.string :authen
      t.string :facility
      t.string :email
      t.string :firstinitial
      t.string :middleinitial
      t.string :updated_by
      t.string :facility

      t.timestamps
    end
    add_index :users, :facility
  end
end
