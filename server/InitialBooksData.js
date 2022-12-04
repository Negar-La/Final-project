const request = require("request-promise");

const getBooks = async (query) => {
  
    try {
        const response = await request(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyCn3-USOF7C7YmIQvldOkjmYoJXkSXvQ7M`);
        const books = JSON.parse(response);
        const items =books.items
        return items
        ;
    } catch (err) {
        console.log('Error: ', err);
    }
};


getBooks("Jasmine Guillory").then((items) => console.log(
    JSON.stringify(
    items.slice(0, 7).map((result)=>{
        return {
            id : result.id,
            title: result.volumeInfo.title,
            // subtitle: result.volumeInfo.subtitle, //not all results have a subtitle
            author: result.volumeInfo.authors[0], //authors is an array in api, I used [0] to delete the array
            publisher: result.volumeInfo.publisher,
            publishedDate: result.volumeInfo.publishedDate,
            description: result.volumeInfo.description,
            pageCount: result.volumeInfo.pageCount,
            categories: result.volumeInfo.categories[0], //category is an array in api, I used [0] to delete the array
            imageSmall: result.volumeInfo.imageLinks.smallThumbnail,
            image: result.volumeInfo.imageLinks.thumbnail,
            previewLink: result.volumeInfo.previewLink,
            infoLink: result.volumeInfo.infoLink,
            searchInfo: result.searchInfo?.textSnippet
        }
    }))
    )
    );
