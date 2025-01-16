import type { CollectionConfig } from 'payload/types'

import { anyone } from '../../access/anyone'
import { users } from '../../access/users'
import { CustomCollectionList } from '../../components/CustomOrder/list'
import mountSlug from '../../utilities/mountSlug'
import { indexField } from '../shared/indexField'
import { seoField } from '../shared/seo'
import { yachtsAndCharterCommonFields } from '../shared/YachtAndCharterFields'
import DuplicateToSales from './components/duplicate'
import LinkToCustomer from './components/linkToCustomer'

export const Charters: CollectionConfig = {
  slug: 'charters',
  labels: {
    singular: {
      en: 'Charter',
      fr: 'Charter',
    },
    plural: {
      en: 'Charters',
      fr: 'Charters',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['model', 'price', 'region'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_FRONTEND_URL}/charters/${doc?.id}`
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
  versions: false,
  access: {
    read: users,
    create: users,
    update: users,
    delete: users,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Details',
            fr: 'Détails',
          },
          fields: [
            ...yachtsAndCharterCommonFields('charter'),
            seoField,
            {
              label: {
                en: 'Similar Charters',
                fr: 'Charters similaires',
              },
              name: 'similar',
              type: 'relationship',
              required: false,
              relationTo: 'charters',
              hasMany: true,
            },
            {
              type: 'ui',
              name: 'duplicateToSales',
              label: {
                en: 'Duplicate to Sales',
                fr: 'Dupliquer en vente',
              },
              admin: {
                components: {
                  Field: () => DuplicateToSales(),
                },
                position: 'sidebar',
              },
            },
          ],
        },
        {
          label: {
            en: 'Reservations',
            fr: 'Réservations',
          },
          fields: [
            {
              type: 'array',
              name: 'reservations',
              fields: [
                {
                  type: 'date',
                  name: 'from',
                  label: {
                    en: 'From',
                    fr: 'De',
                  },
                  required: true,
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                  },
                },
                {
                  type: 'date',
                  name: 'to',
                  label: {
                    en: 'To',
                    fr: 'À',
                  },
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                  },
                },
                {
                  name: 'customerName',
                  type: 'text',
                  label: {
                    en: 'Customer',
                    fr: 'Client',
                  },
                  required: false,
                },
                {
                  name: 'customer',
                  type: 'relationship',
                  relationTo: 'archived-customers',
                  required: false,
                  admin: {
                    condition: (data, siblingData, { user }) => siblingData.customer,
                    components: {
                      Field: LinkToCustomer,
                    },
                  },
                },
              ],
              validate: val => {
                if (!val) return true
                // Ensure that the 'from' date is before the 'to' date
                for (let i = 0; i < val.length; i++) {
                  if (val[i].from >= val[i].to) {
                    return 'The "from" date must be before the "to" date'
                  }
                }

                // Check if the new reservation overlaps with any existing reservations
                for (let i = 0; i < val.length; i++) {
                  for (let j = i + 1; j < val.length; j++) {
                    if (
                      (val[i].from <= val[j].from && val[j].from <= val[i].to) ||
                      (val[i].from <= val[j].to && val[j].to <= val[i].to)
                    ) {
                      return 'Reservations cannot overlap'
                    }
                  }
                }

                return true
              },
            },
          ],
        },
      ],
    },
    indexField,
  ],
}
