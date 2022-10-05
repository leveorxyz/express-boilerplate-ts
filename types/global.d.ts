type GlobalResponse<T> = {
  message: string;
  statusCode: Number;
  result: T;
};

type Demo = {
  message: string;
};
