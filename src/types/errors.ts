export interface ErrorElement {
    code: 'unexpected_error' | 'invalid_field' | 'bad_request' | 'not_found';
    message: string;
}

export interface RyftErrorResponse {
    requestId: string;
    code: string;
    errors: ErrorElement[];
}

export class RyftError extends Error {
    public readonly requestId: string;
    public readonly code: string;
    public readonly errors: ErrorElement[];
    public readonly status: number;

    constructor(status: number, response: RyftErrorResponse) {
        super(response.errors[0]?.message || 'Unknown error');
        this.name = 'RyftError';
        this.requestId = response.requestId;
        this.code = response.code;
        this.errors = response.errors;
        this.status = status;
    }
}
