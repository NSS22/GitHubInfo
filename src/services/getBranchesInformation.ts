import { Branch, BranchSuccessResponse, BranchInformation } from '../types';

export function getBranchesInformation(branch: BranchSuccessResponse | null | undefined): BranchInformation[] {
    if(!branch) {
        return [];
    }

    const  { data: branchData } = branch;
    return branchData.map((item: Branch) => {
        const { name , commit: { sha } } = item;
        return {
            name,
            lastCommitSha: sha,
        };
    });
}