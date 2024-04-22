import { isEmpty } from 'lodash';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import AdditionalButtons from '../../../components/buttons/AdditionalButtons';
import ButtonsGroup from '../../../components/buttons/ButtonsGroup';
import CheckBox from '../../../components/buttons/Checkbox';
import AsyncMultiSelect from '../../../components/fields/AsyncMultiSelect';
import AsyncSelectField from '../../../components/fields/AsyncSelect';
import MultiSelect from '../../../components/fields/MultiSelect';
import NumericTextField from '../../../components/fields/NumericTextField';
import PhotoFieldWithNames from '../../../components/fields/PhotoUploadFieldWithNames';
import TextAreaField from '../../../components/fields/TextAreaField';
import TextField from '../../../components/fields/TextField';
import DrawMap from '../../../components/other/DrawMap';
import LoaderComponent from '../../../components/other/LoaderComponent';
import SimpleContainer from '../../../components/other/SimpleContainer';
import FormPageWrapper from '../../../components/wrappers/FormPageWrapper';
import { ColumnOne, ColumnTwo, FormContainer, FormRow } from '../../../styles/CommonStyles';
import { DeleteInfoProps, FeatureCollection } from '../../../types';
import { handleError, isNew } from '../../../utils/functions';
import FormHistoryContainer from '../component/containers/FormHistory';

import Switch from '../component/buttons/Switch';
import FormPopup from '../component/other/FormPopup';
import { default as api } from '../utils/api';
import { Season, StatusTypes } from '../utils/constants';
import {
  getAdditionalInfoOption,
  getCategoriesOptions,
  getSubCategoriesOptions,
  getVisitInfoOptions,
} from '../utils/functions';
import { getSeasonOptions } from '../utils/options';

import { slugs } from '../utils/slugs';
import {
  buttonsTitles,
  deleteDescriptionFirstPart,
  deleteDescriptionSecondPart,
  deleteTitles,
  formHistoryLabels,
  formLabels,
  inputLabels,
  pageTitles,
  seasonLabels,
} from '../utils/texts';
import { Category, Info, VisitDuration } from '../utils/types';
import { validateForm } from '../utils/validation';

interface FormProps {
  visitDuration?: VisitDuration;
  descriptionLT: string;
  comment?: string;
  status?: StatusTypes;
  description: string;
  nameLT: string;
  name: string;
  urlLT: string;
  url: string;
  additionalInfos?: Info[];
  visitInfo?: Info;
  geom?: FeatureCollection;
  isPaid: boolean;
  isAdaptedForForeigners: boolean;
  seasons: Season[];
  categories: Category[];
  subCategories: Category[];
  photos: any[];
}

