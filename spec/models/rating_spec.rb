# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Rating, type: :model do
  describe 'Rating' do
    context 'when required information is missing' do
      let(:rating) { build(:rating, mentor_id: nil) }
      it 'will not create without a mentor_id' do
        expect(rating).to_not be_valid
      end
      let(:rating2) { build(:rating, developer_id: nil) }
      it 'will not create without a developer_id' do
        expect(rating2).to_not be_valid
      end
      let(:rating3) { build(:rating, category_id: nil) }
      it 'will not create without a category_id' do
        expect(rating3).to_not be_valid
      end
      it 'fails to create when there is no score' do
        rating.score = nil
        expect(rating).to_not be_valid
      end
    end
  end
end
