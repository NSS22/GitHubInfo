import handlerFunctions from './';

describe('Get Branches Information', () => {

    describe('getBranchesInformation is invoked',  () => {
        it('should return branches information', async () => {
            const payload = {
                data: [{
                    name: 'name',
                    commit: {
                        sha: 'sha',
                }}],
            };

            expect(await handlerFunctions.getBranchesInformation(payload))
                .toEqual([{
                    name: 'name',
                    lastCommitSha: 'sha',
                }]);
        });

        it('should return []', async () => {
            const payload = null;

            expect(await handlerFunctions.getBranchesInformation(payload))
                .toEqual([]);
        });
    });
});