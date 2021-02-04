import { getRepositories } from './getRepositories';
import { getRepositoryBranches } from './getRepositoryBranches';
import { getRepositoriesInformation } from './getRepositoriesInformation';

const handlerFunctions = {
    getRepositories,
    getRepositoryBranches,
    getRepositoriesInformation,
};

export default handlerFunctions;
