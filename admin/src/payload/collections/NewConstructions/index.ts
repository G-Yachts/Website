import type { CollectionConfig } from 'payload/types'

import { anyone } from '../../access/anyone'
import { users } from '../../access/users'
import { yachtsAndCharterCommonFields } from '../shared/YachtAndCharterFields'
import { seoField } from '../shared/seo'
import { deleteBrochureHook } from '../../hooks/deleteBrochure'
import { generateBrochureHook } from '../../hooks/generateBrochureHook'
import { indexField } from '../shared/indexField'
import { CustomCollectionList } from '../../components/CustomOrder/list'
import mountSlug from '../../utilities/mountSlug'

export const NewConstructions: CollectionConfig = {
  slug: 'new-constructions',
  labels: {
    singular: {
      en: 'New Construction',
      fr: 'Nouvelle construction',
    },
    plural: {
      en: 'New Constructions',
      fr: 'Nouvelles constructions',
    },
  },
  admin: {
    useAsTitle: 'name',
    hideAPIURL: true,
    defaultColumns: ['model', 'price', 'delivery'],
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
        mountSlug({ name: doc.name, id: doc.id, operation, collection: 'new-constructions' }),
    ],
    afterDelete: [({ doc, req }) => deleteBrochureHook({ doc, req })],
  },
  versions: false,
  access: {
    read: users,
    create: users,
    update: users,
    delete: users,
  },
  fields: [
    {
      type: 'text',
      name: 'delivery',
      label: {
        en: 'Delivery year',
        fr: 'Livraison année',
      },
      required: true,
    },
    ...yachtsAndCharterCommonFields('yacht'),
    seoField,
    {
      label: {
        en: 'Similar New Constructions',
        fr: 'Nouvelles Constructions similaires',
      },
      name: 'similar',
      type: 'relationship',
      required: false,
      relationTo: 'new-constructions',
      hasMany: true,
    },
    indexField,
  ],
}
