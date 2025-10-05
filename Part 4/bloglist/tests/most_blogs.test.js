const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a673192337f8',
        title: 'Harry Potter',
        author: 'JK Rowling',
        url: 'https://harrypotter.com.pdf',
        likes: 3,
        __v: 0
      },
      {
        _id: '5a422aa3898399193917391f9',
        title: 'Percy Jackson',
        author: 'Rick Riordan',
        url: 'https://olympianuniverse/percyjacksonlovesannabeth.com.pdf',
        likes: 6,
        __v: 0
      },
      {
        _id: '5a422aa3898399193829389138',
        title: 'Annabeth Chase',
        author: 'Rick Riordan',
        url: 'https://olympianuniverse/percyjacksonlovesannabethchase.com.pdf',
        likes: 2,
        __v: 0
      },
      {
        _id: '5a422aa3898393819281928128',
        title: 'Rachel Elizabeth Dare',
        author: 'Rick Riordan',
        url: 'https://olympianuniverse/rachelthemyth.com.pdf',
        likes: 10,
        __v: 0
      },
    ]
    const actual = {
        author: "Rick Riordan",
        blogs: 3
      }
  
    test('when list has several blogs from different authors, return the author with the most blogs', () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      assert.deepStrictEqual(result, actual)
    })
  })