import React, { useMemo } from 'react'
import { Button } from 'payload/components'
import { useForm, useFormFields } from 'payload/components/forms'
import { useAuth } from 'payload/components/utilities'
import { User } from 'payload/dist/auth'

export default function Claim({ path, validate }) {
  const userField = useFormFields(([fields, dispatch]) => fields.user)
  const statusField = useFormFields(([fields, dispatch]) => fields.status)
  const { user } = useAuth<User>()
  const form = useForm()

  const claim = async () => {
    userField.value = user.id
    statusField.value = 'claimed'

    // Save the form
    await form.submit()
  }
  const unclaim = async () => {
    userField.value = null
    statusField.value = 'pending'

    // Save the form
    await form.submit()
  }

  const claimed = useMemo(() => userField.value === user.id, [userField.value, user.id])

  if (!claimed)
    return (
      <div
        key={'claim'}
        style={{
          width: '100%',
        }}
      >
        <span
          style={{
            display: 'block',
          }}
        >
          This message is unclaimed, click the button below to claim it
        </span>
        <Button size="medium" buttonStyle="primary" onClick={claim}>
          Claim
        </Button>
      </div>
    )
  else
    return (
      <div
        key={'unclaim'}
        style={{
          width: '100%',
        }}
      >
        <span
          style={{
            display: 'block',
          }}
        >
          This message is claimed by you, click the button below to unclaim it
        </span>
        <Button size="small" buttonStyle="secondary" onClick={unclaim}>
          Unclaim
        </Button>
      </div>
    )
}
