class MachineSerializer < ActiveModel::Serializer
  attributes :id, :name, :repetitions, :sets 

  has_many :weights
  has_many :routines, through: :weights
    
end
