import React from 'react';
import ReactDOM from 'react-dom';
import ReactAuthorQuiz from './ReactAuthorQuiz';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

const state = {
  turnData: {
    books: ['The Adventures of Huckleberry Finn', 'Life on the Mississippi', 'Roughing It', 'Harry Potter', 'Magical Beast'],
    author: {
      name: 'Mark Twain',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Mark_Twain%2C_Brady-Handy_photo_portrait%2C_Feb_7%2C_1871%2C_cropped.jpg/220px-Mark_Twain%2C_Brady-Handy_photo_portrait%2C_Feb_7%2C_1871%2C_cropped.jpg',
      imageSource: 'Wikipedia',
      books: ['The Adventures of Huckleberry Finn', 'Life on the Mississippi', 'Roughing It']
    }
  },
  highlight: 'none'
};

describe("AuthorQuiz", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReactAuthorQuiz {...state} onAnswerSelected={() => {}}/>, div);
  });

  describe("when no answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<ReactAuthorQuiz {...state} onAnswerSelected={() => {}}/>);
    });

    it('should have no background color', () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
    });
  });

  describe("when wrong answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<ReactAuthorQuiz {...(Object.assign({}, state, {highlight: 'wrong'}))} onAnswerSelected={() => {}}/>);
    });

    it('should have red background color', () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
    });
  });

  describe("when correct answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<ReactAuthorQuiz {...(Object.assign({}, state, {highlight: 'correct'}))} onAnswerSelected={() => {}}/>);
    });

    it('should have red background color', () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
    });
  });

  describe("when first answer is selected", () => {
    let wrapper;
    const handleAnswerSelected = jest.fn();

    beforeAll(() => {
      wrapper = mount(<ReactAuthorQuiz {...state} onAnswerSelected={handleAnswerSelected}/>);
      wrapper.find('.answer').first().simulate('click');
    });

    it('onAnswerSelected should be called', () => {
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it('selected answer should be The Adventures of Huckleberry Finn', () => {
      expect(handleAnswerSelected).toHaveBeenCalledWith('The Adventures of Huckleberry Finn');
    });
  });
});
