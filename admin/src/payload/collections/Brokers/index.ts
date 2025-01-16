import type { CollectionConfig } from 'payload/types'

import { anyone } from '../../access/anyone'
import { users } from '../../access/users'
import { seoField } from '../shared/seo'
import values from '../Users/values'

export const Brokers: CollectionConfig = {
  slug: 'sell-brokers',
  labels: {
    singular: {
      en: 'Sell Broker',
      fr: 'Courtier de vente',
    },
    plural: {
      en: 'Sell Brokers',
      fr: 'Courtiers de vente',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['position', 'email'],
    hideAPIURL: true,
  },
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
        en: 'Position',
        fr: 'Position',
      },
      name: 'position',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      label: {
        en: 'Email',
        fr: 'Email',
      },
      name: 'email',
      type: 'email',
      required: false,
    },
    {
      label: {
        en: 'Profile picture',
        fr: 'Photo de profil',
      },
      name: 'picture',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      label: {
        en: 'Phone numbers',
        fr: 'Numéros de téléphone',
      },
      type: 'array',
      name: 'phones',
      fields: [
        {
          name: 'prefix',
          type: 'select',
          hasMany: false,
          required: false,
          label: {
            en: 'Prefix',
            fr: 'Préfixe',
          },
          options: values.prefixes,
        },
        {
          name: 'number',
          type: 'text',
          required: false,
          label: {
            en: 'Number',
            fr: 'Numéro',
          },
        },
      ],
    },
    {
      label: {
        en: 'Languages',
        fr: 'Langues',
      },
      type: 'select',
      hasMany: true,
      name: 'langs',
      options: values.langs,
    },
    {
      label: {
        en: 'Social profiles',
        fr: 'Profils sociaux',
      },
      type: 'array',
      name: 'socials',
      fields: [
        {
          type: 'select',
          hasMany: false,
          name: 'platform',
          options: ['WhatsApp', 'Facebook', 'LinkedIn'],
          required: false,
          label: {
            en: 'Platform',
            fr: 'Plateforme',
          },
        },
        {
          type: 'text',
          name: 'link',
          required: false,
          label: {
            en: 'Link',
            fr: 'Lien',
          },
        },
      ],
    },
    seoField,
  ],
}
