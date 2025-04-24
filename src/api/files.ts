import { Files } from "../types/files/files";
import { CreateFileRequest } from "../types/files/req";
import { makeRequest, uploadFile } from "../utils/http";

/**
  * The Files API allows you to query for and upload files to Ryft.
  * Some files may be generated internally by Ryft when requesting reports, or alternatively you may have uploaded evidence/verification documents
  * Docs: https://api-reference.ryftpay.com/#tag/Files
  */
export class FilesClient {
    private readonly path = '/files';

    constructor(
        private readonly secretKey: string,
        private readonly baseUrl: string
    ) { }

    async list(
        category?: string,
        ascending?: boolean,
        limit?: number,
        startsAfter?: string,
    ): Promise<Files> {
        return makeRequest({
            path: this.path,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            queryParams: {
                category,
                ascending,
                limit,
                startsAfter,
            },
        });
    }

    async create(request: CreateFileRequest, account?: string): Promise<File> {
        return uploadFile({
            path: this.path,
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            file: request.file,
            category: request.category,
            ...(account && { extraHeaders: { Account: account } })
        });
    }

    async get(id: string, account?: string): Promise<File> {
        return makeRequest({
            path: `${this.path}/${id}`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            ...(account && { extraHeaders: { Account: account } })
        });
    }
}