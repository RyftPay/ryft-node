import { describe, expect, test } from '@jest/globals';
import { determineBaseUrl } from '../../src/utils/url';
import { RYFT_SANDBOX_URL, RYFT_LIVE_URL } from '../../src/types/url';

describe('url utils', () => {

    describe('determineBaseUrl', () => {

        test('sandbox url', async () => {
            const url = determineBaseUrl('sk_sandbox_123');
            expect(url).toEqual(RYFT_SANDBOX_URL);
        });

        test('live url', async () => {
            const url = determineBaseUrl('sk_live_123');
            expect(url).toEqual(RYFT_LIVE_URL);
        });

        test('undefined when invalid secret key', async () => {
            const url = determineBaseUrl('invalid_secret_key');
            expect(url).toBeUndefined();
        });

    });

});
