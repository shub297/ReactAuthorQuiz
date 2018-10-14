import React from 'react';
import ReactDOM from 'react-dom';
import ReactAuthorQuiz from './ReactAuthorQuiz';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Mark_Twain%2C_Brady-Handy_photo_portrait%2C_Feb_7%2C_1871%2C_cropped.jpg/220px-Mark_Twain%2C_Brady-Handy_photo_portrait%2C_Feb_7%2C_1871%2C_cropped.jpg',
    imageSource: 'Wikipedia',
    books: ['The Adventures of Huckleberry Finn', 'Life on the Mississippi', 'Roughing It']
  }
];

const state = {
  turnData: {
    author: authors[0],
    books: authors[0].books
  },
  highlight: ''
};

function onAnswerSelected(answer) {
}

describe("AuthorQuiz", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReactAuthorQuiz {...state} onAnswerSelected={onAnswerSelected}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
