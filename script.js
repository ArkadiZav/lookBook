// handlebars method:
var source = $('#lookbook-template').html();
var template = Handlebars.compile(source);

var fetch = function (isbn) {
  $.ajax({
    method: "GET",
    url: 'https://www.googleapis.com/books/v1/volumes?q=isbn' + ":" + isbn,
  //  url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:0439023521',
    dataType: "json",
    success: function(data) {
     console.log(data);
    //  addBook(data);
      addBook2(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

var clickHandler = function () {
  var isbnNum = $("#search").val();
  $(".form-group")[0].reset();
  fetch(isbnNum);
}

// append method
var addBook = function(data) {
  $('.viewbookdata').append('<h5>' + data.items[0].volumeInfo.description + '</h5>' +
  '<h3> Written by: ' + data.items[0].volumeInfo.authors[0] +
  '</h3>' + '<img src = "http://books.google.com/books/content?id=hlb_sM1AN0gC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api" >');
  };

// handlebars method
var addBook2 = function (data) {
  var books = [
    { author: data.items[0].volumeInfo.authors[0],
      description: data.items[0].volumeInfo.description,
      image: data.items[0].volumeInfo.imageLinks.smallThumbnail
    }
  ];
  $(".viewbookdata").empty();
  var newHTML = template({description: books[0].description, author: books[0].author, image: books[0].image});
  $(".viewbookdata").append(newHTML);
}
