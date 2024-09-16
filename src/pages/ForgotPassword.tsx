import { useFormik } from 'formik';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import Button from '../components/buttons/Button';
import TextField from '../components/fields/TextField';
import ReturnToLogin from '../components/other/ReturnToLogin';
import api from '../utils/api';
import { handleErrorToastFromServer } from '../utils/functions';
import { buttonsTitles, descriptions, inputLabels, titles, validationTexts } from '../utils/texts';
import { remindPasswordSchema } from '../utils/validation';

const ForgotPassword = () => {
  const captchaRef = useRef<ReCAPTCHA>(null);

  const handleRemindPassword = async (values: { email: string }) => {
    const captchaToken = await captchaRef?.current?.execute();
    const { email } = values;
    const params = { email: email.toLocaleLowerCase(), captchaToken };

    return await api.remindPassword(params);
  };

  const handleInputError = ({ response }) => {
    const text = validationTexts[response?.data?.message];
    if (text) {
      return setErrors({ email: text });
    }
    handleErrorToastFromServer();
  };

  const handleSuccess = (response) => {
    if (response.invalidUntil) {
      return setErrors({
        email: validationTexts.tooFrequentRequest,
      });
    }

    if (response?.url) {
      const url = new URL(response?.url);
      url.hostname = window.location.hostname;
      url.port = window.location.port;
      url.protocol = window.location.protocol;
      console.log(url.href);
      alert(url.href);
    }
  };

  const { mutateAsync, isLoading, data } = useMutation(
    (params: { email: string }) => handleRemindPassword(params),
    {
      onError: handleInputError,
      onSuccess: handleSuccess,
      retry: false,
    },
  );

  const isSuccess = data?.success;

  const { values, errors, setFieldValue, handleSubmit, setErrors } = useFormik({
    initialValues: {
      email: '',
    },
    validateOnChange: false,
    validationSchema: remindPasswordSchema,
    onSubmit: (values) => mutateAsync({ email: values.email }),
  });

  const handleType = (field: string, value: string | boolean) => {
    setFieldValue(field, value);
    setErrors({});
  };

  return (
    <>
      {!isSuccess ? (
        <Container noValidate onSubmit={handleSubmit}>
          <InfoContainer>
            <SecondTitle>{titles.forgotPassword}</SecondTitle>
            <Description>{descriptions.forgotPassword}</Description>
          </InfoContainer>
          <FormContainer>
            <TextField
              value={values.email}
              type="email"
              name="email"
              error={errors.email}
              onChange={(value) => handleType('email', value)}
              label={inputLabels.email}
            />
            <Button loading={isLoading} disabled={isLoading} type="submit">
              {buttonsTitles.resetPassword}
            </Button>
          </FormContainer>
          <ReCAPTCHA
            ref={captchaRef}
            size="invisible"
            sitekey="6LdydlggAAAAAO-vBvg9yBWEVxlulH5b4X6BijMV"
          />
        </Container>
      ) : (
        <InnerSecondContainer>
          <SecondTitle>{titles.remindPassword}</SecondTitle>
          <Description>
            {`El. paštu ${values.email} išsiuntėme prisijungimo instrukciją`}
          </Description>
        </InnerSecondContainer>
      )}
      <ReturnToLogin />
    </>
  );
};

export default ForgotPassword;

const InnerSecondContainer = styled.div`
  margin-bottom: 48px;
`;

const SecondTitle = styled.div`
  color: #121926;
  font-size: 1.8rem;
  font-weight: bold;
`;

const Description = styled.div`
  font-weight: normal;
  font-size: 1.4rem;
  color: #121926;
  margin
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;
