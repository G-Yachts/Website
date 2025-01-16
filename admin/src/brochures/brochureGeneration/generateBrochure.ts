import { Chromiumly, PDFEngines, PdfFormat } from 'chromiumly'
import payload from 'payload'
import { TypeWithID } from 'payload/types'
import puppeteer from 'puppeteer'

import type { Charter, NewConstruction, Yacht } from '../../payload/payload-types'
import { generateBrochureDetailsPage } from './pages/detail'
import { generateBrochureLastPage } from './pages/end'
import { generateBrochureFirstPage } from './pages/first'
import { generateBrochurePhotoPage } from './pages/photo'

Chromiumly.configure({ endpoint: process.env.GOTENBERG_ENDPOINT })

export const generateBrochure = async <T extends Yacht | Charter | NewConstruction>(
  id: string,
  type: 'yachts' | 'charters' | 'new-constructions',
): Promise<Buffer> => {
  const data: T = (await payload.findByID({
    collection: type,
    id: id,
    depth: 5,
    locale: 'en',
  })) as T

  if (!data) {
    return null
  }

  if (data.photos.gallery.length === 0 || !data.photos.featured) {
    payload.logger.error(`No photos found for ${type} with id ${id}, skipping brochure generation`)
    return null
  }

  // Generate brochure
  const firstPage = generateBrochureFirstPage(data)
  const secondPage = generateBrochureDetailsPage(data)
  const imagePages = []
  for (let i = 0; i < data.photos.gallery.length; i++) {
    imagePages.push(generateBrochurePhotoPage(data, i))
  }
  const lastPage = generateBrochureLastPage(data)

  const allPages = [firstPage, secondPage, ...imagePages, lastPage]

  // Launch a headless browser
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()

  const pdfs = []
  for (let i = 0; i < allPages.length; i++) {
    await page.setContent(allPages[i], { waitUntil: ['load', 'networkidle0'] })
    await page.setViewport({ width: 1920, height: 1080 })
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      displayHeaderFooter: false,
      // This number is a bit of a magic number, but it seems to work well
      scale: 0.9,
    })

    pdfs.push(pdfBuffer)
  }

  // Close the browser
  await browser.close()

  // Combine all PDFs into one
  const finalPdf = await PDFEngines.merge({
    files: pdfs,
    metadata: {
      title: `Brochure - ${data.name}`,
    },
    pdfUA: false,
  })

  return finalPdf
}
