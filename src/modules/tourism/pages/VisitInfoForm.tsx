import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '../../../components/fields/TextField';
import LoaderComponent from '../../../components/other/LoaderComponent';
import SimpleContainer from '../../../components/other/SimpleContainer';
import FormPageWrapper from '../../../components/wrappers/FormPageWrapper';
import { ColumnOne, FormRow, InnerContainer } from '../../../styles/CommonStyles';
import { handleErrorToastFromServer, isNew } from '../../../utils/functions';
import api from '../utils/api';
import { slugs } from '../utils/slugs';
import { formLabels, inputLabels, pageTitles } from '../utils/texts';
import { Info } from '../utils/types';
import { validateInfo } from '../utils/validation';

const VisitInfoForm = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();

  const { data: visitInfo, isLoading } = useQuery(['visitInfo', id], () => api.getVisitInfo(id), {
    onError: () => {
      navigate(slugs.visitInfos);
    },
    enabled: !isNew(id),
  });

  const title = isNew(id) ? pageTitles.newVisitInfo : pageTitles.updateVisitInfo;

  const handleSubmit = async (values: Info) => {
    const params = {
      ...values,
    };
    return await createForm.mutateAsync(params);
  };

  const createForm = useMutation(
    (values: Info) => (isNew(id) ? api.createVisitInfo(values) : api.updateVisitInfo(id!, values)),
    {
      onError: () => {
        handleErrorToastFromServer();
      },
      onSuccess: () => {
        navigate(slugs.visitInfos);
      },
      retry: false,
    },
  );

  const initialValues: Info = {
    name: visitInfo?.name || '',
    nameEn: visitInfo?.nameEn || '',
  };

  const renderForm = (values: Info, errors: any, handleChange) => {
    return (
      <InnerContainer>
        <ColumnOne>
          <SimpleContainer title={formLabels.info}>
            <FormRow columns={1}>
              <TextField
                label={inputLabels.name}
                value={values?.name}
                error={errors?.name}
                name="name"
                onChange={(name) => handleChange('name', name)}
              />
              <TextField
                label={inputLabels.nameEn}
                value={values?.nameEn}
                error={errors?.nameEn}
                name="nameEn"
                onChange={(name) => handleChange('nameEn', name)}
              />
            </FormRow>
          </SimpleContainer>
        </ColumnOne>
      </InnerContainer>
    );
  };

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <FormPageWrapper
      title={title}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      renderForm={renderForm}
      validationSchema={validateInfo}
    />
  );
};

export default VisitInfoForm;
