import { ACCESS_RESSOURCES } from "shared-types/AccessRessources";
import { PRIVILEGE } from "shared-types/auth/access";

export type AuthZRouteTypes = {
  "/z/ressource-access": {
    POST: {
      body: {
        ressource: ACCESS_RESSOURCES;
        privileges: PRIVILEGE;
      };

      response: string;
    };
  };
  //! GENERATOR-ANCHOR
};
