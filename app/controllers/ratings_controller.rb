# frozen_string_literal: true

# deals with ratings
class RatingsController < ApplicationController

  def index
    @ratings = []
    Rating.find_each do |rating|
      @ratings << rating.as_json(include: { category: {} })
    end
    render json: @ratings
  end

  def my_ratings
    @ratings = Rating.where(developer_id: params[:user_id]).map do |rating|
      rating.as_json(include: { category: {} })
    end
    render json: @ratings
  end

  def my_last_rating
    @my_last_rating = []
    Category.find_each do |category|
      @all_my_ratings = Rating.where('developer_id = ? and mentor_id = ? and category_id = ?', params[:user_id], params[:user_id], category.id).as_json(include: { category: {} })
      if @all_my_ratings.length > 0
        @my_last_rating << @all_my_ratings.last
      end
    end
    render json: @my_last_rating
  end

  def my_static_ratings
    @my_last_rating = []
    @user = User.where('unique_url = ?', params[:unique_url]).first
    Category.find_each do |category|
      @all_my_ratings = Rating.where('developer_id = ? and mentor_id = ? and category_id = ?', @user.id, @user.id, category.id).as_json(include: { category: {} })
      if @all_my_ratings.length > 0
        @my_last_rating << @all_my_ratings.last
      end
    end
    render json: @my_last_rating
  end

  def create
    @rating = Rating.create(rating_params)
    if @rating.valid?
      render json: @rating
    else
      render json: @rating.errors, status: :unprocessable_entity
      p @rating.errors
    end
  end

  def rating_params
    params.require(:rating).permit(:category_id, :developer_id, :mentor_id, :score)
  end
end
