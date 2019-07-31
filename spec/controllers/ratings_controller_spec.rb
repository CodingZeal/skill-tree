# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RatingsController, type: :controller do
  describe 'ratings' do
    let(:user) { build(:user, id: 1) }
    let(:user2) { build(:user, email: 'fake_email@email.com') }
    let(:category) { build(:category) }
    let(:rating) do
      build(:rating,
            mentor: user,
            developer: user,
            category: category)
    end
    let(:rating2) do
      build(:rating,
            mentor: user2,
            developer: user2,
            category: category)
    end
    context 'my ratings show up on my profile page'
    it 'ratings' do
      expect(rating).to be_valid
    end
    it 'displays my ratings' do
      allow(Rating).to receive(:where) { [rating] }
      get :my_ratings, params: { user_id: user.id }
      expect(response.body)
        .to eq([rating.as_json(include: { category: {} })].to_json)
    end
    it 'fails to create when there is no score' do
      rating.score = nil
      expect(rating).to_not be_valid
    end
  end
end
