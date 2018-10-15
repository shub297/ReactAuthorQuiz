import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import ReactAuthorQuiz from './ReactAuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Mark_Twain%2C_Brady-Handy_photo_portrait%2C_Feb_7%2C_1871%2C_cropped.jpg/220px-Mark_Twain%2C_Brady-Handy_photo_portrait%2C_Feb_7%2C_1871%2C_cropped.jpg',
    imageSource: 'Wikipedia',
    books: ['The Adventures of Huckleberry Finn', 'Life on the Mississippi', 'Roughing It']
  },
  {
    name: 'J K Rowling',
    imageUrl: 'https://cdn-images-1.medium.com/max/2000/0*jCMeqyKliSaz_4sl.jpg',
    imageSource: 'Wikipedia',
    books: ['Harry Potter', 'Fantastic Beasts', 'Casual Vacancy']
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg',
    imageSource: 'Wikipedia',
    books: ['Macbeth', 'Romeo and Juliet', 'Othello']
  },
  {
    name: 'Neil Gaiman',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Kyle-cassidy-neil-gaiman-April-2013.jpg',
    imageSource: 'Wikipedia',
    books: ['Ansari Boys', 'American Gods', 'Norse Mythology']
  }
];

function getTurnData(authors) {
  const allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books);
  }, []);

  const fourRandomBooks = shuffle(allBooks).slice(0,4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) =>
      author.books.some((title) =>
        title === answer ))
  }
}

/*function resetState() {
  return {
    turnData: getTurnData(authors),
    highlight: ''
  };
} */

function reducer(state = {authors, turnData: getTurnData(authors), highlight: ''}, action) {
  switch (action.type) {
    case 'ANSWER_SELECTED':
      const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
      return Object.assign({}, state, {highlight: isCorrect ? 'correct' : 'wrong'});
    case 'CONTINUE':
      return Object.assign({}, state, {highlight: '', turnData: getTurnData(state.authors)});
    case 'ADD_AUTHOR':
      return Object.assign({}, state, {highlight: '', authors: state.authors.concat([action.author])});
    default:
      return state;
  }
}

//let state = resetState();
let store = Redux.createStore(reducer);

/*
function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
} */

ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={store}>
      <React.Fragment>
        <Route exact path="/" component={ReactAuthorQuiz} />
        <Route path="/add" component={AddAuthorForm} />
      </React.Fragment>
    </ReactRedux.Provider>
  </BrowserRouter>, document.getElementById('root'));

/*function render() {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route path="/add" component={AuthorWrapper} />
      </React.Fragment>
    </BrowserRouter>, document.getElementById('root'));
}
render();
*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
