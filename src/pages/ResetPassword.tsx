import PasswordForm from '../components/forms/PasswordForm';
import { useVerifyUser } from '../utils/hooks';
import { descriptions, titles } from '../utils/texts';

const ResetPassword = () => {
  const { isLoading, data: invitation } = useVerifyUser();

  return (
    <PasswordForm
      isLoading={isLoading}
      title={titles.newPassword}
      description={descriptions.resetPassword}
      successTitle={titles.passwordChanged}
      successDescription={descriptions.passwordChanged}
      email={invitation?.user?.email}
    />
  );
};

export default ResetPassword;
