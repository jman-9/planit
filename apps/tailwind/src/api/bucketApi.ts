import { ListApiInterface } from './types';
import ListApi from './listApi';
import bucketSlice from '../store/bucketSlice';
import ElectronListApi from './electronListApi';


let BucketApiImpl: ListApiInterface;

if(window.env?.isElectron) {
  BucketApiImpl = ElectronListApi();
}
else {
  BucketApiImpl = ListApi(bucketSlice);
}

export const BucketApi: ListApiInterface = BucketApiImpl;
