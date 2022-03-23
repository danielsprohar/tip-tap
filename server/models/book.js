class Book {
  constructor(author, title, chapter = null, chapters = null) {
    this.author = author
    this.title = title
    this.chapter = chapter
    this.chapters = chapters
  }
}

exports.Book = Book