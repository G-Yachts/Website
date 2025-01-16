import React from 'react'
import { Label, useField } from 'payload/components/forms'
import { useLocale } from 'payload/components/utilities'

export default function LabelComponent({ path, label, type }) {
  const { code } = useLocale()
  const {
    value,
  }: {
    value: string | boolean
  } = useField({
    path,
  })
  return (
    <span style={{ display: 'block' }}>
      {label[code] || label.en}:
      <i style={{ marginLeft: '0.5rem' }}>
        <b>{type === 'checkbox' ? (value == true ? 'Yes' : 'No') : value || 'Unknown'}</b>
      </i>
    </span>
  )
}
