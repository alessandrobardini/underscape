class RenameKindToName < ActiveRecord::Migration[6.1]
  def change
    rename_column :items, :kind, :name
  end
end
