import { RYFT_LIVE_URL, RYFT_SANDBOX_URL } from "../types/url";

export const determineBaseUrl = (secretKey: string): string | undefined => {
    if (secretKey.startsWith('sk_sandbox'))
        return RYFT_SANDBOX_URL 

    if (secretKey.startsWith('sk_'))
        return RYFT_LIVE_URL;

    return undefined
}
