export interface Repository {
    name: string;
    full_name: string;
    owner: {
        login: string;
    };
    forks: number;
}

export interface Branch {
    name: string;
    commit: {
        sha: string;
    };
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
