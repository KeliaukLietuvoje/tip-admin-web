import { Form, Formik, yupToFormErrors } from "formik";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../styles";
import { DeleteInfoProps } from "../../types";
import { buttonsTitles } from "../../utils/texts";
import Button from "../buttons/Button";
import Icon from "../other/Icons";

interface FormPageWrapperProps {
  renderForm: (
    values: any,
    errors: any,
    handleChange: (name: string, value: any) => {},
    setValues?: (values: any, shouldValidate?: boolean | undefined) => void
  ) => JSX.Element;
  initialValues: any;
  onSubmit?: (values: any, setErrors?: any) => void;
  title: string;
  info?: string[];
  validationSchema: any;
  additionalValidation?: any;
  isLoading?: boolean;
  back?: boolean;
  canSubmit?: boolean;
  enableReinitialize?: boolean;
  handleDelete?: (values?: any) => void;
  disabled?: boolean;
  additionalButtons?: (
    handleChange: (name: string, value: any) => {},
    values?: any
  ) => JSX.Element;
  deleteInfo?: DeleteInfoProps;
  additionalDeleteComponent?: (
    values: any,
    handleChange: (name: string, value: any) => {}
  ) => JSX.Element;
}

const LargeFormPageWrapper = ({
  renderForm,
  title,
  initialValues,
  onSubmit,
  validationSchema,
  isLoading,
  back = true,
  additionalValidation,
  canSubmit = true,
  enableReinitialize = true,
  handleDelete,
  additionalButtons,
  deleteInfo,
  additionalDeleteComponent,
  info
}: FormPageWrapperProps) => {
  const navigate = useNavigate();
  const [validateOnChange, setValidateOnChange] = useState(false);

  return (
    <Container>
      <Formik
        enableReinitialize={enableReinitialize}
        initialValues={initialValues}
        onSubmit={onSubmit ? onSubmit : () => {}}
        validateOnChange={validateOnChange}
        validationSchema={validationSchema}
        validate={async (values) => {
          setValidateOnChange(true);
          const additionalErrors = additionalValidation
            ? additionalValidation(values)
            : null;
          try {
            await validationSchema.validate(values, { abortEarly: false });
          } catch (e) {
            return {
              ...yupToFormErrors(e),
              ...additionalErrors
            };
          }
          return additionalErrors;
        }}
      >
        {({ values, errors, setFieldValue, handleSubmit, setValues }: any) => {
          return (
            <StyledForm>
              <Row>
                {back && (
                  <BackButton
                    onClick={() => navigate(-1)}
                    leftIcon={<StyledBackIcon name="back" />}
                    variant={Button.colors.TRANSPARENT}
                    type="button"
                    height={32}
                    buttonPadding="0"
                    color="black"
                  >
                    {buttonsTitles.back}
                  </BackButton>
                )}
                <TitleRow>
                  <Title>{title}</Title>
                </TitleRow>
              </Row>
              {renderForm(values, errors, setFieldValue, setValues)}

              {!isEmpty(errors) ? (
                <ErrorMessage>
                  {errors.form || "Užpildykite formą teisingai"}
                </ErrorMessage>
              ) : null}
              {canSubmit && onSubmit && (
                <ButtonRow>
                  <Button
                    onClick={handleSubmit}
                    variant={Button.colors.PRIMARY}
                    type="button"
                    buttonPadding="6px 8px"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    {buttonsTitles.save}
                  </Button>
                </ButtonRow>
              )}
            </StyledForm>
          );
        }}
      </Formik>
    </Container>
  );
};

const Title = styled.div`
  font: normal normal bold 20px/25px Atkinson Hyperlegible;
  letter-spacing: 0px;
  color: #231f20;
  opacity: 1;
  margin-right: 16px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  margin: 22px 0px 33px 0px;
`;

const Container = styled.div`
  margin: 0 20px 20px 20px;
  @media ${device.mobileL} {
    margin: 0 16px 20px 16px;
    padding: 0;
    width: auto;
    min-width: auto;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  height: 100%;
  @media ${device.mobileXL} {
    width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledBackIcon = styled(Icon)`
  cursor: pointer;
  margin-right: 4px;
  font-size: 2rem;
  align-self: center;
  color: #000000;
`;

const BackButton = styled(Button)`
  min-width: 0px;
  margin-top: 20px;
  width: fit-content;
  button {
    padding-right: 16px;
    border: none;
    font-size: 1.6rem;
    color: #121926;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  margin: 16px 0px;
`;

const ErrorMessage = styled.div`
  background-color: #ffedf0;
  color: #fe1d42;
  border: 1px solid #fe1d42;
  border-radius: 4px;
  padding: 5px 0 5px 16px;
  display: flex;
  align-items: center;
`;

export default LargeFormPageWrapper;
