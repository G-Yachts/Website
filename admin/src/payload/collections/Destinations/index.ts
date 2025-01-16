import type { CollectionConfig } from 'payload/types'

import { anyone } from '../../access/anyone'
import { users } from '../../access/users'
import { CustomCollectionList } from '../../components/CustomOrder/list'
import mountSlug from '../../utilities/mountSlug'
import { indexField } from '../shared/indexField'
import { seoField } from '../shared/seo'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  labels: {
    singular: {
      en: 'Destination',
      fr: 'Destination',
    },
    plural: {
      en: 'Destinations',
      fr: 'Destinations',
    },
  },
  admin: {
    useAsTitle: 'destination',
    defaultColumns: ['destination', 'region', 'country'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_FRONTEND_URL}/destinations/${doc?.id}`
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
        mountSlug({ name: doc.destination, id: doc.id, operation, collection: 'destinations' }),
    ],
  },
  versions: false,
  access: {
    read: anyone,
    create: users,
    update: users,
    delete: users,
  },
  fields: [
    {
      name: 'destination',
      label: {
        en: 'Destination',
        fr: 'Destination',
      },
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      index: true,
      unique: true,
      defaultValue: '',
      admin: {
        readOnly: true,
      },
      // hooks: {
      //   beforeValidate: [mountSlug(fieldToUse)],
      // },
    },
    {
      name: 'country',
      label: {
        en: 'Country',
        fr: 'Pays',
      },
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'region',
      label: {
        en: 'Region',
        fr: 'Région',
      },
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'continent',
      label: {
        en: 'Continent',
        fr: 'Continent',
      },
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'photos',
      label: {
        en: 'Photos',
        fr: 'Photos',
      },
      type: 'group',
      fields: [
        {
          name: 'featured',
          label: {
            en: 'Featured Photo',
            fr: 'Photo en vedette',
          },
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'destinationPhoto',
          label: {
            en: 'Destination Photo',
            fr: 'Photo de destination',
          },
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      label: {
        en: 'Description',
        fr: 'Description',
      },
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'info',
      label: {
        en: 'Info',
        fr: 'Info',
      },
      type: 'group',
      fields: [
        {
          name: 'bestTimeToVisit',
          label: {
            en: 'Best Time to Visit',
            fr: 'Meilleur moment pour visiter',
          },
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'languages',
          label: {
            en: 'Languages',
            fr: 'Langues',
          },
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'gettingThere',
          label: {
            en: 'Getting There',
            fr: 'Comment y aller',
          },
          type: 'textarea',
          required: true,
          localized: true,
        },
        {
          name: 'currency',
          label: {
            en: 'Currency',
            fr: 'Devise',
          },
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'coordinates',
      label: {
        en: 'Coordinates',
        fr: 'Coordonnées',
      },
      type: 'point',
      required: false,
      validate: val => {
        if (!val) return true
        if (val && val.length !== 2) return 'Invalid coordinates, must be an array of 2 numbers'
        if ((val[0] == '' || val[0] == null) && (val[1] == '' || val[1] == null)) {
          val = [0, 0]
          return val
        }
        if (!Number.isFinite(val[0]) || !Number.isFinite(val[1]))
          return 'Invalid coordinates, must be numbers'
        if (Math.abs(val[0]) > 90 && Math.abs(val[1]) > 180)
          return 'Invalid coordinates, must be within range'
        return true
      },
      hooks: {
        beforeChange: [
          ({ value }) => {
            if ((value[0] == '' || value[0] == null) && (value[1] == '' || value[1] == null)) {
              value = null
              return value
            }
            return value
          },
        ],
      },
    },
    seoField,
    indexField,
  ],
}
