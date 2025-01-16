import React from 'react'
import { toast } from 'react-toastify'
import { Button } from 'payload/components'
import { reduceFieldsToValues, useAllFormFields } from 'payload/components/forms'

export default function DuplicateToSales() {
  const [fields, dispatchFields] = useAllFormFields()
  const formData = reduceFieldsToValues(fields, true)

  const duplicateToSales = async () => {
    try {
      const result = await fetch('/api/yachts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: 0,
        }),
        credentials: 'include',
      })
      if (!result.ok) throw new Error('Failed to duplicate to sales')
      const data = await result.json()
      window.location.href = `/admin/collections/yachts/${data.doc.id}` as string
      toast.success('Successfully duplicated to sales')
    } catch (err) {
      console.error(err)
      toast.error('Failed to duplicate to sales')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>Clicking this button will duplicate this yacht to sales</span>
      <Button size="small" buttonStyle="primary" onClick={duplicateToSales}>
        Duplicate to Sales
      </Button>
    </div>
  )
}
