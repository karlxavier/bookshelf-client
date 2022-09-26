export interface IBook {
  bookId: number;
  title: string;
  description: string;
  author: string;
  image: string;
  created_at: string
  handleBookClick: (
    bookId: number,
    onComplete: () => void
  ) => void;
}

export interface IBooks {
  books: IBook[];
  handleBookClick: (
    bookId: number,
    onComplete: () => void
  ) => void;
}