
const searchBooks = async (query: string) => {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        console.log('Response:', response);
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid API response, check the network tab');
        }
        console.log('Data:', data);
        return data;
    } catch (err) {
        console.log('an error occurred', err);
        return {};
    }
}

const searchVolume = async (volumeId: string) => {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${volumeId}`);
        console.log('Response:', response);
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid API response, check the network tab');
        }
        console.log('Data:', data);
        return data;
    } catch (err) {
        console.log('an error occurred', err);
        return {};
    }
}

export { searchBooks, searchVolume };
// volume id
// https://books.google.com/ebooks?id=buc0AAAAMAAJ&dq=holmes&as_brr=4&source=webstore_bookcard

// bookeshelf id
// https://books.google.com/books?hl=en&as_coll=0&num=10&uid=11122233344455566778&source=gbs_slider_cls_metadata_0_mylibrary

//example for a book
// GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey

//example for a whole "shelf"
// GET https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=yourAPIKey
// Authorization: /* auth token here */