import type { CollectionConfig } from 'payload/types'

import { users } from '../access/users'

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: {
      en: 'Category',
      fr: 'Catégorie',
    },
    plural: {
      en: 'Categories',
      fr: 'Catégories',
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title'],
    hideAPIURL: true,
  },
  access: {
    read: () => true,
    create: users,
    update: users,
    delete: users,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: {
        en: 'Title',
        fr: 'Titre',
      },
      localized: true,
    },
  ],
}

export default Categories
