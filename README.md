@voken/hd-wallet
================

Voken HD Wallet(s), derive from a seed.

Voken was listed in [SLIP-0044][SLIP-0044], with `678` as the index value.

[SLIP-0044]: https://github.com/satoshilabs/slips/blob/master/slip-0044.md

Its `rootPath` of [BIP44][BIP44] is `m/44'/678'/0'/0/`.


Install
-------

```
npm i --save @voken/hd-wallet
```

for yarn:

```
yarn add @voken/hd-wallet
```


API
---

### new Wallet(seed)

Create a `rootWallet`.

```javascript
const Wallet = require('@voken/hd-wallet')

const rootWallet = new Wallet(seed)
```

`seed` must be a [Buffer](https://nodejs.org/api/buffer.html)


### wallet = rootWallet.derive(i)

Derive a wallet from the `rootWallet`.

`i` should be a number (integer). It returns an `object` like:

```javascript
const wallet = rootWallet.derive(0)
console.log(wallet)
// => {
//     versions: { private: 76066276, public: 76067358 },
//     depth: 5,
//     index: 0,
//     _privateKey: <Buffer d9 14 f8 d8 c8 d3 03 53 7f 01 51 bf c2 50 c4 82 ed 3f 16 d2 bd 9f c6 6c 34 90 75 06 6c 91 ea 89>,
//     _publicKey: <Buffer 03 ef c7 fd 29 0d 4c bc 28 47 70 c7 ab 00 91 07 1a 10 73 ed 3b f8 55 74 20 23 9f 7c 70 e1 09 47 2d>,
//     chainCode: <Buffer df d9 df 20 57 8a e6 e6 da 42 1d 86 da 23 f5 83 5b 3c 25 66 da aa 5c 8b 50 09 7b ee 12 8f ea a9>,
//     _fingerprint: 77754819,
//     parentFingerprint: 3846648710,
//     _identifier: <Buffer 04 a2 71 c3 79 2b 83 dc d6 b0 d8 ef 15 78 00 a5 3e d2 8d d6>
//   },
//   address: 'vJfNbKgC0GYaAY2n6k8f6qDXFDDDUj8K7'
// }
```

Show the `privateKey`/`publicKey`/`address`:

```javascript
console.log(wallet.hdKey.privateKey.toString('hex'))
// d914f8d8c8d303537f0151bfc250c482ed3f16d2bd9fc66c349075066c91ea89

console.log(wallet.hdKey.publicKey.toString('hex'))
// 03efc7fd290d4cbc284770c7ab0091071a1073ed3bf8557420239f7c70e109472d

console.log(wallet.address)
// vJfNbKgC0GYaAY2n6k8f6qDXFDDDUj8K7
```

[BIP44]: https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki


Example
-------

```javascript
const Buffer = require('safe-buffer').Buffer
const Wallet = require('@voken/hd-wallet')

const seed = '81050accd71d774a23dfdc90d0e8a817805bee4fc0cb073e24cfd17c186a930dd62d8a588416e98aa046e982eedc6e4382c9ee68e6d78ff2c346b4f8efc7fbfa'

console.log('seed:', seed)
// => seed: 81050accd71d774a23dfdc90d0e8a817805bee4fc0cb073e24cfd17c186a930dd62d8a588416e98aa046e982eedc6e4382c9ee68e6d78ff2c346b4f8efc7fbfa

const rootWallet = new Wallet(Buffer.from(seed, 'hex'))

for (let i = 0; i < 3; i++) {
  const wallet = rootWallet.derive(i)
  console.log('wallet #' + i + ':', wallet)
}
// =>
// wallet #0: {
//   hdKey: HDKey {
//     versions: { private: 76066276, public: 76067358 },
//     depth: 5,
//     index: 0,
//     _privateKey: <Buffer d9 14 f8 d8 c8 d3 03 53 7f 01 51 bf c2 50 c4 82 ed 3f 16 d2 bd 9f c6 6c 34 90 75 06 6c 91 ea 89>,
//     _publicKey: <Buffer 03 ef c7 fd 29 0d 4c bc 28 47 70 c7 ab 00 91 07 1a 10 73 ed 3b f8 55 74 20 23 9f 7c 70 e1 09 47 2d>,
//     chainCode: <Buffer df d9 df 20 57 8a e6 e6 da 42 1d 86 da 23 f5 83 5b 3c 25 66 da aa 5c 8b 50 09 7b ee 12 8f ea a9>,
//     _fingerprint: 77754819,
//     parentFingerprint: 3846648710,
//     _identifier: <Buffer 04 a2 71 c3 79 2b 83 dc d6 b0 d8 ef 15 78 00 a5 3e d2 8d d6>
//   },
//   address: 'vJfNbKgC0GYaAY2n6k8f6qDXFDDDUj8K7'
// }
// wallet #1: {
//   hdKey: HDKey {
//     versions: { private: 76066276, public: 76067358 },
//     depth: 5,
//     index: 1,
//     _privateKey: <Buffer ea 44 3e 92 68 00 c3 d4 84 6f 33 fb 67 27 c1 c5 b5 eb 76 63 8a 05 e3 58 e2 a6 1f 62 c2 14 3e 2e>,
//     _publicKey: <Buffer 03 3c b8 6e c5 b4 06 ab e3 79 f2 9e fb b6 bf c4 36 b6 51 4d 37 2a 57 d8 4a 51 e7 79 0c f8 5b 2f 79>,
//     chainCode: <Buffer f8 48 9c b6 e2 ee 7e 88 6b a3 d5 25 3b 7b 87 ac 9a aa de dc 0f 2a 10 bf 50 72 b0 3d 6f 07 2d 2c>,
//     _fingerprint: 4203181884,
//     parentFingerprint: 3846648710,
//     _identifier: <Buffer fa 87 77 3c c4 67 8e 70 f8 82 27 ce 52 ef 5c 7c e1 36 c6 c2>
//   },
//   address: 'vyus4BtEjYxAbHnf3Axf63f8karJ3yDBN'
// }
// wallet #2: {
//   hdKey: HDKey {
//     versions: { private: 76066276, public: 76067358 },
//     depth: 5,
//     index: 2,
//     _privateKey: <Buffer 7c d8 86 ec 15 b9 30 bd ae 62 d8 f9 d0 34 29 eb aa 2d 32 6a de a1 b1 43 ff 61 f8 f0 f8 ba 3b a0>,
//     _publicKey: <Buffer 03 b0 b5 07 0b 5c b6 c0 d2 64 d4 8d a2 10 87 9d 2f 93 9d 4c 9b 1e ac 02 ec 70 49 90 54 93 0f a8 54>,
//     chainCode: <Buffer a1 66 f1 75 ee ad fa c4 88 74 89 2d cc 5f af 7f bb cc 4f 8b a4 cb d1 a0 5a 77 c7 4b d9 b5 ce 37>,
//     _fingerprint: 2587414303,
//     parentFingerprint: 3846648710,
//     _identifier: <Buffer 9a 38 cf 1f 74 7c 13 cb 4f e8 36 47 b1 a0 bd 3c c0 94 cd 32>
//   },
//   address: 'v8X89pj8BXyaYaKd3Xx6BpFwrbw8d2D8F'
// }
```


License
-------

MIT
