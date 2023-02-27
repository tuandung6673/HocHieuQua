export class BaseReponse<T> {
  statusCode = 0;
  message = '';
  status = '';
  data: BaseReponseList<T> = null;
}

export class BaseReponseList<T> {
  recordsTotal = 0;
  recordsFiltered = 0;
  statusCode = 0;
  message = '';
  status = '';
  data: T[] = [];
}

export class BaseRetail<T> {
  statusCode = 0;
  message = '';
  status = '';
  data: T;
}




