import { RESPONSE_STATUS } from '../constants/responseStatus';
import handlerFunctions from './index';
import { RepositorySuccessResponse, BranchSuccessResponse, Branch, Repository } from '../types';

export async function getRepositoriesInformation(userName: string) {
    try {
        const repositories = await handlerFunctions.getRepositories(userName);

        if(!repositories) {
            return repositories;
        }

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
                    const  { data: branchesData } = branch as BranchSuccessResponse;
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
                status: repositories.status,
                data: repositoriesInformation,
            };
        }

        return  repositories;
    } catch (error) {
        console.error(error);
    }
}
