import React from 'react'
import { toast } from 'react-toastify'
import { Button } from 'payload/components'
import { reduceFieldsToValues, useAllFormFields } from 'payload/components/forms'

export default function DuplicateToCharter() {
  const [fields, dispatchFields] = useAllFormFields()
  const formData = reduceFieldsToValues(fields, true)

  const duplicateToCharter = async () => {
    try {
      const result = await fetch('/api/charters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: {
            low: 0,
            high: 0,
          },
        }),
        credentials: 'include',
      })
      if (!result.ok) throw new Error('Failed to duplicate to charter')
      const data = await result.json()
      window.location.href = `/admin/collections/charters/${data.doc.id}` as string
      toast.success('Successfully duplicated to charter')
    } catch (err) {
      console.error(err)
      toast.error('Failed to duplicate to charter')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>Clicking this button will duplicate this yacht to a charter</span>
      <Button size="small" buttonStyle="primary" onClick={duplicateToCharter}>
        Duplicate to Charter
      </Button>
    </div>
  )
}
