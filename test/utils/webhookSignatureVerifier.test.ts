import { beforeEach, describe, expect, it } from '@jest/globals'
import { WebhookSignatureVerifier } from '../../src/utils/webhookSignatureVerifier'

describe('WebhookSignatureVerifier', () => {
  let verifier: WebhookSignatureVerifier

  beforeEach(() => {
    verifier = new WebhookSignatureVerifier()
  })

  it('should return false when signature is invalid', () => {
    const payload = '{"amount": 500, "currency": "GBP"}'
    const secretKey = 'abcdef4455'
    const signature =
      '12443c521a6900579d09b1b29cf17b679f7745eb32a8018e46f44bb27103f864'

    const result = verifier.isValid(secretKey, signature, payload)

    expect(result).toBe(false)
  })

  it('should return true when signature is valid', () => {
    const payload = '{"amount": 500, "currency": "GBP"}'
    const secretKey = 'abcdef4455'
    const signature =
      '12443c521a6900579d09b1b29cf17b679f7745eb32a8018e46f44bb27103f865'

    const result = verifier.isValid(secretKey, signature, payload)

    expect(result).toBe(true)
  })
})
