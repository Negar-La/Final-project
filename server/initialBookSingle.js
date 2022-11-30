const request = require("request-promise");

const getBooks = async () => {
  
    try {
        const response = await request("https://www.googleapis.com/books/v1/volumes/AUo5EAAAQBAJ");
        const book = JSON.parse(response);
        return book
        ;
    } catch (err) {
        console.log('Error: ', err);
    }
};


getBooks().then((book) => console.log(
    JSON.stringify(
        {
            id : book.id,
            title: book.volumeInfo.title,
            // subtitle: result.volumeInfo.subtitle, //not all results have a subtitle
            author: book.volumeInfo.authors[0], //authors is an array in api, I used [0] to delete the array
            publisher: book.volumeInfo.publisher,
            publishedDate: book.volumeInfo.publishedDate,
            description: book.volumeInfo.description,
            pageCount: book.volumeInfo.pageCount,
            categories: book.volumeInfo.categories[0], //category is an array in api, I used [0] to delete the array
            imageSmall: book.volumeInfo.imageLinks.smallThumbnail,
            image: book.volumeInfo.imageLinks.thumbnail,
            previewLink: book.volumeInfo.previewLink,
            infoLink: book.volumeInfo.infoLink,
            searchInfo: book.searchInfo?.textSnippet
        }
    )
    )
    );
