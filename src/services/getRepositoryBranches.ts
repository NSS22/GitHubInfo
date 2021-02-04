const axios = require('axios');
import { responseHandler } from '../libs/responseMapper';
import { BranchSuccessResponse } from '../types';

export function getRepositoryBranches(repositoryFullName: string): Promise<BranchSuccessResponse | null | undefined> {
    return axios
        .get(`https://api.github.com/repos/${repositoryFullName}/branches`, {
            headers: {
                'Accept': 'application/json',
            }})
        .then(responseHandler.branch);
}

