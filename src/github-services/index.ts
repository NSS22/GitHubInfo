import { getRepositories } from './getRepositories';
import { getRepositoryBranches } from './getRepositoryBranches';

const gitHubHandlerFunctions = {
    getRepositories,
    getRepositoryBranches,
};

export default gitHubHandlerFunctions;
