import type { Field } from 'payload/types'

import Label from '../Messages/components/label'

export const sharedYachtAndCharterFields = (type: 'charter' | 'yacht'): Field[] => [
  {
    label: {
      en: 'Name',
      fr: 'Nom',
    },
    name: 'name',
    type: 'text',
    admin: {
      components: {
        Field: Label,
      },
    },
  },
  {
    label: {
      en: 'Model',
      fr: 'Modèle',
    },
    name: 'model',
    type: 'text',
    admin: {
      components: {
        Field: Label,
      },
    },
  },
  type === 'charter'
    ? {
        label: {
          en: 'Price',
          fr: 'Prix',
        },
        name: 'price',
        type: 'group',
        fields: [
          {
            name: 'low',
            type: 'number',
            label: {
              en: 'Low season',
              fr: 'Basse saison',
            },
            admin: {
              components: {
                Field: Label,
              },
            },
          },
          {
            name: 'high',
            type: 'number',
            label: {
              en: 'High season',
              fr: 'Haute saison',
            },
            admin: {
              components: {
                Field: Label,
              },
            },
          },
        ],
      }
    : {
        label: {
          en: 'Price',
          fr: 'Prix',
        },
        name: 'price',
        type: 'number',
        admin: {
          components: {
            Field: Label,
          },
        },
      },
  {
    label: {
      en: 'Broker',
      fr: 'Courtier',
    },
    name: 'broker',
    type: 'relationship',
    relationTo: 'users',
    hasMany: false,
  },
  {
    label: {
      en: 'Builder',
      fr: 'Constructeur',
    },
    name: 'builder',
    type: 'text',
    admin: {
      components: {
        Field: Label,
      },
    },
  },
  {
    label: {
      en: 'City',
      fr: 'Ville',
    },
    name: 'city',
    type: 'text',
    admin: {
      components: {
        Field: Label,
      },
    },
  },
  {
    label: {
      en: 'Continent',
      fr: 'Continent',
    },
    name: 'continent',
    type: 'text',
    admin: {
      components: {
        Field: Label,
      },
    },
  },
  {
    label: {
      en: 'Country',
      fr: 'Pays',
    },
    name: 'country',
    type: 'text',
    admin: {
      components: {
        Field: Label,
      },
    },
  },
  {
    label: {
      en: 'State',
      fr: 'État',
    },
    name: 'state',
    type: 'text',
    admin: {
      components: {
        Field: Label,
      },
    },
  },
  {
    label: {
      en: 'Region',
      fr: 'Région',
    },
    name: 'region',
    type: 'text',
    admin: {
      components: {
        Field: Label,
      },
    },
  },
  {
    label: {
      en: 'Year Built',
      fr: 'Année de construction',
    },
    name: 'yearBuilt',
    type: 'number',
    admin: {
      components: {
        Field: Label,
      },
    },
  },
  {
    label: {
      en: 'Refit Year',
      fr: 'Année de refonte',
    },
    name: 'yearRefit',
    type: 'number',
    required: false,
    admin: {
      components: {
        Field: Label,
      },
    },
  },
]
