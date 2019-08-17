class WeightSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :machine
  belongs_to :routine

end
