import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetPassword } from "../../utils/hooks";
import { slugs } from "../../utils/routes";
import { buttonsTitles, inputLabels } from "../../utils/texts";
import Button from "../buttons/Button";
import PasswordField from "../fields/PasswordField";
import TextField from "../fields/TextField";
import LoaderComponent from "../other/LoaderComponent";
import PasswordCheckListContainer from "../other/PasswordCheckListContainer";
import ReturnToLogin from "../other/ReturnToLogin";

const PasswordForm = ({
  title,
  successTitle,
  description,
  successDescription,
  isLoading,
  email
}) => {
  const navigate = useNavigate();
  const [allValid, setAllValid] = useState(false);
  const {
    mutateAsync: setPasswordMutation,
    isSuccess,
    isLoading: isSubmitLoading
  } = useSetPassword();

  const { values, setFieldValue, handleSubmit, setErrors } = useFormik({
    initialValues: {
      password: "",
      repeatPassword: ""
    },
    validateOnChange: false,
    onSubmit: (values) => {
      if (!allValid) return;

      setPasswordMutation({ password: values.password });
    }
  });

  if (isLoading) {
    return <LoaderComponent />;
  }

  const handleType = (field: string, value: string | boolean) => {
    setFieldValue(field, value);
    setErrors({});
  };

  const { repeatPassword, password } = values;

  return (
    <>
      {!isSuccess ? (
        <PasswordContainer noValidate onSubmit={handleSubmit}>
          <SecondTitle>{title}</SecondTitle>
          <Description>{description}</Description>
          <TextField
            value={email}
            disabled={true}
            label={inputLabels.email}
          ></TextField>
          <PasswordCheckListContainer
            setAllValid={setAllValid}
            password={password}
            repeatPassword={repeatPassword}
          />
          <PasswordField
            value={password}
            name="password"
            onChange={(value) => handleType("password", value)}
            label={inputLabels.password}
          />
          <PasswordField
            value={repeatPassword}
            name="repeatPassword"
            onChange={(value) => handleType("repeatPassword", value)}
            label={inputLabels.password}
          />
          <Button
            loading={isSubmitLoading}
            disabled={isSubmitLoading || !allValid}
            type="submit"
          >
            {buttonsTitles.createPassword}
          </Button>

          <ReturnToLogin />
        </PasswordContainer>
      ) : (
        <SuccessContainer>
          <SecondTitle>{successTitle}</SecondTitle>
          <Description>{successDescription}</Description>
          <Button onClick={() => navigate(slugs.login)}>
            {buttonsTitles.login}
          </Button>
        </SuccessContainer>
      )}
    </>
  );
};

export default PasswordForm;

const PasswordContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
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
`;
