import { Response } from 'express'
import type { PayloadRequest } from 'payload/types'
import payload from 'payload'
import { Article, Charter, Destination, Yacht } from '../payload-types'

export const customSearchHandler = async (req: PayloadRequest, res: Response) => {
  const {
    query,
    locale,
  }: {
    query: string
    locale: 'en' | 'fr'
  } = req.query as any

  if (!query) {
    return res.status(400).send({
      message: 'No query provided',
    })
  }
  if (locale !== 'en' && locale !== 'fr') {
    return res.status(400).send({
      message: 'Invalid locale',
    })
  }

  const cleanedQuery = cleanString(query)
  // REplace everything that is not a letter or a number with a space
  const superCleanedQuery = cleanedQuery.replace(/[^a-zA-Z0-9]/g, '')

  const yachts = await searchCollection(superCleanedQuery, 'yachts')
  const charters = await searchCollection(superCleanedQuery, 'charters')
  const articles = await searchCollection(superCleanedQuery, 'articles')
  const destinations = await searchCollection(superCleanedQuery, 'destinations')

  res.status(200).json({
    yachts,
    charters,
    articles,
    destinations,
  })
}

const searchCollection = async (
  query: string,
  collection: 'yachts' | 'charters' | 'destinations' | 'articles',
  locale: 'en' | 'fr' = 'en',
): Promise<any[]> => {
  var queryField: string
  var topQueryField: string
  var subQueryField: string | undefined = undefined
  switch (collection) {
    case 'yachts':
      queryField = 'name'
      topQueryField = 'name'
      break
    case 'charters':
      queryField = 'name'
      topQueryField = 'name'
      break
    case 'destinations':
      queryField = `destination.${locale}`
      topQueryField = 'destination'
      subQueryField = locale
      break
    case 'articles':
      queryField = `title.${locale}`
      topQueryField = 'title'
      subQueryField = locale
  }
  const cleanedQuery = removeDiacritics(query)
  const result = await payload.db.collections[collection].find(
    {
      [queryField]: {
        $regex: RegExp(cleanedQuery, 'i'),
      },
    },
    {
      _id: 1,
      [queryField]: 1,
    },
    {
      limit: 3,
    },
  )
  const sortedResult = result.sort((a, b) => {
    if (subQueryField) {
      a = a[topQueryField][subQueryField].toLowerCase()
    } else {
      a = a[topQueryField].toLowerCase()
    }
    if (subQueryField) {
      b = b[topQueryField][subQueryField].toLowerCase()
    } else {
      b = b[topQueryField].toLowerCase()
    }
    const aIndex = a.indexOf(cleanedQuery)
    const bIndex = b.indexOf(cleanedQuery)
    return aIndex - bIndex
  })

  // Remove nested fields
  const finalResult = sortedResult.map(item => {
    if (subQueryField) {
      return {
        id: item._id,
        [topQueryField]: item[topQueryField][subQueryField],
      }
    }
    return {
      id: item._id,
      [topQueryField]: item[topQueryField],
    }
  })
  return finalResult
}

function removeDiacritics(string = '') {
  return string
    .replace(/a/g, '[a,á,à,ä,â]')
    .replace(/A/g, '[A,a,á,à,ä,â]')
    .replace(/e/g, '[e,é,ë,è]')
    .replace(/E/g, '[E,e,é,ë,è]')
    .replace(/i/g, '[i,í,ï,ì]')
    .replace(/I/g, '[I,i,í,ï,ì]')
    .replace(/o/g, '[o,ó,ö,ò]')
    .replace(/O/g, '[O,o,ó,ö,ò]')
    .replace(/u/g, '[u,ü,ú,ù]')
    .replace(/U/g, '[U,u,ü,ú,ù]')
}

function cleanString(input) {
  var output = ''
  for (var i = 0; i < input.length; i++) {
    if (input.charCodeAt(i) <= 127) {
      output += input.charAt(i)
    }
  }
  return output
}
