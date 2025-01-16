import type { Response } from 'express'
import type { PayloadRequest } from 'payload/types'

export async function reorderCollection(req: PayloadRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const {
    collection,
    items,
  }: {
    collection:
      | 'yachts'
      | 'charters'
      | 'users'
      | 'shipyards'
      | 'destinations'
      | 'partners'
      | 'new-constructions'
    items: Array<{
      id: string
      indexField: number
    }>
  } = req.body

  if (!collection || !items) {
    return res.status(400).json({ message: 'Missing collection or items' })
  }
  if (!items.length) {
    return res.status(400).json({ message: 'No items to reorder' })
  }
  // Check if the collection exists
  if (!Object.keys(req.payload.collections).includes(collection)) {
    return res.status(400).json({ message: 'Collection does not exist' })
  }
  // Check if there is no item with the same id
  if (items.length !== new Set(items.map(item => item.id)).size) {
    return res.status(400).json({ message: 'Duplicate items' })
  }
  // Check if there is no item with the same index
  if (items.length !== new Set(items.map(item => item.indexField)).size) {
    return res.status(400).json({ message: 'Duplicate indexes' })
  }
  // Check if all items exist
  const allItemsExist = items.every(item =>
    req.payload.findByID({
      collection: collection,
      id: item.id,
    }),
  )
  if (!allItemsExist) {
    return res.status(400).json({ message: 'Not all items exist' })
  }

  // Reorder items
  for (const item of items) {
    // Using mongoose adapter directly to avoid hooks and also because of the bug in payload which is corupting whole MongoDB collection
    await req.payload.db.collections[collection].updateOne(
      {
        _id: item.id,
      },
      {
        $set: {
          indexField: item.indexField,
        },
      },
    )
  }

  return res.json({ message: 'Collection reordered' })
}
