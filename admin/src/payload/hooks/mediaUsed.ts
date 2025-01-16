import type { AccessResult } from 'payload/config'
import type { PayloadRequest } from 'payload/types'

import type { Media } from '../payload-types'

export default async function isMediaUsed({
  data,
  req,
}: {
  data: Media
  req: PayloadRequest
}): Promise<AccessResult> {
  const yachts = await req.payload.count({
    collection: 'yachts',
    where: {
      or: [
        {
          'photos.featured': {
            equals: data.id,
          },
        },
        {
          'photos.gallery': {
            contains: data.id,
          },
        },
      ],
    },
  })
  if (yachts.totalDocs > 0) {
    return false
  }
  const charters = await req.payload.count({
    collection: 'charters',
    where: {
      or: [
        {
          'photos.featured': {
            equals: data.id,
          },
        },
        {
          'photos.gallery': {
            contains: data.id,
          },
        },
      ],
    },
  })
  if (charters.totalDocs > 0) {
    return false
  }

  const articles = await req.payload.count({
    collection: 'articles',
    where: {
      image: {
        equals: data.id,
      },
    },
  })
  if (articles.totalDocs > 0) {
    return false
  }

  const users = await req.payload.count({
    collection: 'users',
    where: {
      avatar: {
        equals: data.id,
      },
    },
  })
  if (users.totalDocs > 0) {
    return false
  }

  const destinations = await req.payload.count({
    collection: 'destinations',
    where: {
      image: {
        equals: data.id,
      },
    },
  })
  if (destinations.totalDocs > 0) {
    return false
  }

  return true
}
