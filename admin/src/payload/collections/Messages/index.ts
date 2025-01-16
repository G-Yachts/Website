import type { CollectionConfig } from 'payload/types'

import { anyone } from '../../access/anyone'
import type { Charter, Message, Yacht } from '../../payload-types'
import Claim from './components/claim'
import Label from './components/label'
import Reply from './components/reply'
import Status from './components/status'
import { assignedOrUnclaimed } from './hooks/read'
import { validateCharertDates } from './hooks/validateCharterDates'

export const Messages: CollectionConfig = {
  slug: 'messages',
  labels: {
    singular: {
      en: 'Message',
      fr: 'Message',
    },
    plural: {
      en: 'Messages',
      fr: 'Messages',
    },
  },
  admin: {
    useAsTitle: 'name',
    hideAPIURL: true,
    defaultColumns: ['name', 'email', 'status'],
  },
  access: {
    // TODO: Update access control
    read: assignedOrUnclaimed,
    create: anyone,
    update: assignedOrUnclaimed,
    delete: assignedOrUnclaimed,
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        const data = doc as Message
        if (operation === 'update' && data.closed) {
          data.status = 'fulfilled'
          let charter: Charter | null = null
          let yacht: Yacht | null = null
          if (data.type === 'charter') {
            data.yacht = null
            charter = await req.payload.findByID({
              collection: 'charters',
              id: typeof data.charter === 'string' ? data.charter : data.charter.id,
              depth: 1,
            })
          }
          if (data.type === 'sale') {
            data.charter = null
            data.charterDates = null
            yacht = await req.payload.findByID({
              collection: 'yachts',
              id: typeof data.yacht === 'string' ? data.yacht : data.yacht.id,
              depth: 1,
            })
          }
          const { id } = await req.payload.create({
            collection: 'archived-customers',
            data: {
              charterDates: data.charterDates || {},
              closureDate: new Date().toISOString(),
              dealPrice: data.dealPrice,
              email: data.email,
              message: data.message,
              name: data.name,
              page: data.page,
              status: data.status,
              tel: data.tel,
              type: data.type,
              user: data.user,
              yacht: yacht
                ? {
                    broker: typeof yacht.broker === 'string' ? yacht.broker : yacht.broker.id,
                    builder: yacht.builder,
                    model: yacht.model,
                    name: yacht.name,
                    price: yacht.price,
                    city: yacht.city,
                    continent: yacht.continent,
                    country: yacht.country,
                    region: yacht.region,
                    state: yacht.state,
                    yearBuilt: yacht.yearBuilt,
                    yearRefit: yacht.yearRefit,
                  }
                : {},
              charter: charter
                ? {
                    broker: typeof charter.broker === 'string' ? charter.broker : charter.broker.id,
                    builder: charter.builder,
                    model: charter.model,
                    name: charter.name,
                    price: charter.price,
                    city: charter.city,
                    continent: charter.continent,
                    country: charter.country,
                    region: charter.region,
                    state: charter.state,
                    yearBuilt: charter.yearBuilt,
                    yearRefit: charter.yearRefit,
                  }
                : {},
              closed: data.closed,
              newsletter: data.newsletter,
            },
          })
          if (data.type === 'charter') {
            await req.payload.update({
              collection: 'charters',
              where: {
                id: {
                  equals: charter.id,
                },
              },
              data: {
                reservations: [
                  ...charter.reservations,
                  {
                    id,
                    from: data.charterDates.from,
                    to: data.charterDates.to,
                    customerName: data.name,
                    customer: id,
                  },
                ],
              },
            })
          }
          await req.payload.delete({
            collection: 'messages',
            id: data.id,
          })
        }
      },
    ],
  },
  fields: [
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
          Field: Reply,
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
        hidden: true,
      },
    },
    // Add custom buttons to the sidebar
    {
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: Claim,
        },
        condition: (data, _, { user }) => data.closed !== true,
      },
      name: 'claim',
      label: {
        en: 'Claim',
        fr: 'Prendre en charge',
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
        position: 'sidebar',
        condition: (data, _, { user }) => data.status === 'claimed' && data.user === user.id,
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
        position: 'sidebar',
        condition: (data, _, { user }) =>
          data.status === 'claimed' && data.user === user.id && data.closed,
      },
    },
    {
      type: 'relationship',
      name: 'yacht',
      label: {
        en: 'Yacht',
        fr: 'Yacht',
      },
      relationTo: 'yachts',
      hasMany: false,
      admin: {
        condition: (data, _, { user }) =>
          data.status === 'claimed' && data.user === user.id && data.closed && data.type === 'sale',
        position: 'sidebar',
      },
    },
    {
      type: 'relationship',
      name: 'charter',
      label: {
        en: 'Charter',
        fr: 'Charter',
      },
      relationTo: 'charters',
      hasMany: false,
      admin: {
        condition: (data, _, { user }) =>
          data.status === 'claimed' &&
          data.user === user.id &&
          data.closed &&
          data.type === 'charter',
        position: 'sidebar',
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
        condition: (data, _, { user }) =>
          data.status === 'claimed' && data.user === user.id && data.closed,
        position: 'sidebar',
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
        condition: (data, _, { user }) =>
          data.status === 'claimed' &&
          data.user === user.id &&
          data.closed &&
          data.type === 'charter',
        position: 'sidebar',
      },
      fields: [
        {
          type: 'date',
          name: 'from',
          label: {
            en: 'From',
            fr: 'De',
          },
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
          },
          validate: validateCharertDates,
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
          validate: validateCharertDates,
        },
      ],
    },
  ],
}
