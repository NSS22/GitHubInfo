import axios from 'axios';
import { HEADERS_ACCEPT } from '../constants/requestHeaders';
import { responseHandler } from '../libs/responseMapper';
import { BranchSuccessResponse } from '../types';

export function getRepositoryBranches(repositoryFullName: string): Promise<BranchSuccessResponse | null | undefined> {
    return axios
        .get(`https://api.github.com/repos/${repositoryFullName}/branches`, {
            headers: {
                'Accept': HEADERS_ACCEPT.APP_JSON,
            }})
        .then(responseHandler.branch)
        .catch((error: any) => {
            const { status, data } = error.response;
            return responseHandler.branch({ status, data });
        });
}
