const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
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
      }
    ]
    const actual = {
        _id: '5a422aa3898399193917391f9',
        title: 'Percy Jackson',
        author: 'Rick Riordan',
        url: 'https://olympianuniverse/percyjacksonlovesannabeth.com.pdf',
        likes: 6,
        __v: 0
      }
  
    test('when list has three items, return the ones with most likes', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      assert.deepStrictEqual(result, actual)
    })
  })