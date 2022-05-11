export type UploadRouteTypes = {
  "/upload/": {
    POST: {
      body: {
        file: File;
      };

      response: {
        url: string;
      };
    };
  };
  //! GENERATOR-ANCHOR
};
