const bip39 = require('bip39')
const Wallet = require('../src')

const mnemonic = 'wagon powder humor amateur keen six alcohol priority police crouch weekend camera turkey field sport noise boss purity'

const seed = bip39.mnemonicToSeedSync(mnemonic)

// const seed = '81050accd71d774a23dfdc90d0e8a817805bee4fc0cb073e24cfd17c186a930dd62d8a588416e98aa046e982eedc6e4382c9ee68e6d78ff2c346b4f8efc7fbfa'
// console.log('seed:', seed)

const rootWallet = new Wallet(Buffer.from(seed, 'hex'))

for (let i = 0; i < 4; i++) {
  console.log(i)

  const wallet = rootWallet.derive(i)

  const privateKey = wallet.hdKey.privateKey
  const publicKey = wallet.hdKey.publicKey

  console.log('privateKey:', privateKey)
  console.log('publicKey:', publicKey)


  // console.log('wallet #' + i + ':', wallet)
  // console.log(wallet.hdKey.privateKey.toString('hex'))
  // console.log(wallet.hdKey.publicKey.toString('hex'))
  // console.log(wallet.address)
}
