export interface BooksProps {
  books: {
    data: [{
      bookId: number
      title: string
      description: string
      author: string
      image: string
    }]
  }
}