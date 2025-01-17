import dotenv from 'dotenv'
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

  app.listen(PORT, async () => {
    payload.logger.info(`Server started`)
  })
}

start()
