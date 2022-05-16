// run `node index.js` in the terminal
const {DydxClient}  = require('@dydxprotocol/v3-client')
const Web3  = require('web3');

globalThis.Web3 = Web3 
globalThis.DydxClient = DydxClient; 

console.log(globalThis)
console.log(globalThis.Web3)
console.log(globalThis.DydxClient)