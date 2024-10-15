import { Form, Formik, yupToFormErrors } from 'formik';
import { useState } from 'react';
import styled from 'styled-components';
import { ChildrenType, DeleteInfoProps } from '../../types';
import { buttonsTitles } from '../../utils/texts';
import BackButton from '../buttons/BackButton';
import Button, { ButtonColors } from '../buttons/Button';
import { FormErrorMessage } from '../other/FormErrorsMessage';
import InfoAboutEntity from '../other/InfoAboutEntity';

interface FormPageWrapperProps {
  renderForm: (
    values: any,
    errors: any,
    handleChange: (name: string, value: any) => {},
    setValues?: (values: any, shouldValidate?: boolean | undefined) => void,
    handleSubmit?: any,
    setErrors?: any,
  ) => ChildrenType;
  initialValues: any;
  onSubmit?: (values: any, setErrors?: any) => void;
  onDecline?: () => void;
  title?: string;
  info?: any[];
  validationSchema: any;
  additionalValidation?: any;
  back?: boolean;
  canSubmit?: boolean;
  enableReinitialize?: boolean;
  handleDelete?: (values?: any) => void;
  handleEdit?: () => void;
  disabled?: boolean;
  additionalButtons?: (handleChange: (name: string, value: any) => {}) => ChildrenType;
  deleteInfo?: DeleteInfoProps;
  additionalDeleteComponent?: (
    values: any,
    handleChange: (name: string, value: any) => {},
  ) => ChildrenType;
  twoColumn?: boolean;
  submitButtonText?: string;
  showFormError?: boolean;
}

const FormPageWrapper = ({
  renderForm,
  title = '',
  initialValues,
  showFormError = true,
  onSubmit,
  validationSchema,
  back = true,
  additionalValidation,
  canSubmit = true,
  onDecline,
  enableReinitialize = true,
  handleDelete,
  additionalButtons,
  deleteInfo,
  additionalDeleteComponent,
  twoColumn = false,
  disabled,
  handleEdit,
  info,
  submitButtonText = buttonsTitles.save,
}: FormPageWrapperProps) => {
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any, helper?: any) => {
    if (!onSubmit) return;

    setLoading(true);
    try {
      await onSubmit(values, helper);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleValidate = async (values) => {
    setValidateOnChange(true);
    const additionalErrors = additionalValidation ? additionalValidation(values) : null;
    try {
      await validationSchema.validate(values, { abortEarly: false });
    } catch (e) {
      return {
        ...yupToFormErrors(e),
        ...additionalErrors,
      };
    }
    return additionalErrors;
  };

  return (
    <Container>
      <Formik
        enableReinitialize={enableReinitialize}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnChange={validateOnChange}
        validationSchema={validationSchema}
        validate={handleValidate}
      >
        {({ values, errors, setFieldValue, handleSubmit, setValues }: any) => {
          return (
            <StyledForm two_column={twoColumn ? 1 : 0}>
              <InnerRow>
                {back && <BackButton />}

                <InfoAboutEntity
                  title={title}
                  info={info}
                  handleDelete={handleDelete}
                  deleteInfo={deleteInfo}
                  additionalDeleteComponent={additionalDeleteComponent}
                  handleChange={setFieldValue}
                  additionalButtons={
                    additionalButtons ? additionalButtons(setFieldValue) : undefined
                  }
                  values={values}
                  handleEdit={handleEdit}
                />
              </InnerRow>
              {renderForm(values, errors, setFieldValue, setValues, handleSubmit)}
              <FormErrorMessage errors={errors} />
              {!disabled && canSubmit && (
                <ButtonRow>
                  {onSubmit && (
                    <Button onClick={handleSubmit} loading={loading} disabled={loading}>
                      {submitButtonText}
                    </Button>
                  )}
                  {onDecline && (
                    <Button
                      onClick={() => onDecline()}
                      variant={ButtonColors.DANGER}
                      disabled={loading}
                    >
                      {buttonsTitles.decline}
                    </Button>
                  )}
                </ButtonRow>
              )}
            </StyledForm>
          );
        }}
      </Formik>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 16px;
  margin: 0 auto;
  min-height: 100%;
`;

const StyledForm = styled(Form)<{ two_column: number }>`
  flex-basis: ${({ two_column }) => (two_column ? '1200px' : '800px')};
`;

const InnerRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 16px 0;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin: 16px 0;
`;

export default FormPageWrapper;
