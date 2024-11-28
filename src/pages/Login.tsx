import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/buttons/Button';
import CheckBox from '../components/buttons/Checkbox';
import PasswordField from '../components/fields/PasswordField';
import TextField from '../components/fields/TextField';
import api from '../utils/api';
import { useUserInfoMutation } from '../utils/hooks';
import { handleUpdateTokens } from '../utils/loginFunctions';
import { slugs } from '../utils/routes';
import { buttonsTitles, inputLabels, titles, validationTexts } from '../utils/texts';
import { loginSchema } from '../utils/validation';

interface LoginProps {
  email: string;
  password: string;
  refresh: boolean;
}

export const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async (values: LoginProps) => {
    const { email, password, refresh } = values;
    const params = {
      password,
      refresh,
      email: email.toLocaleLowerCase(),
    };

    return await api.login(params);
  };

  const handleError = ({ response }) => {
    const text = validationTexts[response?.data?.type] || validationTexts.error;
    return setErrors({ email: text });
  };

  const loginMutation = useMutation((params: LoginProps) => handleLogin(params), {
    onError: handleError,
    onSuccess: (data) => {
      handleUpdateTokens(data);
    },
    retry: false,
  });

  const { isLoading: checkAuthLoading } = useUserInfoMutation();

  const loading = [loginMutation.isLoading, checkAuthLoading].some((loading) => loading);

  const { values, errors, setFieldValue, handleSubmit, setErrors } = useFormik({
    initialValues: {
      email: '',
      password: '',
      refresh: false,
    },
    validateOnChange: false,
    validationSchema: loginSchema,
    onSubmit: loginMutation.mutateAsync,
  });

  const handleType = (field: string, value: string | boolean) => {
    setFieldValue(field, value);
    setErrors({});
  };

  return (
    <Container noValidate onSubmit={handleSubmit}>
      <TextField
        value={values.email}
        type="email"
        name="email"
        error={errors.email}
        onChange={(value) => handleType('email', value)}
        label={inputLabels.email}
      />
      <PasswordField
        value={values.password}
        name="password"
        error={errors.password}
        onChange={(value) => handleType('password', value)}
        label={inputLabels.password}
        secondLabel={
          <Url onClick={() => navigate(slugs.forgotPassword)}>{titles.forgotPassword}</Url>
        }
      />
      <Row>
        <StyledSingleCheckbox
          onChange={(value) => handleType('refresh', value!)}
          value={values.refresh}
          label={inputLabels.rememberMe}
        />
        <StyledButton loading={loading} disabled={loading} type="submit">
          {buttonsTitles.login}
        </StyledButton>
      </Row>
    </Container>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding-top: 16px;
`;

const StyledSingleCheckbox = styled(CheckBox)`
  flex-grow: 1;
`;

const StyledButton = styled(Button)`
  flex-basis: auto;
  flex-grow: 1;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Url = styled.div`
  font-size: 1.4rem;
  color: #0862ab;
  cursor: pointer;
`;
