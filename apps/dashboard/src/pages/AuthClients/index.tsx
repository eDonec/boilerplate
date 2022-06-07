import UncontrolledDataTable from "core-cra-components/UncontrolledDataTable";
import AlertDialog from "core-ui/AlertDialog";
import Modal from "core-ui/Modal";

import PrivateWrapper from "containers/AuthWrappers/PrivateWrapper";
import MainWrapper from "containers/MainWrapper";

import SuspendClientForm from "./SuspendClientForm";
import { fetchFunction, useAuthClients } from "./uesAuthClients";

const AuthClients = () => {
  const {
    dataColumns,
    dataTableRef,
    banClientDialogueProps,
    liftBanAndSuspensionDialogueProps,
    isSuspensionModalOpen,
    setSuspensionModalOpen,
    suspendClient,
  } = useAuthClients();

  return (
    <PrivateWrapper>
      <MainWrapper
        title="Authenticated Clients"
        description="List of authenticated clients"
      >
        <UncontrolledDataTable
          fetchFunction={fetchFunction}
          columns={dataColumns}
          keyExtractor={({ item }) => item._id}
          handle={dataTableRef}
        />
        <AlertDialog
          {...banClientDialogueProps}
          size="small"
          cancelMessage="Cancel"
          confirmMessage="Confirm"
          title="You are about to ban a client! Are you sure?"
          message="This is a sencetive action please be carefull!"
        />
        <AlertDialog
          {...liftBanAndSuspensionDialogueProps}
          size="small"
          cancelMessage="Cancel"
          confirmMessage="Confirm"
          title="You are about to reactivate a client! Are you sure?"
          message="This is a sencetive action please be carefull!"
        />
        <Modal
          isOpen={isSuspensionModalOpen}
          handleClose={() => setSuspensionModalOpen(false)}
          title="Suspend Client"
          size="small"
        >
          <SuspendClientForm onSubmit={suspendClient} />
        </Modal>
      </MainWrapper>
    </PrivateWrapper>
  );
};

export default AuthClients;
