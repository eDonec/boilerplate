export type FileRouteTypes = {
  "/file/": {
    POST: {
      response: {
        key: string;
        type: string;
        name: string;
        _id: string;
      };
    };
  };
  "/file/batch/": {
    POST: {
      response: Array<{
        key: string;
        type: string;
        name: string;
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
  //! GENERATOR-ANCHOR
};
