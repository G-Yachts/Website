import path from 'path'
import type { CollectionConfig } from 'payload/types'

import { users } from '../access/users'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: {
      en: 'Media',
      fr: 'Média',
    },
    plural: {
      en: 'Media',
      fr: 'Médias',
    },
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt'],
    hideAPIURL: true,
  },
  versions: false,
  upload: {
    staticDir: path.resolve(__dirname, '../../../media'),
    formatOptions: {
      format: 'webp',
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: undefined,
        position: 'center',
      },
      {
        name: 'fhd',
        width: 1920,
        height: undefined,
        position: 'center',
      },
    ],
    adminThumbnail: 'thumbnail',
    resizeOptions: {
      fit: 'contain',
      position: 'center',
      background: 'rgba(0, 0, 0, 0)',
      withoutEnlargement: true,
      fastShrinkOnLoad: false,
    },
    focalPoint: false,
    mimeTypes: ['image/*', 'application/pdf'],
  },
  access: {
    read: () => true,
    create: users,
    update: users,
    delete: users,
  },
  fields: [
    {
      label: {
        en: 'Alt Text',
        fr: 'Texte alternatif',
      },
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
}
