const path = require('path')
const fs = require('fs/promises')
const debug = require('debug')('tip-tap-server:books-route')
const { Book } = require('../models/book')
const { BookChapter } = require('../models/book-chapter')

const express = require('express')
const router = express.Router()

const booksDir = path.join(__dirname, '../books/')

/**
 *
 * @param {String} path
 */
function removeFileExtension(path) {
  const i = path.lastIndexOf('.')
  return path.substring(0, i)
}

function errorResponse(message) {
  return {
    error: {
      message,
    },
  }
}

router.get('/', async (req, res) => {
  const { title, chapter } = req.query
  if (!(title && chapter)) {
    return res.status(400).json(errorResponse('Invalid query params'))
  }

  try {
    const bookPath = path.join(booksDir, title)
    const content = await fs.readdir(bookPath)

    // Check if the chapter exists
    if (chapter < 1 || chapter > content.length - 1) {
      return res
        .status(400)
        .json(errorResponse(`Chapter ${chapter} does not exist`))
    }

    const idx = chapter - 1
    const chapterTitle = content[idx]
    const chapterPath = path.join(bookPath, chapterTitle)
    const chapterText = await fs.readFile(chapterPath, { encoding: 'utf-8' })
    const bookMetadata = await fs.readFile(
      path.join(bookPath, 'metadata/metadata.json'),
      { encoding: 'utf-8' }
    )

    const {
      author: bookAuthor,
      title: bookTitle,
      chapters,
    } = JSON.parse(bookMetadata)

    const book = new Book(
      bookAuthor,
      bookTitle,
      new BookChapter(chapterTitle, ''),
      chapters
    )

    res.json(book)
  } catch (err) {
    debug(err)
    res.status(400).json(errorResponse(`Book "${title}" does not exist.`))
  }
})

module.exports = router
