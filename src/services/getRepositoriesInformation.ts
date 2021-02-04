import { RESPONSE_STATUS } from '../config/responseStatus';
import handlerFunctions from './index';
import { RepositorySuccessResponse, BranchSuccessResponse, Branch, Repository } from '../types';

export async function getRepositoriesInformation(userName: string, headerAcceptValue: string) {
    try {
        const repositories = await handlerFunctions.getRepositories(userName, headerAcceptValue);

        if(repositories && repositories.status === RESPONSE_STATUS.SUCCESS) {
            const repositoriesInformation: any[] = [];
            const { data } = repositories as RepositorySuccessResponse;
            const branches = await Promise.all(data.map((repository)=> {
                const { full_name: repositoryFullName } = repository;
                return handlerFunctions.getRepositoryBranches(repositoryFullName);
            }));

            for (let index = 0; index < data.length; index++) {

                const { name, owner: { login } = {} } = data[index] || {} as Repository;
                const branch = branches[index] as BranchSuccessResponse;
                if (branch) {
                    const  { data: branchData } = branch as BranchSuccessResponse;
                    const {
                        name: branchName,
                        commit: { sha } = {},
                    } = branchData.slice(-1)[0] || {} as Branch;

                    repositoriesInformation.push({
                        repositoryName: name,
                        ownerLogin: login,
                        branch: branchName,
                        lastCommitSha: sha,
                    });
                } else {
                    repositoriesInformation.push({
                        repositoryName: name,
                        ownerLogin: login,
                    });
                }
            }

            return repositoriesInformation;
        }

        return repositories;
    } catch (error) {
        console.error(error);
    }
};