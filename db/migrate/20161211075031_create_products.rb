class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.decimal :cost
      t.string :orgin
      t.text :note
      t.timestamps null: false
    end
  end
end
