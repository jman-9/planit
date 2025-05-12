import { ListApiInterface } from './types';
import ListApi from './listApi';
import bucketSlice from '../store/bucketSlice';

export const BucketApi: ListApiInterface = ListApi(bucketSlice);
