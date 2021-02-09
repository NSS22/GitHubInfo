import { getRepositories } from './getRepositories';
import { getRepositoryBranches } from './getRepositoryBranches';
import { getRepositoriesInformation } from './getRepositoriesInformation';
import { getBranchesInformation } from './getBranchesInformation';

const handlerFunctions = {
    getRepositories,
    getRepositoryBranches,
    getBranchesInformation,
    getRepositoriesInformation,
};

export default handlerFunctions;
