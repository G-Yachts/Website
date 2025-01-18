import type { GlobalConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { users } from '../../access/users'

const ExchangeRates: GlobalConfig = {
  slug: 'exchange-rates',
  admin: {
    hidden: true,
  },
  access: {
    read: users,
    update: admins,
  },
  fields: [
    {
      name: 'usd',
      type: 'number',
    },
    {
      name: 'gbp',
      type: 'number',
    },
    {
      name: 'jpy',
      type: 'number',
    },
  ],
}

export default ExchangeRates
