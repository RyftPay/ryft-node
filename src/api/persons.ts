import { DeletedResource } from "../types/deleted";
import { Person, Persons } from "../types/persons/persons";
import { CreatePersonRequest, UpdatePersonRequest } from "../types/persons/req";
import { makeRequest } from "../utils/http";

/**
  * The Persons API allows the creation and management of one or more persons for the purpose of verification for `Business` sub accounts.
  * Recommended if you wish to implement verification programmatically for your sub accounts.
  * This API cannot be accessed for `Individual` sub accounts.
  * Docs: https://api-reference.ryftpay.com/#tag/Persons
  */
export class PersonsClient {
    constructor(
        private readonly secretKey: string,
        private readonly baseUrl: string
    ) { }

    async create(id: string, request: CreatePersonRequest): Promise<Person> {
        return makeRequest({
            path: `/accounts/${id}/persons`,
            method: 'POST',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                ...request,
            },
        });
    }

    async list(
        id: string,
        ascending?: boolean ,
        limit?: number,
        startsAfter?: string,
    ): Promise<Persons> {
        return makeRequest({
            path: `/accounts/${id}/persons`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            queryParams: {
                ascending,
                limit,
                startsAfter,
            },
        });
    }

    async get(id: string, personId: string): Promise<Person> {
        return makeRequest({
            path: `/accounts/${id}/persons/${personId}`,
            method: 'GET',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }

    async update(id: string, personId: string, request: UpdatePersonRequest): Promise<Person> {
        return makeRequest({
            path: `/accounts/${id}/persons/${personId}`,
            method: 'PATCH',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
            body: {
                ...request,
            },
        });
    }

    async delete(id: string, personId: string): Promise<DeletedResource> {
        return makeRequest({
            path: `/accounts/${id}/persons/${personId}`,
            method: 'DELETE',
            secretKey: this.secretKey,
            baseUrl: this.baseUrl,
        });
    }
}
