# frozen_string_literal: true

# deals with ratings
class RatingsController < ApplicationController
  def index
    ratings = []
    Rating.find_each do |rating|
      ratings << rating.as_json(include: { category: {} })
    end
    render json: ratings
  end

  def my_ratings
    ratings = Rating.where(developer_id: params[:user_id]).map do |rating|
      rating.as_json(include: { category: {} })
    end
    render json: ratings
  end

  def my_last_rating
    last_ratings_in_each_category = []
    user
    Category.find_each do |category|
      all_my_ratings = Rating.where('developer_id = ? and mentor_id = ? and category_id = ?',
                                    user.id, user.id, category.id)
                             .as_json(include: { category: {} })
      all_my_ratings.length.positive? && last_ratings_in_each_category << all_my_ratings.last
    end
    render json: last_ratings_in_each_category
  end

  def create
    rating = Rating.create(rating_params)
    if rating.valid?
      render json: rating
    else
      render json: rating.errors, status: :unprocessable_entity
    end
  end

  def rating_params
    params.require(:rating).permit(:category_id, :developer_id, :mentor_id, :score)
  end

  private

  def user
    user ||= (User.find_by(unique_url: params[:params]) || User.find(params[:params]))
  end
end
