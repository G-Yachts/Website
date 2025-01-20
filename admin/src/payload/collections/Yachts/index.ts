import type { CollectionConfig } from 'payload/types'

import { anyone } from '../../access/anyone'
import { users } from '../../access/users'
import { CustomCollectionList } from '../../components/CustomOrder/list'
import mountSlug from '../../utilities/mountSlug'
import { indexField } from '../shared/indexField'
import { seoField } from '../shared/seo'
import { yachtsAndCharterCommonFields } from '../shared/YachtAndCharterFields'
import DuplicateToCharter from './components/duplicate'

export const Yachts: CollectionConfig = {
  slug: 'yachts',
  labels: {
    singular: {
      en: 'Yacht',
      fr: 'Yacht',
    },
    plural: {
      en: 'Yachts',
      fr: 'Yachts',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['model', 'price', 'region'], // Title column is always shown
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_FRONTEND_URL}/yacht/${doc?.id}`
    },
    hideAPIURL: true,
    components: {
      views: {
        List: {
          Component: props =>
            CustomCollectionList({
              ...props,
              columns: props.collection.admin.defaultColumns,
            } as any),
        },
      },
    },
  },
  hooks: {
    afterChange: [
      ({ doc, operation }) =>
        mountSlug({ name: doc.name, id: doc.id, operation, collection: 'yachts' }),
    ],
  },
  versions: false,
  access: {
    read: users,
    create: users,
    update: users,
    delete: users,
  },
  fields: [
    ...yachtsAndCharterCommonFields('yacht'),
    seoField,
    {
      label: {
        en: 'Similar Sales',
        fr: 'Ventes similaires',
      },
      name: 'similar',
      type: 'relationship',
      required: false,
      relationTo: 'yachts',
      hasMany: true,
    },
    {
      type: 'ui',
      name: 'duplicateToCharter',
      label: {
        en: 'Duplicate to Charter',
        fr: 'Dupliquer en Charter',
      },
      admin: {
        components: {
          Field: () => DuplicateToCharter(),
        },
        position: 'sidebar',
      },
    },
    indexField,
  ],
}
