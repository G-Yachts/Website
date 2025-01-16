import type { CollectionConfig } from 'payload/types'
import { Field } from 'payload/types'

import { users } from '../../access/users'
import Label from '../Messages/components/label'
import Status from '../Messages/components/status'
import { sharedYachtAndCharterFields } from './sharedFields'

export const ArchivedCustomers: CollectionConfig = {
  slug: 'archived-customers',
  labels: {
    singular: {
      en: 'Archived Customer',
      fr: 'Client archivé',
    },
    plural: {
      en: 'Archived Customers',
      fr: 'Clients archivés',
    },
  },
  admin: {
    useAsTitle: 'name',
    hideAPIURL: true,
    defaultColumns: ['name', 'email', 'status', 'type'],
  },
  access: {
    // TODO: Update access control
    read: users,
    create: users,
    update: users,
    delete: users,
  },
  fields: [
    {
      type: 'date',
      name: 'closureDate',
      label: {
        en: 'Closure Date',
        fr: 'Date de fermeture',
      },
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'text',
      name: 'name',
      label: {
        en: 'Name',
        fr: 'Nom',
      },
      required: true,
      admin: {
        readOnly: true,
        components: {
          Field: Label,
        },
      },
    },
    {
      type: 'email',
      name: 'email',
      label: {
        en: 'Email',
        fr: 'Email',
      },
      required: true,
      admin: {
        readOnly: true,
        components: {
          Field: Label,
        },
      },
    },
    {
      type: 'text',
      name: 'tel',
      label: {
        en: 'Telephone',
        fr: 'Téléphone',
      },
      required: false,
      admin: {
        readOnly: true,
        components: {
          Field: Label,
        },
      },
    },
    {
      type: 'textarea',
      name: 'message',
      label: {
        en: 'Message',
        fr: 'Message',
      },
      required: true,
      admin: {
        readOnly: true,
        components: {
          Field: Label,
        },
      },
    },
    {
      type: 'text',
      name: 'page',
      label: {
        en: 'Sent from page',
        fr: 'Envoyé depuis la page',
      },
      admin: {
        readOnly: true,
        components: {
          Field: Label,
        },
      },
    },
    {
      type: 'select',
      hasMany: false,
      name: 'status',
      label: {
        en: 'Status',
        fr: 'Statut',
      },
      options: [
        {
          label: {
            en: 'Pending',
            fr: 'En attente',
          },
          value: 'pending',
        },
        {
          label: {
            en: 'Claimed',
            fr: 'Pris en charge',
          },
          value: 'claimed',
        },
        {
          label: {
            en: 'Fulfilled',
            fr: 'Répondu',
          },
          value: 'fulfilled',
        },
      ],
      admin: {
        position: 'sidebar',
        components: {
          Field: Status,
        },
        readOnly: true,
      },
    },
    {
      type: 'relationship',
      name: 'user',
      label: {
        en: 'User',
        fr: 'Utilisateur',
      },
      relationTo: 'users',
      admin: {
        readOnly: true,
        components: {
          Field: Label,
        },
      },
    },
    {
      type: 'checkbox',
      name: 'newsletter',
      label: {
        en: 'Newsletter',
        fr: 'Newsletter',
      },
      admin: {
        readOnly: true,
        components: {
          Field: Label,
        },
      },
    },
    {
      type: 'checkbox',
      name: 'closed',
      label: {
        en: 'Closed',
        fr: 'Fermé',
      },
      admin: {
        components: {
          Field: Label,
        },
      },
    },
    {
      type: 'number',
      name: 'dealPrice',
      label: {
        en: 'Deal Price',
        fr: "Prix de l'offre",
      },
      admin: {
        components: {
          Field: Label,
        },
      },
    },
    {
      type: 'radio',
      name: 'type',
      label: {
        en: 'Type',
        fr: 'Type',
      },
      options: [
        {
          label: {
            en: 'Charter',
            fr: 'Charter',
          },
          value: 'charter',
        },
        {
          label: {
            en: 'Sale',
            fr: 'Sale',
          },
          value: 'sale',
        },
      ],
      admin: {
        components: {
          Field: Label,
        },
      },
    },
    {
      type: 'group',
      name: 'yacht',
      label: {
        en: 'Yacht',
        fr: 'Yacht',
      },
      fields: sharedYachtAndCharterFields('yacht'),
      defaultValue: {},
      admin: {
        readOnly: true,
        condition: (data, _, { user }) => data.type === 'sale',
      },
    },
    {
      type: 'group',
      name: 'charter',
      label: {
        en: 'Charter',
        fr: 'Charter',
      },
      fields: sharedYachtAndCharterFields('charter'),
      defaultValue: {},
      admin: {
        readOnly: true,
        condition: (data, _, { user }) => data.type === 'charter',
      },
    },
    {
      type: 'group',
      name: 'charterDates',
      label: {
        en: 'Charter Dates',
        fr: 'Dates de la charte',
      },
      admin: {
        condition: (data, _, { user }) => data.type === 'charter',
      },
      fields: [
        {
          type: 'date',
          name: 'from',
          label: {
            en: 'From',
            fr: 'De',
          },
          required: false,
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
            readOnly: true,
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
            readOnly: true,
          },
          required: false,
        },
      ],
    },
  ],
}
