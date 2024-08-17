import type { Field } from 'payload/types'
import BrochureComponent from './brochureComponent'
import BulkUpload from '../../components/bulkUpload'

export const yachtsAndCharterCommonFields = (type: 'charter' | 'yacht'): Field[] => [
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
      en: 'Model',
      fr: 'Modèle',
    },
    name: 'model',
    type: 'text',
    required: false,
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
          },
          {
            name: 'high',
            type: 'number',
            label: {
              en: 'High season',
              fr: 'Haute saison',
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
        required: true,
      },
  {
    label: {
      en: 'LOA',
      fr: 'Longueur hors tout',
    },
    name: 'LOA',
    type: 'number',
    required: true,
  },
  {
    label: {
      en: 'Beam',
      fr: 'Faisceau',
    },
    name: 'beam',
    type: 'number',
    required: true,
  },
  {
    label: {
      en: 'Broker',
      fr: 'Courtier',
    },
    name: 'broker',
    type: 'relationship',
    required: false,
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
    required: true,
  },
  {
    label: {
      en: 'Category',
      fr: 'Catégorie',
    },
    name: 'category',
    type: 'select',
    required: true,
    options: [
      {
        label: {
          en: 'Motor',
          fr: 'Moteur',
        },
        value: 'motor',
      },
      {
        label: {
          en: 'Sail',
          fr: 'Voile',
        },
        value: 'sail',
      },
    ],
  },
  {
    label: {
      en: 'City',
      fr: 'Ville',
    },
    name: 'city',
    type: 'text',
    required: false,
  },
  {
    label: {
      en: 'Continent',
      fr: 'Continent',
    },
    name: 'continent',
    type: 'text',
    required: false,
  },
  {
    label: {
      en: 'Country',
      fr: 'Pays',
    },
    name: 'country',
    type: 'text',
    required: false,
  },
  {
    label: {
      en: 'Cruising',
      fr: 'Croisière',
    },
    name: 'cruising',
    type: 'checkbox',
    required: true,
  },
  {
    label: {
      en: 'Crypto',
      fr: 'Crypto',
    },
    name: 'crypto',
    type: 'checkbox',
    required: true,
  },
  {
    label: {
      en: 'Length',
      fr: 'Longueur',
    },
    name: 'length',
    type: 'number',
    required: true,
  },
  {
    label: {
      en: 'State',
      fr: 'État',
    },
    name: 'state',
    type: 'text',
    required: false,
  },
  {
    label: {
      en: 'Material',
      fr: 'Matériel',
    },
    name: 'material',
    type: 'text',
    required: true,
    localized: true,
  },
  {
    label: {
      en: 'Max Draft',
      fr: "Tirant d'eau max",
    },
    name: 'maxDraft',
    type: 'number',
    required: true,
  },
  {
    label: {
      en: 'Min Draft',
      fr: "Tirant d'eau min",
    },
    name: 'minDraft',
    type: 'number',
    required: false,
  },
  {
    label: {
      en: 'Region',
      fr: 'Région',
    },
    name: 'region',
    type: 'text',
    required: false,
  },
  {
    label: {
      en: 'Rooms',
      fr: 'Chambres',
    },
    name: 'rooms',
    type: 'number',
    required: true,
  },
  {
    label: {
      en: 'Sleeps',
      fr: 'Dort',
    },
    name: 'sleeps',
    type: 'number',
    required: true,
  },
  {
    label: {
      en: 'Subcategory',
      fr: 'Sous-catégorie',
    },
    name: 'subcategory',
    type: 'text',
    required: false,
  },
  {
    label: {
      en: 'Tonnage',
      fr: 'Tonnage',
    },
    name: 'tonnage',
    type: 'number',
    required: true,
  },
  {
    label: {
      en: 'Year Built',
      fr: 'Année de construction',
    },
    name: 'yearBuilt',
    type: 'number',
    required: true,
  },
  {
    label: {
      en: 'Year Model',
      fr: "Modèle de l'année",
    },
    name: 'yearModel',
    type: 'number',
    required: true,
  },
  {
    label: {
      en: 'Featured',
      fr: 'En vedette',
    },
    name: 'featured',
    type: 'checkbox',
    required: true,
  },
  {
    label: {
      en: 'Key Features',
      fr: 'Caractéristiques clés',
    },
    name: 'keyFeatures',
    type: 'select',
    hasMany: true,
    required: true,
    defaultValue: [],
    options: [
      'price',
      'LOA',
      'beam',
      'builder',
      'category',
      'crusing',
      'crypto',
      'length',
      'maxDraft',
      'minDraft',
      'rooms',
      'sleeps',
      'subcategory',
      'tonnage',
      'yearBuilt',
      'yearModel',
    ],
  },
  {
    type: 'select',
    hasMany: false,
    name: 'etiquette',
    label: {
      en: 'Etiquette',
      fr: 'Etiquette',
    },
    required: false,
    options: [
      {
        label: {
          en: 'New',
          fr: 'Nouveau',
        },
        value: 'new',
      },
      {
        label: {
          en: 'Exclusive',
          fr: 'Exclusif',
        },
        value: 'exclusive',
      },
      {
        label: {
          en: 'Sold',
          fr: 'Vendu',
        },
        value: 'sold',
      },
    ],
  },
  {
    label: {
      en: 'Photos',
      fr: 'Photos',
    },
    name: 'photos',
    type: 'group',
    fields: [
      {
        label: {
          en: 'Featured',
          fr: 'En vedette',
        },
        name: 'featured',
        type: 'upload',
        relationTo: 'media',
        required: true,
      },
      {
        type: 'ui',
        admin: {
          components: {
            Field: BulkUpload,
          },
        },
        name: 'bulk-upload',
      },
      {
        label: {
          en: 'Gallery',
          fr: 'Galerie',
        },
        name: 'gallery',
        type: 'array',
        fields: [
          {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
          },
        ],
      },
    ],
  },
  {
    type: 'textarea',
    name: 'description',
    label: {
      en: 'Description',
      fr: 'Description',
    },
    required: false,
    localized: true,
  },
  {
    type: 'relationship',
    relationTo: 'media',
    name: 'brochure',
    admin: {
      components: {
        Field: BrochureComponent,
      },
    },
  },
  {
    type: 'number',
    name: 'clicks',
    admin: {
      readOnly: true,
    },
    defaultValue: 0,
    label: {
      en: 'Clicks',
      fr: 'Clics',
    },
  },
]
