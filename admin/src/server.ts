import dotenv from 'dotenv'
import cron from 'node-cron'
import path from 'path'

// This file is used to replace `server.ts` when ejecting i.e. `yarn eject`
// See `../eject.ts` for exact details on how this file is used
// See `./README.md#eject` for more information

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import express from 'express'
import payload from 'payload'

import { getBrochure } from './brochures/getBrochure'
import { ExchangeRate } from './payload/payload-types'

const app = express()
const PORT = process.env.PAYLOAD_PORT || 3000

// Redirect root to the admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

app.get('/brochure/:id', getBrochure)

const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  const updateExchangeRates = async (): Promise<ExchangeRate> => {
    try {
      const getRate = async (symbol: 'EURUSD' | 'EURGBP' | 'EURJPY'): Promise<number> =>
        await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}&outputSize=compact`,
        )
          .then(res => res.json())
          .then(data => {
            const timeSeries = data['Time Series (Daily)'],
              firstEntry = Object.values(timeSeries)[0] as { '4. close': string }
            return parseFloat(firstEntry['4. close'])
          })

      return await payload.updateGlobal({
        slug: 'exchange-rates',
        data: {
          usd: await getRate('EURUSD'),
          gbp: await getRate('EURGBP'),
          jpy: await getRate('EURJPY'),
        },
      })
    } catch (err: unknown) {
      console.error(err)
    }
  }

  await updateExchangeRates()

  cron.schedule('0 0 * * *', async () => await updateExchangeRates())

  app.listen(PORT, async () => {
    payload.logger.info(`Server started`)
  })
}

start()
