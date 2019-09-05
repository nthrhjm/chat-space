FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/yPzjDLgZ_400x400.jpg")}
    user
    group
  end
end
