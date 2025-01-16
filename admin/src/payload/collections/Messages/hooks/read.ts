import type { Access, AccessArgs, AccessResult } from 'payload/config'
import type { PayloadRequest } from 'payload/types'

import type { Message, User } from '../../../payload-types'
import { checkRole } from '../../Users/checkRole'

interface MessagesAccessArgs extends AccessArgs {
  data: Message
  req: PayloadRequest & { user: User }
}

export const assignedOrUnclaimed: Access = ({ req, data }: MessagesAccessArgs): AccessResult => {
  // Admins can read all messages
  if (checkRole(['admin'], req.user)) return true

  // Users can only read their own messages and unclaimed messages
  return {
    or: [
      {
        status: {
          equals: 'pending',
        },
      },
      {
        user: {
          equals: req.user.id,
        },
      },
    ],
  }
}
