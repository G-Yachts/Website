import React from 'react'
import { Button } from 'payload/components'
import { useField } from 'payload/components/forms'

export default function Reply({ path, validate }) {
  const {
    value,
  }: {
    value: string
  } = useField({
    path: path,
  })

  return (
    <div
      key={'reply'}
      style={{
        width: '100%',
      }}
    >
      <span
        style={{
          display: 'block',
        }}
      >
        Email:{' '}
        <i style={{ marginLeft: '0.5rem' }}>
          <b>{value}</b>
        </i>
      </span>
      <span
        style={{
          display: 'block',
        }}
      >
        To reply to this message via email, click the button below
      </span>
      <Button
        size="medium"
        buttonStyle="primary"
        newTab={true}
        el={'anchor'}
        url={`mailto:${value}`}
      >
        Reply
      </Button>
    </div>
  )
}
