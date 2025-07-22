import { ListApiInterface } from './types';
import ListApi from './listApi';
import todoSlice from '../store/todoSlice';
import ElectronListApi from './electronListApi';


let TodoApiImpl: ListApiInterface;

if(window.elecPlanit) {
  TodoApiImpl = ElectronListApi(window.elecPlanit.todo);
}
else {
  TodoApiImpl = ListApi(todoSlice);
}

export const TodoApi: ListApiInterface = TodoApiImpl;
