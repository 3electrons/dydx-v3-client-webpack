

function test() 
{ 
  console.log("Hello world") 
}
test()

const HTTP_HOST = 'https://api.dydx.exchange'
const WS_HOST = 'wss://api.dydx.exchange/v3/ws'

// NOTE: Set up web3 however your prefer to authenticate to your Ethereum account.


ETHEREUM_ADDRESS = '0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b'

web3 = new Web3()
web3.eth.accounts.wallet.add(ETHEREUM_PRIVATE_KEY)

debugger 


;((async () => {

  client = new DydxClient(HTTP_HOST, { web3 })
  const apiCreds = await client.onboarding.recoverDefaultApiCredentials(ETHEREUM_ADDRESS)
  client.apiKeyCredentials = apiCreds

  const timestamp = new Date().toISOString()
  const signature = client.private.sign({
    requestPath: '/ws/accounts',
    method: 'GET',
    isoTimestamp: timestamp,
  })
  const msg = {
    type: 'subscribe',
    channel: 'v3_accounts',
    accountNumber: '0',
    apiKey: apiCreds.key,
    signature,
    timestamp,
    passphrase: apiCreds.passphrase
  }

  const ws = new WebSocket(WS_HOST)

  ws.on('message', (message) => {
    console.log('<', message)
  })

  ws.on('open', () => {
    console.log('>', msg)
    ws.send(JSON.stringify(msg))
  })

  ws.on('error', (error) => {
    console.log('<', error)
  })

  ws.on('close', () => {
    console.log('Connection closed')
  })

})()).then(() => console.log('Done')).catch(console.error)