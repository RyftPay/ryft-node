import { createHmac } from 'crypto'

export class WebhookSignatureVerifier {
  public isValid(secret: string, signature: string, payload: string): boolean {
    return this.hmacSha256(secret, payload) === signature
  }

  private hmacSha256(secret: string, payload: string): string {
    const hmac = createHmac('sha256', secret)
    hmac.update(payload, 'utf8')
    return hmac.digest('hex')
  }
}
