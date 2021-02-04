import { anything } from 'ts-mockito';
import axios from 'axios';
import { responseHandler } from '../libs/responseMapper';
import { getRepositoryBranches } from './getRepositoryBranches';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Get Repository Branches', () => {

    describe('getRepositoryBranches is invoked', () => {
        it('should branch responseHandler is invoked with status = 200', async (done) => {
            mockedAxios.get.mockResolvedValue({ status: 200, data: [] });
            const spyRepositoryResponseHandler = jest.spyOn(responseHandler, 'branch');
            await getRepositoryBranches(anything());

            expect(spyRepositoryResponseHandler).toBeCalledWith({ status: 200, data: [] });
            done();
        });

        it('should branch responseHandler is invoked with null', async (done) => {
            mockedAxios.get.mockResolvedValue(null);
            const spyRepositoryResponseHandler = jest.spyOn(responseHandler, 'branch');
            await getRepositoryBranches(anything());

            expect(spyRepositoryResponseHandler).toBeCalledWith(null);
            done();
        });
    });
});
