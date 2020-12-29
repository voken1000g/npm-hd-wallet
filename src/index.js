const HDKey = require('hdkey')
const base32 = require('@voken/base32')
const vokenAddress = require('@voken/address')

const Wallet = function (seedBuffer) {
  if (!Buffer.isBuffer(seedBuffer)) {
    throw TypeError('`seedBuffer` must be a `Buffer` object.')
  }

  this.rootHDKey = HDKey.fromMasterSeed(seedBuffer)

  this.derive = function (i) {
    const path = this._path(i)
    const hdKey = this.rootHDKey.derive(path)
    return {
      index: i,
      path: path,
      hdKey: hdKey,
      vpriv: 'vpriv' + base32.encode(hdKey.privateKey),
      vpub: 'vpub' + base32.encode(hdKey.publicKey),
      address: vokenAddress.fromPublicKey(hdKey.publicKey)
    }
  }

  this._path = function (index) {
    return "m/44'/678'/0'/0/" + index
  }
}

module.exports = Wallet
