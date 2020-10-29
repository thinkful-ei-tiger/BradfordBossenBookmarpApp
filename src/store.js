import $ from "jquery";
const store = {
  bookmarks: [
    {
      id: 'x56w',
      title: 'Title 1',
      rating: 3,
      url: 'http://www.title1.com',
      description: 'lorem ipsum dolor sit',
      expanded: false
    },
    {
      id: '6ffw',
      title: 'Title 2',
      rating: 5,
      url: 'http://www.title2.com',
      description: 'dolorum tempore deserunt',
      expanded: false
    } 
  ],
  adding: false,
  error: null,
  filter: 0
};

const getBookmark = function(id) {
  store.bookmarks.forEach(function(element) {
    if(id === element.id){
      console.log(element)
    }
  })
}

export default {
  store,
  getBookmark
}