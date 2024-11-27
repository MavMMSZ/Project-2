
interface BookInfo {
    id: number;
    title: string;
    author: string;
    publisher: string;
    genre: string;
    decription?: string;
    cover: string;
    rating?: number;
    reviews?: string[];
}

export default BookInfo;