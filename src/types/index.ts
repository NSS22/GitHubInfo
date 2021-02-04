export interface Repository {
    name: string;
    full_name: string;
    owner: {
        login: string;
    };
    forks: number;
};

export interface Branch {
    name: string;
    commit: {
        sha: string;
    };
};

export interface RepositorySuccessResponse {
    status: number;
    data: Repository[];
};

export interface RepositoryFailedResponse {
    status: number;
    message: string;
};

export interface BranchSuccessResponse {
    data: Branch[];
};
