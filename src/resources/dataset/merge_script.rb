# A script for combining datasets from a json file and a csv file into one json file

require 'json'
require 'csv'

def restaurants_list_to_hash(list)
  result = {}

  list.each do |restaurant|
    id = restaurant['objectID']
    result[id] = restaurant
  end

  result
end

def convert_review_strs_to_ints(restaurant)
  restaurant['stars_count'] = restaurant['stars_count'].to_f
  restaurant['reviews_count'] = restaurant['reviews_count'].to_i
  restaurant
end

def delete_unneeded_keys(restaurant)
  restaurant.reject do |key, val|
    %w(
      address
      city
      area
      country
      phone
      postal_code
      price
      state
      phone_number
      dining_style
    ).include?(key)
  end
end

json_filepath = File.join(File.dirname(__FILE__), 'restaurants_list.json')
json_file = File.read(json_filepath)

restaurants_list = JSON.parse(json_file)
restaurants_list = restaurants_list_to_hash(restaurants_list)

csv_filepath = File.join(File.dirname(__FILE__), 'restaurants_info.csv')
CSV.foreach(csv_filepath, headers: true, col_sep: ';') do |row|
  id = row['objectID'].to_i
  restaurants_list[id] = restaurants_list[id].merge(row.to_h)

  restaurants_list[id] = delete_unneeded_keys(restaurants_list[id])
  restaurants_list[id] = convert_review_strs_to_ints(restaurants_list[id])
end

write_filepath = File.join(File.dirname(__FILE__), 'full_restaurants_info.json')
File.open(write_filepath,"w") do |f|
  f.write(JSON.pretty_generate(restaurants_list.values))
end
