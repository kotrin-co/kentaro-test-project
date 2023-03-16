import * as functions from 'firebase-functions'
import * as express from 'express'
import { Application, Request, Response } from 'express'
import { ClientConfig, Client, middleware, MiddlewareConfig, WebhookEvent } from '@line/bot-sdk'
import * as dotenv from 'dotenv'
import beaconEventHandler from './controllers/beaconEventHandler'

dotenv.config()

const app: Application = express()

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET,
}
export const client = new Client(clientConfig)

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET || '',
}

app.post('/hook', middleware(middlewareConfig), async (req: Request, res: Response): Promise<void> => {
  const events: WebhookEvent[] = req.body.events
  console.log('events=>', events)

  res.status(200).end()

  await Promise.all(
    events.map(async (event: WebhookEvent): Promise<void> => {
      try {
        switch (event.type) {
          case 'beacon':
            await beaconEventHandler(event)
            break
        }
      } catch (error) {
        console.log(error)
      }
    })
  )
})

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'app') {
  exports.app = functions.region('asia-northeast1').https.onRequest(app)
}
