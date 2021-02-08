import { RESPONSE_STATUS } from '../constants/responseStatus';
import handlerFunctions from './index';
import { RepositorySuccessResponse, Branch, Repository } from '../types';

export async function getRepositoriesInformation(userName: string) {
    try {
        const repositoryResponse = await handlerFunctions.getRepositories(userName);

        if(!repositoryResponse) {
            return repositoryResponse;
        }

        if(repositoryResponse && repositoryResponse.status === RESPONSE_STATUS.SUCCESS) {
            const repositoriesInformation: any[] = [];
            const { data } = repositoryResponse as RepositorySuccessResponse;
            const branches = await Promise.all(data.map((repository)=> {
                const { full_name: repositoryFullName } = repository;
                return handlerFunctions.getRepositoryBranches(repositoryFullName);
            }));

            for (let index = 0; index < data.length; index++) {

                const { name, owner: { login } = {} } = data[index] || {} as Repository;
                const branch = branches[index];
                if (branch) {
                    const  { data: branchesData } = branch;
                    const branches = branchesData.map((item: Branch) => {
                        const {name , commit: { sha } = {} } = item;
                        return {
                            name,
                            lastCommitSha: sha,
                        };
                    });

                    repositoriesInformation.push({
                        name,
                        ownerLogin: login,
                        branches,
                    });
                } else {
                    repositoriesInformation.push({
                        name,
                        ownerLogin: login,
                    });
                }
            }

            return {
                status: repositoryResponse.status,
                data: repositoriesInformation,
            };
        }

        return  repositoryResponse;
    } catch (error) {
        console.error(error);
    }
}
