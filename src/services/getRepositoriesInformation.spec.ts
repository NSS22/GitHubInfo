import { anything } from 'ts-mockito';
import handlerFunctions from './index';


describe('Get Repositories Information', () => {

    describe('getRepositoriesInformation is invoked',  () => {
        it('should return repositories with branch information', async () => {
            handlerFunctions.getRepositories = jest.fn()
                .mockReturnValue({
                    status: 200,
                    data: [{
                        'name': 'Anjular2-Demo-Project',
                        'full_name': 'NSS22/Anjular2-Demo-Project',
                        'private': false,
                        'owner': {
                            'login': 'NSS22',
                        }
                    }]
                });

            handlerFunctions.getRepositoryBranches = jest.fn()
                .mockReturnValue({
                    status: 200,
                    data: [{
                        'name': 'dev',
                        'commit': {
                            'sha': '1234',
                        },
                        'protected': false,
                    }]
                });

            expect(await handlerFunctions.getRepositoriesInformation(anything()))
                .toEqual({
                    status: 200,
                    data: [{
                        'name': 'Anjular2-Demo-Project',
                        'ownerLogin': 'NSS22',
                        'branches': [{
                            'name': 'dev',
                            'lastCommitSha': '1234',
                        }]
                    }],
                });
        });

        it('should return repositories without branch information', async () => {
            handlerFunctions.getRepositories = jest.fn()
                .mockReturnValue({
                    status: 200,
                    data: [{
                        'name': 'Anjular2-Demo-Project',
                        'full_name': 'NSS22/Anjular2-Demo-Project',
                        'private': false,
                        'owner': {
                            'login': 'NSS22',
                        }
                    }],
                });

            handlerFunctions.getRepositoryBranches = jest.fn()
                .mockReturnValue({
                    status: 200,
                    data: []
                });

            expect(await handlerFunctions.getRepositoriesInformation(anything()))
                .toEqual({
                    status: 200,
                    data: [{
                        'name': 'Anjular2-Demo-Project',
                        'ownerLogin': 'NSS22',
                        'branches': [],
                    }]
                });
        });

        it('should return not found message', async () => {
            handlerFunctions.getRepositories = jest.fn()
                .mockReturnValue({
                    'status': 404,
                    'message': 'Not Found',
                });

            expect(await handlerFunctions.getRepositoriesInformation(anything()))
                .toEqual({
                    'status': 404,
                    'message': 'Not Found',
                });
        });
    });
});