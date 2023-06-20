import React from "react";

import { SEO } from "core-next-components";

const DataDeletionInstruction = () => {
  return (
    <>
      <SEO
        title="politique de recuperation de données | Mr le Psy"
        description="Suivez les instructions sur cette page pour demander la suppression de vos données."
        image={`${process.env.NEXT_PUBLIC_HOSTNAME}/og-image/api/main`}
      />

      <div className="container mx-auto my-16 px-10">
        <h1 className="pb-8">DATA DELETION INSTRUCTIONS</h1>
        <div className="box-border">
          <p className="pb-8 text-lg">
            eDonec does not store your personal data; it is used only for login.
            According to the Facebook Platform rules, we have to provide
            <strong> User Data Deletion Callback URL </strong> or
            <strong> Data Deletion Instructions URL. </strong> If you want to
            delete your activities for the Boilerplate, following these
            instructions:
          </p>
          <ol className="ml-5 list-decimal">
            <li>
              Go to Your Facebook Account’s Setting &amp; Privacy. Click ”
              Setting “.
            </li>
            <li>
              Then, go to ” Apps and Websites” and you will see all of your Apps
              activities.
            </li>
            <li>Select the option box for Boilerplate</li>
            <li>Click ” Remove” button.</li>
            <li>
              Email us with a request to delete all of your data from our
              databases to <a href="mailto:dev@edonec.com">dev@edonec.com.</a>
            </li>
          </ol>
          &nbsp;
        </div>
      </div>
    </>
  );
};

export default DataDeletionInstruction;
