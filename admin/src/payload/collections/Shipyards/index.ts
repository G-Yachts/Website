import type { CollectionConfig } from 'payload/types'

import { anyone } from '../../access/anyone'
import { users } from '../../access/users'
import { CustomCollectionList } from '../../components/CustomOrder/list'
import { indexField } from '../shared/indexField'

export const Shipyards: CollectionConfig = {
  slug: 'shipyards',
  labels: {
    singular: {
      en: 'Shipyard',
      fr: 'Chantier Naval',
    },
    plural: {
      en: 'Shipyards',
      fr: 'Chantiers Navals',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['quote', 'website'],
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
    read: anyone,
    create: users,
    update: users,
    delete: users,
  },
  fields: [
    {
      label: {
        en: 'Name',
        fr: 'Nom',
      },
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      label: {
        en: 'Quote',
        fr: 'Citation',
      },
      name: 'quote',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      label: {
        en: 'Website',
        fr: 'Site Web',
      },
      name: 'website',
      type: 'text',
      required: true,
    },
    {
      label: {
        en: 'Logo',
        fr: 'Logo',
      },
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      label: {
        en: 'Banner',
        fr: 'Bannière',
      },
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    indexField,
  ],
}
