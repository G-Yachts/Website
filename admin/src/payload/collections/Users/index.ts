import type { CollectionConfig } from 'payload/types'

import { isAdminOrSelf } from '../../access/adminOrSelf'
import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import { CustomCollectionList } from '../../components/CustomOrder/list'
import { indexField } from '../shared/indexField'
import { checkRole } from './checkRole'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { loginAfterCreate } from './hooks/loginAfterCreate'
import values from './values'

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: {
      en: 'User',
      fr: 'Utilisateur',
    },
    plural: {
      en: 'Users',
      fr: 'Utilisateurs',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
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
  access: {
    read: anyone,
    create: admins,
    update: isAdminOrSelf,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['user'], user),
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  auth: {
    useAPIKey: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: {
        en: 'Name',
        fr: 'Nom',
      },
    },
    {
      label: {
        en: 'Roles',
        fr: 'Rôles',
      },
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'user',
          value: 'user',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
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
      required: true,
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
          required: true,
          label: {
            en: 'Prefix',
            fr: 'Préfixe',
          },
          options: values.prefixes,
        },
        {
          name: 'number',
          type: 'text',
          required: true,
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
          required: true,
          label: {
            en: 'Platform',
            fr: 'Plateforme',
          },
        },
        {
          type: 'text',
          name: 'link',
          required: true,
          label: {
            en: 'Link',
            fr: 'Lien',
          },
        },
      ],
    },
    {
      type: 'checkbox',
      name: 'displayOnWebsite',
      label: {
        en: 'Display on website',
        fr: 'Afficher sur le site web',
      },
      defaultValue: false,
    },
    indexField,
  ],
  timestamps: true,
}

export default Users
