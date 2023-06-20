export type FileRouteTypes = {
  "/file/": {
    POST: {
      response: {
        key: string;
        type: string;
        name: string;
        _id: string;
        url: string;
        size: number;
      };
    };
  };
  "/file/batch/": {
    POST: {
      response: Array<{
        key: string;
        type: string;
        name: string;
        url: string;
        _id: string;
        size: number;
      }>;
    };
  };
  "/file/:key": {
    GET: {
      params: {
        key: string;
      };
    };
  };
  "/file/create-by-url": {
    POST: {
      body: {
        url: string;
      };

      response: {
        key: string;
        url: string;
        type: string;
        name: string;
        _id: string;
        size: number;
      };
    };
  };
};
