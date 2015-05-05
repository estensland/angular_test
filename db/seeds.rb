# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


list1 = List.create(name: "Test List")
list1.tasks << Task.create(text: "Complete TODO list code")
list1.tasks << Task.create(text: "Swim the ocean")
list1.tasks << Task.create(text: "Invent odorless garlic")


list2 = List.create(name: "Stuff To Do")
list2.tasks << Task.create(text: "Climb Katmandu")
list2.tasks << Task.create(text: "Eat Pickles")