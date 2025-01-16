import type { Field } from 'payload/types'

export const seoField: Field = {
  type: 'array',
  name: 'seo',
  label: {
    en: 'SEO',
    fr: 'SEO',
  },
  fields: [
    {
      type: 'text',
      name: 'value',
    },
  ],
  required: false,
}