const FormPage = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const seasonOptions = getSeasonOptions();
  const queryClient = useQueryClient();

  const { data: form, isLoading } = useQuery(['tourismForm', id], () => api.getForm(id), {
    onError: () => {
      navigate(slugs.forms);
    },
    enabled: !isNew(id),
  });

  const disabled = !isNew(id) && !form?.canEdit;
  const canValidate = form?.canValidate;
  const title = isNew(id) ? pageTitles.newForm : form?.nameLT!;

  const mapQueryString = !disabled ? '?types[]=point' : '?preview=true';
  const createForm = useMutation(
    (values: { [key: string]: any }) =>
      isNew(id) ? api.createForm(values) : api.updateForm(id, values),
    {
      onError: () => {
        handleError();
      },
      onSuccess: () => {
        navigate(slugs.forms);
      },
      retry: false,
    },
  );

  const disable = useMutation(() => api.formDisable(id), {
    onError: () => {
      handleError();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tourismForm']);
    },
    retry: false,
  });
  const removeForm = useMutation(() => api.deleteForm(id), {
    onError: () => {
      handleError();
    },
    onSuccess: () => {
      navigate(slugs.forms);
    },
    retry: false,
  });

  const deleteInfo: DeleteInfoProps = {
    deleteButtonText: buttonsTitles.removeForm,
    deleteDescriptionFirstPart: deleteDescriptionFirstPart.delete,
    deleteDescriptionSecondPart: deleteDescriptionSecondPart.form,
    deleteTitle: deleteTitles.form,
    deleteName: title,
    handleDelete: !isNew(id) ? removeForm.mutateAsync : undefined,
  };

  const uploadPhotos = useMutation((files: File[]) => api.uploadFormPhotos(files), {
    onError: () => {
      handleError();
    },
    onSuccess: () => {},
    retry: false,
  });

  const getIds = (items?: any[]) => (isEmpty(items) ? [] : items?.map((item) => item.id));

  const handleSubmit = async (values: FormProps) => {
    const seasons = values.seasons.includes(Season.ALL) ? [] : values.seasons;

    const params = {
      ...values,
      seasons,
      visitInfo: values?.visitInfo?.id,
      additionalInfos: getIds(values.additionalInfos),
      categories: getIds(values.categories),
      subCategories: getIds(values.subCategories),
    };

    if (canValidate) {
      return await createForm.mutateAsync({
        status: values.status,
        comment: values.comment,
      });
    }

    return await createForm.mutateAsync(params);
  };

  const getSeasons = () => {
    if (isNew(id)) return [];

    if (isEmpty(form?.seasons)) return [Season.ALL];

    return form?.seasons!;
  };

  const initialValues: FormProps = {
    categories: form?.categories || [],
    visitInfo: form?.visitInfo,
    seasons: getSeasons(),
    visitDuration: form?.visitDuration,
    descriptionLT: form?.descriptionLT || '',
    description: form?.description || '',
    nameLT: form?.nameLT || '',
    name: form?.name || '',
    urlLT: form?.urlLT || '',
    url: form?.url || '',
    additionalInfos: form?.additionalInfos || [],
    geom: form?.geom,
    isPaid: form?.isPaid || false,
    isAdaptedForForeigners: form?.isAdaptedForForeigners || false,
    subCategories: form?.subCategories || [],
    photos: form?.photos || [],
    status: undefined,
    comment: '',
  };

  if (isLoading) {
    return <LoaderComponent />;
  }

  const additionalButtons = (handleChange) => {
    return <AdditionalButtons handleChange={handleChange} />;
  };

  const showSwitch = form?.status === StatusTypes.APPROVED;

  const renderForm = (values: FormProps, errors: any, handleChange: any) => {
    const hasCategories = !isEmpty(values?.categories);

    const getSeasonOptions = () => {
      if (values.seasons.includes(Season.ALL)) {
        return [];
      }

      if (!isEmpty(values.seasons)) {
        return seasonOptions.filter((item) => item !== Season.ALL);
      }

      return seasonOptions;
    };

    const handleRemovePhoto = async (index) => {
      handleChange('photos', [
        ...values.photos?.slice(0, index as number),
        ...values.photos?.slice((index as number) + 1),
      ]);
    };

    const handleUpload = async (photos: File[]) => {
      const uploadedPhotos = await uploadPhotos.mutateAsync(photos);

      handleChange('photos', [...values.photos, ...uploadedPhotos]);
    };

    return (
      <>
        {showSwitch && (
          <SwitchContainer>
            <Switch
              checked={form?.isActive}
              enabledLabel={'Aktyvus objektas'}
              disabledLabel={'Objektas laikinai neveikia'}
              onChange={disable.mutateAsync}
            />
          </SwitchContainer>
        )}
        <FormContainer>
          <ColumnOne>
            <SimpleContainer title={formLabels.categories}>
              <FormRow columns={hasCategories ? 2 : 1}>
                <AsyncMultiSelect
                  label={inputLabels.categories}
                  values={values?.categories}
                  disabled={disabled}
                  error={errors.categories}
                  name="categories"
                  onChange={(categories) => {
                    handleChange('categories', categories);
                    handleChange('subCategories', []);
                  }}
                  getOptionLabel={(option) => option?.name}
                  loadOptions={(input, page) => getCategoriesOptions(input, page)}
                />
                {hasCategories && (
                  <AsyncMultiSelect
                    label={inputLabels.subCategories}
                    dependantValue={values?.categories?.map((item) => item?.id)}
                    values={values?.subCategories}
                    disabled={disabled}
                    error={errors.subCategories}
                    name="subCategories"
                    onChange={(categories) => {
                      handleChange('subCategories', categories);
                    }}
                    getOptionLabel={(option) => option?.name}
                    loadOptions={(input, page, ids) => {
                      return getSubCategoriesOptions(input, page, ids);
                    }}
                  />
                )}
              </FormRow>
            </SimpleContainer>
            <SimpleContainer title={formLabels.LTInfo}>
              <FormRow columns={2}>
                <TextField
                  label={inputLabels.name}
                  value={values?.nameLT}
                  error={errors?.nameLT}
                  disabled={disabled}
                  name="nameLT"
                  onChange={(nameLT) => handleChange('nameLT', nameLT)}
                />
                <TextField
                  label={inputLabels.url}
                  value={values?.urlLT}
                  error={errors?.urlLT}
                  disabled={disabled}
                  placeholder={'https://www.test.lt'}
                  name="urlLT"
                  onChange={(objectName) => handleChange('urlLT', objectName)}
                />
              </FormRow>
              <FormRow columns={1}>
                <TextAreaField
                  value={values.descriptionLT}
                  disabled={disabled}
                  error={errors?.descriptionLT}
                  label={inputLabels.description}
                  name={'descriptionLT'}
                  onChange={(e) => handleChange('descriptionLT', e)}
                />
              </FormRow>
            </SimpleContainer>

            <SimpleContainer title={formLabels.EnInfo}>
              <FormRow columns={2}>
                <TextField
                  label={inputLabels.name}
                  disabled={disabled}
                  value={values?.name}
                  error={errors?.name}
                  name="name"
                  onChange={(nameLT) => handleChange('name', nameLT)}
                />
                <TextField
                  label={inputLabels.url}
                  value={values?.url}
                  error={errors?.url}
                  disabled={disabled}
                  name="url"
                  onChange={(url) => handleChange('url', url)}
                  placeholder={'https://www.test.lt'}
                />
              </FormRow>
              <FormRow columns={1}>
                <TextAreaField
                  value={values.description}
                  error={errors?.description}
                  label={inputLabels.description}
                  disabled={disabled}
                  name={'description'}
                  onChange={(e) => handleChange('description', e)}
                />
              </FormRow>
            </SimpleContainer>
            <SimpleContainer title={formLabels.map}>
              <DrawMap
                queryString={mapQueryString}
                error={errors?.geom}
                onSave={(data) => handleChange('geom', data)}
                value={values?.geom!}
                height={'300px'}
              />
            </SimpleContainer>
            <SimpleContainer title={formLabels.photos}>
              <PhotoFieldWithNames
                name={'photos'}
                photos={values.photos ? values.photos : []}
                handleDelete={handleRemovePhoto}
                onUpload={handleUpload}
                disabled={disabled}
                getSrc={(photo) => photo.url}
                getName={(photo) => photo.name}
                getAuthor={(photo) => photo.author}
                onChangeAuthor={(input, index) => handleChange(`photos.${index}.author`, input)}
                onChangeName={(input, index) => handleChange(`photos.${index}.name`, input)}
              />
            </SimpleContainer>
            <SimpleContainer title={formLabels.additionalInfo}>
              <FormRow columns={2}>
                <MultiSelect
                  label={inputLabels.season}
                  values={values?.seasons}
                  disabled={disabled}
                  error={errors?.seasons}
                  name="seasons"
                  onChange={(seasons) => handleChange('seasons', seasons)}
                  getOptionLabel={(option) => seasonLabels[option]}
                  getOptionValue={(option) => option}
                  options={getSeasonOptions()}
                />
                <AsyncSelectField
                  label={inputLabels.visitInfo}
                  value={values?.visitInfo}
                  disabled={disabled}
                  error={errors?.visitInfo}
                  name="visitInfo"
                  onChange={(visitInfo) => handleChange('visitInfo', visitInfo)}
                  getOptionLabel={(option) => option?.name}
                  loadOptions={(input: string, page: number) => getVisitInfoOptions(input, page)}
                />

                <AsyncMultiSelect
                  label={inputLabels.additionalInfo}
                  values={values?.additionalInfos}
                  error={errors?.additionalInfos}
                  disabled={disabled}
                  name="additionalInfos"
                  onChange={(additionalInfos) => handleChange('additionalInfos', additionalInfos)}
                  getOptionLabel={(option) => option?.name}
                  loadOptions={(input: string, page: number) =>
                    getAdditionalInfoOption(input, page)
                  }
                />
                <ButtonsGroup
                  label={inputLabels.priceStatus}
                  options={[true, false]}
                  disabled={disabled}
                  onChange={(e) => {
                    handleChange('isPaid', e);
                  }}
                  isSelected={(option) => option === values?.isPaid}
                  getOptionLabel={(option) => {
                    return option ? 'Mokama' : 'Nemokama';
                  }}
                />
                <ButtonsGroup
                  disabled={disabled}
                  label={inputLabels.isAdaptedForForeigners}
                  options={[true, false]}
                  onChange={(e) => {
                    handleChange('isAdaptedForForeigners', e);
                  }}
                  isSelected={(option) => option === values?.isAdaptedForForeigners}
                  getOptionLabel={(option) => {
                    return option ? 'Taip' : 'Ne';
                  }}
                />
              </FormRow>
            </SimpleContainer>
            <SimpleContainer title={formLabels.visitDuration}>
              <FormRow columns={5}>
                <NumericTextField
                  label={inputLabels.from}
                  disabled={disabled}
                  value={values?.visitDuration?.from}
                  error={errors?.visitDuration?.from}
                  name="from"
                  onChange={(nameLT) => handleChange('visitDuration.from', nameLT)}
                />
                <NumericTextField
                  label={inputLabels.to}
                  value={values?.visitDuration?.to}
                  disabled={disabled}
                  error={errors?.visitDuration?.to}
                  name="visitDuration?.to"
                  onChange={(objectName) => handleChange('visitDuration.to', objectName)}
                />
              </FormRow>
              <FormRow columns={1}>
                <CheckBox
                  value={values?.visitDuration?.isAllDay}
                  disabled={disabled}
                  label={inputLabels.allDay}
                  onChange={(value) => {
                    handleChange('visitDuration.isAllDay', value);
                  }}
                />
              </FormRow>
            </SimpleContainer>
          </ColumnOne>
          {!isNew(id) && (
            <ColumnTwo>
              <FormHistoryContainer
                formHistoryLabels={formHistoryLabels}
                endpoint={api.getFormHistory}
                name={`formHistory-${id}`}
              />
            </ColumnTwo>
          )}
          <FormPopup onChange={handleChange} comment={values?.comment} status={values?.status!} />
        </FormContainer>
      </>
    );
  };
  if (isLoading) {
    return <LoaderComponent />;
  }
  return (
    <FormPageWrapper
      title={title}
      twoColumn={!isNew(id)}
      initialValues={initialValues}
      additionalButtons={canValidate ? additionalButtons : undefined}
      onSubmit={handleSubmit}
      renderForm={renderForm}
      validationSchema={validateForm}
      deleteInfo={deleteInfo}
    />
  );
};

const SwitchContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export default FormPage;
