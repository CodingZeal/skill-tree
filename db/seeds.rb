# frozen_string_literal: true

user = User.new
user.email = 'test@example.com'
user.password = 'valid_password'
user.password_confirmation = 'valid_password'
user.time_zone = 'PST'
user.first_name = 'John'
user.last_name = 'Dogh'
user.unique_url = 'AAAAAAAAAAAAAAAAAA'
user.mentor_status = 1
user.privacy_status = 1
user.save!

user2 = User.new
user2.email = 'tester@example.com'
user2.password = 'valid_password'
user2.password_confirmation = 'valid_password'
user2.time_zone = 'PST'
user2.first_name = 'Jane'
user2.last_name = 'Dogh'
user2.unique_url = 'BBBBBBBBBBBBBBBBBBBBB'
user2.mentor_status = 0
user2.privacy_status = 0
user2.save!

user3 = User.new
user3.email = 'testing@example.com'
user3.password = 'valid_password'
user3.password_confirmation = 'valid_password'
user3.time_zone = 'PST'
user3.first_name = 'Howy'
user3.last_name = 'Dogh'
user3.unique_url = 'CCCCCCCCCCCCCCCCCCCC'
user3.mentor_status = 1
user3.privacy_status = 0
user3.save!

category = Category.new
category.category_name = 'RAILS'
category.save!

category2 = Category.new
category2.category_name = 'Ruby'
category2.save!

category3 = Category.new
category3.category_name = 'JavaScript'
category3.save!

category4 = Category.new
category4.category_name = 'Java'
category4.save!

category5 = Category.new
category5.category_name = 'C++'
category5.save!

rating = Rating.new
rating.score = 3.5
rating.mentor_id = 1
rating.developer_id = 1
rating.category_id = 2
rating.save!

rating2 = Rating.new
rating2.score = 5
rating2.mentor_id = 2
rating2.developer_id = 2
rating2.category_id = 3
rating2.save!

rating3 = Rating.new
rating3.score = 1
rating3.mentor_id = 3
rating3.developer_id = 3
rating3.category_id = 1
rating3.save!
