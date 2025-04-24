export const mockSecretKey = 'sk_sandbox_123'
import { SDK_NAME } from "../../src/name";
import { SDK_VERSION } from "../../src/version";

export const defaultHeaders = {
    'Authorization': 'sk_sandbox_123',
    'Content-Type': 'application/json',
    'ryft-sdk-name': SDK_NAME,
    'ryft-sdk-version': SDK_VERSION,
    'User-Agent': `${SDK_NAME}/${SDK_VERSION}`,
}

export const mockErrorResponse = {
    requestId: 'req_123',
    code: "bad_request",
    errors: [
        {
            code: "bad_request",
            message: "incorrect field"
        }
    ],
};
