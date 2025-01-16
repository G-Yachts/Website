import type { Field } from 'payload/types'

export const indexField: Field = {
  type: 'number',
  required: false,
  defaultValue: 0,
  name: 'indexField',
  admin: {
    condition: () => false,
  },
}
