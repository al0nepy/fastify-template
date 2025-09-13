import { gossipsub } from '@chainsafe/libp2p-gossipsub'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { mdns } from '@libp2p/mdns'
import { webRTC } from '@libp2p/webrtc'
import { webSockets } from '@libp2p/websockets'
import { webTransport } from '@libp2p/webtransport'
import { createLibp2p, type Libp2p } from 'libp2p'

export const initializeP2PNode = async (options: { listenAddrs?: string[] }): Promise<Libp2p> => {
  const node = await createLibp2p({
    transports: [webSockets(), webRTC(), webTransport()],
    connectionEncrypters: [noise()],
    streamMuxers: [yamux()],
    peerDiscovery: [mdns()],
    services: {
      pubsub: gossipsub({
        allowPublishToZeroTopicPeers: true,
        globalSignaturePolicy: 'StrictNoSign',
      }),
      identify: () => {},
    },
    addresses: {
      listen: options.listenAddrs ?? ['/ip4/0.0.0.0/tcp/0/ws'],
    },
  })

  await node.start()
  return node
}
