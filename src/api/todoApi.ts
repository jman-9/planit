import { ListApiInterface } from './types';
import ListApi from './listApi';
import todoSlice from '../store/todoSlice';

export const TodoApi: ListApiInterface = ListApi(todoSlice);
