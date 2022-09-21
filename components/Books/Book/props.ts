export interface IBook {
  bookId: number;
  title: string;
  description: string;
  author: string;
  image: string;
  handleBookClick: (bookId: number, onComplete: () => void) => void;
}