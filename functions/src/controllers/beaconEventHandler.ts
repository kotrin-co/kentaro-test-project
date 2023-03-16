import { BeaconEvent } from '@line/bot-sdk'
import { client } from '../index'

const beaconEventHandler = async (event: BeaconEvent): Promise<void> => {
  const { replyToken } = event
  await client.replyMessage(replyToken, {
    type: 'text',
    text: 'ただいまビーコンってます！！',
  })
}

export default beaconEventHandler
