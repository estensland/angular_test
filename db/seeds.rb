# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


cat1 = Category.create(name: "Serious")
cat2 = Category.create(name: "Testing")
cat3 = Category.create(name: "Nonsense")

list1 = List.create(name: "Test List")
list1.tasks << Task.create(text: "Complete TODO list code", category_id: 1)
list1.tasks << Task.create(text: "Swim the ocean", category_id: 2)
list1.tasks << Task.create(text: "Invent odorless garlic", category_id: 2)
list1.tasks << Task.create(text: "Scam the world", category_id: 2)
list1.tasks << Task.create(text: "Run faster, jump higher, not let you poison me", category_id: 2)
list1.tasks << Task.create(text: "Throw it on the ground", category_id: 3)


list2 = List.create(name: "Stuff To Do")
list2.tasks << Task.create(text: "Climb Katmandu", category_id: 1)
list2.tasks << Task.create(text: "Eat Pickles", category_id: 1)
list2.tasks << Task.create(text: "Waa Waaaaaaaa", category_id: 3)