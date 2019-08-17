class RoutineSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name

  belongs_to :user
  has_many :weights
  has_many :machines, through: :weights

end
