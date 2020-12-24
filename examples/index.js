const Buffer = require('safe-buffer').Buffer
const Wallet = require('../src')

const seed = '81050accd71d774a23dfdc90d0e8a817805bee4fc0cb073e24cfd17c186a930dd62d8a588416e98aa046e982eedc6e4382c9ee68e6d78ff2c346b4f8efc7fbfa'

console.log('>>> seed:', seed)

const rootWallet = new Wallet(Buffer.from(seed, 'hex'))

for (let i = 0; i < 3; i++) {
  const wallet = rootWallet.derive(i)
  console.log('>>> wallet #' + i + ':', wallet)
  // console.log(wallet.hdKey.privateKey.toString('hex'))
  // console.log(wallet.hdKey.publicKey.toString('hex'))
  // console.log(wallet.address)
}