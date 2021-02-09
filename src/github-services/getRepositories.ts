import axios from 'axios';
import { responseHandler } from '../libs/responseMapper';
import { RepositorySuccessResponse, RepositoryFailedResponse } from '../types';
import { HEADERS_ACCEPT } from '../constants/requestHeaders';

export function getRepositories(userName: string): Promise<RepositorySuccessResponse | RepositoryFailedResponse | null | undefined> {
    return axios
        .get(`https://api.github.com/search/repositories?q=user:${userName}+fork:false`, {
            headers: {
                'Accept': HEADERS_ACCEPT.APP_JSON,
            }
        })
        .then(responseHandler.repository)
        .catch((error: any) => {
            const { status, data } = error.response;
            return responseHandler.repository({ status, data });
        });
}
