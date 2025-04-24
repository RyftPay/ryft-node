import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { mockFile } from './mockData/mockFile';
import { Ryft } from '../../../src';
import { defaultHeaders, mockErrorResponse, mockSecretKey } from '../mockData';
import { mockCreateFileReq } from './mockData/mockCreateFileReq';
import { RyftError } from '../../../src/types/errors';
import * as fs from 'fs/promises';

jest.mock('fs/promises');

const mockedFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;
const mockedReadFile = fs.readFile as jest.MockedFunction<typeof fs.readFile>;

describe('files', () => {

    beforeEach(() => {
        global.fetch = mockedFetch;
    });

    describe('create', () => {

        test('success', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockFile,
                    ok: true,
                    status: 200,
                } as Response)
            );

            mockedReadFile.mockResolvedValue('file');

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.files.create(mockCreateFileReq);

            expect(result).toEqual(mockFile);
        });

        test('failure', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            mockedReadFile.mockResolvedValue('file');

            const client = new Ryft({ secretKey: mockSecretKey });
            await expect(client.files.create(mockCreateFileReq)).rejects.toThrow(RyftError);
        });

    });

    describe('list', () => {

        test('success with defaults', async () => {
            const mockResponse = {
                items: [
                    mockFile
                ]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.files.list();

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/files', {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

        test('success with custom params', async () => {
            const mockResponse = {
                items: [
                    mockFile
                ]
            }

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockResponse,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.files.list('Evidence', true, 20, 'abc');

            const expectedUrl = new URL('https://sandbox-api.ryftpay.com/v1/files');
            expectedUrl.searchParams.append('category', 'Evidence');
            expectedUrl.searchParams.append('ascending', 'true');
            expectedUrl.searchParams.append('limit', '20');
            expectedUrl.searchParams.append('startsAfter', 'abc');

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(expectedUrl.toString(), {
                method: 'GET',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.files.list()).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith('https://sandbox-api.ryftpay.com/v1/files', {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });

    describe('get', () => {

        test('success', async () => {
            const fileId = 'fl_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockFile,
                    ok: true,
                    status: 200,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });
            const result = await client.files.get(fileId);

            expect(result).toEqual(mockFile);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/files/${fileId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });

        });

        test('failure', async () => {
            const fileId = 'fl_123'

            mockedFetch.mockImplementation(async () =>
                Promise.resolve({
                    json: async () => mockErrorResponse,
                    ok: false,
                    status: 400,
                } as Response)
            );

            const client = new Ryft({ secretKey: mockSecretKey });

            await expect(client.files.get(fileId)).rejects.toThrow(RyftError);
            expect(global.fetch).toHaveBeenCalledWith(`https://sandbox-api.ryftpay.com/v1/files/${fileId}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
        });

    });
})
