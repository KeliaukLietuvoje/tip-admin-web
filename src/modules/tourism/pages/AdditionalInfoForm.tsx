import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '../../../components/fields/TextField';
import { AdditionalInfoIcons } from '../../../components/other/AdditionalInfoIcons';
import LoaderComponent from '../../../components/other/LoaderComponent';
import SimpleContainer from '../../../components/other/SimpleContainer';
import FormPageWrapper from '../../../components/wrappers/FormPageWrapper';
import { ColumnOne, FormRow, InnerContainer } from '../../../styles/CommonStyles';
import { handleErrorToastFromServer, isNew } from '../../../utils/functions';
import api from '../utils/api';
import { slugs } from '../utils/slugs';
import { formLabels, inputLabels, pageTitles } from '../utils/texts';
import { Info } from '../utils/types';
import { validateAdditionalInfo } from '../utils/validation';

const AdditionalInfoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: additionalInfo, isLoading } = useQuery(
    ['additionalInfo', id],
    () => api.getAdditionalInfo(id!),
    {
      onError: () => {
        navigate(slugs.additionalInfos);
      },
      enabled: !isNew(id),
    },
  );

  const title = isNew(id) ? pageTitles.newAdditionalInfo : pageTitles.updateAdditionalInfo;

  const handleSubmit = async (values: Info) => {
    const params = {
      ...values,
    };
    if (isNew(id)) {
      return await createForm.mutateAsync(params);
    }

    return await updateForm.mutateAsync(params);
  };

  const createForm = useMutation((values: Info) => api.createAdditionalInfo(values), {
    onError: () => {
      handleErrorToastFromServer();
    },
    onSuccess: () => {
      navigate(slugs.additionalInfos);
    },
    retry: false,
  });

  const updateForm = useMutation((values: Info) => api.updateAdditionalInfo(id!, values), {
    onError: () => {
      handleErrorToastFromServer();
    },
    onSuccess: () => {
      navigate(slugs.additionalInfos);
    },
    retry: false,
  });

  const initialValues: Info = {
    name: additionalInfo?.name || '',
    nameEn: additionalInfo?.nameEn || '',
    icon: additionalInfo?.icon || '',
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
              <AdditionalInfoIcons
                error={errors?.icon}
                selectedIcon={values.icon}
                handleSelect={(icon) => handleChange('icon', icon)}
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
      validationSchema={validateAdditionalInfo}
    />
  );
};

export default AdditionalInfoForm;
