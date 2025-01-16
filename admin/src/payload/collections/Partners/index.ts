import type { CollectionConfig } from 'payload/types'

import { anyone } from '../../access/anyone'
import { users } from '../../access/users'
import { CustomCollectionList } from '../../components/CustomOrder/list'
import { indexField } from '../shared/indexField'
import { seoField } from '../shared/seo'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: {
    singular: {
      en: 'Partner',
      fr: 'Partenaire',
    },
    plural: {
      en: 'Partners',
      fr: 'Partenaires',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['comment', 'website'],
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
        en: 'Comment',
        fr: 'Commentaire',
      },
      name: 'comment',
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
    seoField,
    indexField,
  ],
}
