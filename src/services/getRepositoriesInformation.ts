import { RESPONSE_STATUS } from '../constants/responseStatus';
import gitHubHandlerFunctions from '../github-services';
import handlerFunctions from './';
import {
    RepositorySuccessResponse,
    RepositoriesInformationSuccess,
    RepositoryFailedResponse,
    Repository,
} from '../types';


export async function getRepositoriesInformation(userName: string): Promise<RepositoriesInformationSuccess | RepositorySuccessResponse | RepositoryFailedResponse | null | undefined> {
    const repositoryResponse = await gitHubHandlerFunctions.getRepositories(userName);

    if(!repositoryResponse || repositoryResponse.status !== RESPONSE_STATUS.SUCCESS) {
        return repositoryResponse;
    }

    const { data } = repositoryResponse as RepositorySuccessResponse;
    const branches = await Promise.all(data.map((repository)=> {
        const { full_name: repositoryFullName } = repository;
        return gitHubHandlerFunctions.getRepositoryBranches(repositoryFullName);
    }));

    const repositoriesInformation = data.map((item: Repository, index: number) => {
        const { name, owner: { login } } = item;
        return {
            name,
            ownerLogin: login,
            branches: handlerFunctions.getBranchesInformation(branches[index]),
        };
    });

    return {
        status: repositoryResponse.status,
        data: repositoriesInformation,
    };
}
