const axios = require('axios');
import { responseHandler } from '../libs/responseMapper';
import { RepositorySuccessResponse, RepositoryFailedResponse } from '../types';

export function getRepositories(userName: string, headerAcceptValue: string): Promise<RepositorySuccessResponse | RepositoryFailedResponse | null | undefined> {
    return axios
        .get(`https://api.github.com/users/${userName}/repos`, {
            headers: {
                'Accept': headerAcceptValue,
            }
        })
        .then(responseHandler.repository)
        .catch((error: any) => {
            const { status, data } = error.response;
            return responseHandler.repository({ status, data });
        });
}
