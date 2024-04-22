import PasswordForm from "../components/forms/PasswordForm";
import { useVerifyUser } from "../utils/hooks";
import { descriptions, titles } from "../utils/texts";

const CreatePassword = () => {
  const { isLoading, data: invitation } = useVerifyUser();

  return (
    <PasswordForm
      isLoading={isLoading}
      title={titles.newPassword}
      description={`Jus pakvietė ${invitation?.inviter?.name}`}
      successTitle={titles.passwordCreated}
      successDescription={descriptions.passwordCreated}
      email={invitation?.user?.email}
    />
  );
};

export default CreatePassword;
