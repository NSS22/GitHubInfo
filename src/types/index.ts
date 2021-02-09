export interface Repository {
    name: string;
    full_name: string;
    owner: {
        login: string;
    };
}

export interface Branch {
    name: string;
    commit: {
        sha: string;
    };
}

export interface BranchInformation {
    name: string;
    lastCommitSha: string;
}

export interface RepositoriesInformation {
    name: string;
    ownerLogin: string;
    branches: BranchInformation[];
}

export interface FailedRequest {
    status: number;
    message: string;
}

export interface RepositorySuccessResponse {
    status: number;
    data: Repository[];
}

export interface RepositoryFailedResponse {
    status: number;
    data: FailedRequest;
}

export interface BranchSuccessResponse {
    data: Branch[];
}

export interface RepositoriesInformationSuccess {
    status: number;
    data: RepositoriesInformation[],
}
