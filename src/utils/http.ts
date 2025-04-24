import { RyftError, RyftErrorResponse } from "../types/errors";
import { SDK_VERSION } from "../version";
import { SDK_NAME } from "../name";
import { readFile } from 'fs/promises';
import { basename } from "path";

interface RequestOptions {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    secretKey: string;
    baseUrl: string;
    body?: object;
    extraHeaders?: Record<string, string>;
    queryParams?: Record<string, string | number | boolean | undefined>;
}

interface FileRequestOptions {
    path: string;
    secretKey: string;
    baseUrl: string;
    file: string;
    category: string;
    extraHeaders?: Record<string, string>;
}

const defaultHeaders = {
    'ryft-sdk-name': SDK_NAME,
    'ryft-sdk-version': SDK_VERSION,
    'User-Agent': `${SDK_NAME}/${SDK_VERSION}`,
}

const supportedMimeTypes = {
    "pdf": "application/pdf",
    "png": "image/png",
    "jpg": "image/jpg",
    "jpeg": "image/jpeg",
}

export async function makeRequest<T>({
    path,
    method,
    secretKey,
    baseUrl,
    body,
    extraHeaders,
    queryParams,
}: RequestOptions): Promise<T> {
    let url = `${baseUrl}${path}`;

    if (queryParams) {
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
            if (value !== undefined) {
                params.append(key, value.toString());
            }
        });

        const queryString = params.toString();
        if (queryString) {
            url += `?${queryString}`;
        }
    }

    const response = await fetch(url, {
        method,
        headers: {
            'Authorization': secretKey,
            'Content-Type': 'application/json',
            ...defaultHeaders,
            ...extraHeaders,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new RyftError(response.status, data as RyftErrorResponse);
    }

    return data as T;
}

export async function uploadFile<T>({
    path,
    secretKey,
    baseUrl,
    file,
    category,
    extraHeaders,
}: FileRequestOptions): Promise<T> {
    const url = `${baseUrl}${path}`;

    const fileContent = await readFile(file);
    const filename = basename(file);
    const filetype = filename.split('.').pop() ?? '';
    const mime = supportedMimeTypes[filetype]

    const formData = new FormData();
    formData.append('file', new Blob([fileContent], { type: mime }), filename);
    formData.append('category', category);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Authorization': secretKey,
            ...defaultHeaders,
            ...extraHeaders,
        },
        body: formData,
    });

    if (response.status === 415) {
        throw new RyftError(response.status, {
            code: "415",
            requestId: "",
            "errors": [
                {
                    "message": "Unsupported file type: {mimetype}",
                    "code": "bad_request",
                }
            ],
        })
    }

    const data = await response.json();

    if (!response.ok) {
        throw new RyftError(response.status, data as RyftErrorResponse);
    }

    return data as T;
}