import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'

import { ArchivedCustomers } from './collections/ArchivedCustomers'
import { Articles } from './collections/Articles'
import { Brokers } from './collections/Brokers'
import Categories from './collections/Categories'
import { Charters } from './collections/Charters'
import { Destinations } from './collections/Destinations'
import { Events } from './collections/Events'
import { Media } from './collections/Media'
import { Messages } from './collections/Messages'
import { NewConstructions } from './collections/NewConstructions'
import { Partners } from './collections/Partners'
import { Recruitment } from './collections/Recruitment'
import { Shipyards } from './collections/Shipyards'
import { Sold } from './collections/Sold'
import Users from './collections/Users'
import { Yachts } from './collections/Yachts'
import ImportYachtsLink from './components/importYatcoLink'
import { customSearchHandler } from './helpers/customSearch'
import { reorderCollection } from './helpers/reorderCollection'
import { fetchYatcoYachts } from './helpers/yatcoFetch'
import { importYatcoYacht } from './helpers/yatcoImport'
import ImportYachts from './views/importYachts'

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    components: {
      views: {
        ImportYachts: {
          Component: ImportYachts,
          path: '/import-yachts',
        },
      },
      afterNavLinks: [ImportYachtsLink],
    },
    webpack: config => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          dotenv: path.resolve(__dirname, './dotenv.js'),
        },
      },
    }),
  },
  editor: slateEditor({
    admin: {
      elements: ['h1', 'h2', 'h3', 'blockquote', 'link', 'ol', 'ul', 'upload'],
    },
  }),
  db: mongooseAdapter({
    url: process.env.PAYLOAD_DATABASE_URI,
    connectOptions: {
      dbName: process.env.PAYLOAD_DATABASE_NAME,
    },
  }),
  localization: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    fallback: true,
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [
    Articles,
    Media,
    Users,
    Brokers,
    Yachts,
    Charters,
    Categories,
    Destinations,
    Events,
    Partners,
    Shipyards,
    Recruitment,
    Sold,
    NewConstructions,
    Messages,
    ArchivedCustomers,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    disablePlaygroundInProduction: true,
  },
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  endpoints: [
    {
      method: 'get',
      handler: fetchYatcoYachts,
      path: '/yatco/yachts',
    },
    {
      method: 'post',
      handler: importYatcoYacht,
      path: '/yatco/import',
    },
    {
      method: 'post',
      handler: reorderCollection,
      path: '/reorder',
    },
    {
      method: 'get',
      handler: customSearchHandler,
      path: '/search',
    },
  ],
  plugins: [],
  upload: {
    limits: {
      fileSize: 20000000, // 20MB
    },
  },
  rateLimit: {
    trustProxy: true,
    max: 5000,
  },
})
