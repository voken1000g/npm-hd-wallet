const Buffer = require('safe-buffer').Buffer
const HDKey = require('hdkey')
const vokenAddress = require('@voken/address')

const Wallet = function (seedBuffer) {
  if (!Buffer.isBuffer(seedBuffer)) {
    throw TypeError('`seedBuffer` must be a `Buffer` object.')
  }

  this.rootHDKey = HDKey.fromMasterSeed(seedBuffer)

  this.derive = function (i) {
    const hdKey = this.rootHDKey.derive(this._path(i))
    return {
      hdKey: hdKey,
      address: vokenAddress.fromPublicKey(hdKey.publicKey)
    }
  }

  this._path = function (index) {
    return "m/44'/678'/0'/0/" + index
  }
}

module.exports = Wallet