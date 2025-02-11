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
        records: 6000,
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
    model: apiResponse.Model || '',
    price: apiResponse.AskingPrice || 0,
    LOA: apiResponse.LOAMeters || 0,
    beam: apiResponse.BeamMeters || 0,
    broker: '',
    builder: apiResponse.BuilderName || '',
    city: apiResponse.City || '',
    continent: apiResponse.LocationSubRegion || '',
    country: apiResponse.Country || '',
    cruising: apiResponse.Cruising || false,
    crypto: apiResponse.AcceptsCrypto || false,
    length: apiResponse.Length || 0,
    state: apiResponse.LocationState || '',
    material: apiResponse.HullMaterial || '',
    maxDraft: apiResponse.DraftMaxMeters || 0,
    minDraft: apiResponse.DraftMinMeters,
    region: apiResponse.RegionID || '',
    rooms: apiResponse.StateRooms || 0,
    sleeps: apiResponse.Sleeps || 0,
    subcategory: apiResponse.MainCategoryText || '',
    tonnage: apiResponse.GrossTonnage || 0,
    yearBuilt: apiResponse.YearBuilt || 0,
    yearRefit: apiResponse.YearFit || '',
    photos: {
      featured: apiResponse.MainPhotoMedURL as string,
      gallery: [{ image: apiResponse.MainPhotoMedURL as string }],
    },
    description: apiResponse.BrokerTeaser || '',
  }

  return yacht as Yacht
}
