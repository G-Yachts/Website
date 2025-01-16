import type { Response } from 'express'
import type { PayloadRequest } from 'payload/types'

import type { Yacht } from '../payload-types'

export async function fetchYatcoYachts(req: PayloadRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const yachts = await fetchYachts()
  return res.json(yachts)
}

const fetchYachts = async (): Promise<Yacht[]> => {
  try {
    const response = await fetch('https://api.yatcoboss.com/api/v1/ForSale/Vessel/Search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${process.env.PAYLOAD_YATCO_API_KEY}`,
      },
      body: JSON.stringify({
        BrokerageCompany: 'g-yachts',
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch yachts')
    }

    const data = await response.json()
    const yachts = data.Results.map(convertApiResponseToYacht)
    return yachts
  } catch (err) {
    console.error(err)
  }
}

function convertApiResponseToYacht(apiResponse: any): Yacht {
  const yacht = {
    id: apiResponse.VesselID,
    name: apiResponse.VesselName,
    model: apiResponse.Model || null,
    price: apiResponse.AskingPrice,
    LOA: apiResponse.LOAMeters,
    beam: apiResponse.BeamMeters,
    broker: null as string,
    builder: apiResponse.BuilderName,
    city: apiResponse.City || null,
    continent: apiResponse.LocationSubRegion || null,
    country: apiResponse.Country || null,
    cruising: apiResponse.Cruising,
    crypto: apiResponse.AcceptsCrypto,
    length: apiResponse.Length,
    state: apiResponse.LocationState || null,
    material: apiResponse.HullMaterial,
    maxDraft: apiResponse.DraftMaxMeters,
    minDraft: apiResponse.DraftMinMeters,
    region: apiResponse.Region || null,
    rooms: apiResponse.StateRooms,
    sleeps: apiResponse.Sleeps,
    subcategory: apiResponse.MainCategoryText || null,
    tonnage: apiResponse.GrossTonnage,
    yearBuilt: apiResponse.YearBuilt,
    yearRefit: apiResponse.YearFit || null,
    photos: {
      featured: apiResponse.MainPhotoMedURL as string,
      gallery: [{ image: apiResponse.MainPhotoMedURL as string }],
    },
    description: apiResponse.BrokerTeaser || null,
  }

  return yacht as Yacht
}
