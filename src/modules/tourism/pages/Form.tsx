import {
  AsyncMultiSelectField,
  AsyncSelectField,
  ButtonsGroup,
  CheckBox,
  device,
  FieldWrapper,
  MapField,
  MultiSelectField,
  NumericTextField,
  SimpleContainer,
  TextAreaField,
  TextField,
} from '@aplinkosministerija/design-system';
import { TreeSelect } from 'antd';
import { isEmpty } from 'lodash';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api';
import {
  ColumnOne,
  ColumnTwo,
  Container,
  FormPageWrapper,
  FormRow,
  LoaderComponent,
  PhotoUploadFieldWithNames,
  Switch,
} from '../components';
import FormHistoryContainer from '../components/containers/History';
import Icon, { IconName } from '../components/other/Icons';
import {
  buttonsTitles,
  deleteDescriptionFirstPart,
  deleteDescriptionSecondPart,
  DeleteInfoProps,
  deleteTitles,
  descriptions,
  FeatureCollection,
  formHistoryLabels,
  formLabels,
  getAdditionalInfoOption,
  getSeasonOptions,
  getVisitInfoOptions,
  handleAlert,
  Info,
  inputLabels,
  isNew,
  mapsHost,
  pageTitles,
  Season,
  seasonLabels,
  slugs,
  StatusTypes,
  validateForm,
  VisitDuration,
} from '../utils';

interface FormProps {
  visitDuration?: VisitDuration;
  descriptionLT: string;
  comment?: string;
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
  categories: number[];
  photos: any[];
}

const FormPage = () => {
  const { SHOW_PARENT } = TreeSelect;
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const seasonOptions = getSeasonOptions();
  const queryClient = useQueryClient();

  const { data: form, isLoading } = useQuery(['form', id], () => api.getForm(id), {
    onError: () => {
      navigate(slugs.forms);
    },
    enabled: !isNew(id),
  });

  const { data: categories = [] } = useQuery(['categories'], () => api.getAllCategories({}), {});

  const showSwitch = form?.status === StatusTypes.APPROVED;

  const disabled = !isNew(id) && !form?.canEdit;
  const title = isNew(id) ? pageTitles.newForm : form?.nameLT || '';

  const mapPath = !disabled ? '/edit?types[]=point' : '/edit?preview=true';

  const removeForm = useMutation(() => api.deleteForm(id), {
    onError: () => {
      handleAlert();
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
    deleteFunction: !isNew(id) ? removeForm.mutateAsync : undefined,
  };

  const disable = useMutation(() => api.formDisable(id), {
    onError: () => {
      handleAlert();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['form', id]);
    },
    retry: false,
  });

  const createForm = useMutation(
    (values: { [key: string]: any }) =>
      !isNew(id) ? api.updateForm(id, values) : api.createForm(values),
    {
      onError: () => {
        handleAlert();
      },
      onSuccess: () => {
        navigate(slugs.forms);
      },
      retry: false,
    },
  );

  const uploadPhotos = useMutation((files: File[]) => api.uploadFormPhotos(files), {
    onError: () => {
      handleAlert();
    },
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
    };

    return await createForm.mutateAsync(params);
  };

  const getSeasons = () => {
    if (isNew(id)) return [];

    if (isEmpty(form?.seasons)) return [Season.ALL];

    return form?.seasons || [];
  };

  const initialValues: FormProps = {
    categories: form?.categories ? form.categories.map(Number) : [],
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
    photos: form?.photos || [],
  };

  if (isLoading) {
    return <LoaderComponent />;
  }

  const showPhotoContainer = !disabled || !isEmpty(form?.photos);

  const renderForm = (values: FormProps, errors: any, handleChange: any) => {
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
      if (!values?.photos) return;

      handleChange('photos', [
        ...values.photos.slice(0, index as number),
        ...values.photos.slice((index as number) + 1),
      ]);
    };

    const handleUpload = async (photos: File[]) => {
      const uploadedPhotos = await uploadPhotos.mutateAsync(photos);

      handleChange('photos', [...values.photos, ...uploadedPhotos]);
    };

    const handleTreeSelect = (newValue) => {
      const newSelection = newValue.map((nV) => nV.value);

      const updateSelection = (node) => {
        if (node?.children?.length) {
          const childValues = node.children.map((child) => child.id);
          const hasSelectedChild = childValues.some((childValue) =>
            newSelection.includes(childValue),
          );

          if (hasSelectedChild && !newSelection.includes(node.id)) {
            if (values.categories.includes(node.id)) {
              return true;
            }

            newSelection.push(node.id);
          }

          for (const child of node.children) {
            const shouldStop = updateSelection(child);
            if (shouldStop) {
              return true;
            }
          }
        }

        return false;
      };

      for (const category of categories) {
        const shouldStop = updateSelection(category);
        if (shouldStop) {
          return;
        }
      }

      handleChange('categories', newSelection);
    };

    return (
      <>
        {showSwitch && (
          <SwitchContainer>
            <Switch
              checked={form?.isActive}
              enabledLabel={'Aktyvus objektas'}
              disabledLabel={'Objektas laikinai neveikia'}
              onChange={() => {
                disable.mutateAsync();
              }}
            />
          </SwitchContainer>
        )}
        <Container>
          <ColumnOne>
            <SimpleContainer title={formLabels.categories}>
              <FormRow columns={1}>
                <TreeSelectContainer>
                  <RelativeFieldWrapper
                    error={errors.categories}
                    showError={true}
                    label={inputLabels.categories}
                  >
                    <StyledTreeSelect
                      error={errors.categories}
                      value={values?.categories || []}
                      treeData={categories}
                      style={{ width: '100%' }}
                      suffixIcon={<StyledIcons name={IconName.dropdownArrow} />}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      fieldNames={{ label: 'name', children: 'children', value: 'id' }}
                      treeCheckable
                      onChange={handleTreeSelect}
                      placeholder="Pasirinkite"
                      showCheckedStrategy={SHOW_PARENT}
                      disabled={disabled}
                    />
                  </RelativeFieldWrapper>
                </TreeSelectContainer>
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
              <MapField
                mapPath={mapPath}
                mapHost={mapsHost}
                error={errors?.geom}
                onChange={(data) => {
                  handleChange('geom', data);
                }}
                value={values?.geom}
                height={'300px'}
              />
            </SimpleContainer>
            {showPhotoContainer && (
              <SimpleContainer title={formLabels.photos}>
                <SubTItle>
                  <IconContainer>
                    <InfoIcon name={IconName.info} />
                  </IconContainer>
                  {descriptions.photoAuthor}
                </SubTItle>
                <PhotoUploadFieldWithNames
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
            )}
            <SimpleContainer title={formLabels.additionalInfo}>
              <FormRow columns={2}>
                <MultiSelectField
                  label={inputLabels.season}
                  values={values?.seasons}
                  disabled={disabled}
                  error={errors?.seasons}
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

                <AsyncMultiSelectField
                  label={inputLabels.additionalInfo}
                  name="additionalInfos"
                  values={values?.additionalInfos}
                  error={errors?.additionalInfos}
                  disabled={disabled}
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
              <SubTItle>{descriptions.durationTime}</SubTItle>
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
        </Container>
      </>
    );
  };
  if (isLoading) {
    return <LoaderComponent />;
  }
  return (
    <FormPageWrapper
      disabled={disabled}
      title={title}
      twoColumn={!isNew(id)}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      renderForm={renderForm}
      validationSchema={validateForm}
      deleteInfo={deleteInfo}
    />
  );
};

export default FormPage;

const StyledIcons = styled(Icon)`
  color: #cdd5df;
  font-size: 2.4rem;
`;

const SwitchContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const InfoIcon = styled(Icon)``;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubTItle = styled.div`
  margin-top: -8px;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 15.6px;
  color: ${({ theme }) => theme?.colors?.text?.secondary};
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
`;

const StyledTreeSelect = styled(TreeSelect)<{ error: boolean }>`
  .ant-select-selector,
  .ant-select-selection-search-input {
    min-height: ${({ theme }) => `${theme.height?.fields || 5.6}rem`} !important;
    padding: 0px 12px !important;
    font-size: ${({ theme }) => theme.fontSize?.fields || 1.6}rem;
    display: flex;
    align-items: center;
  }
  .ant-select {
    transition: none !important;
  }

  .ant-select-selector {
    border: 1px solid ${({ theme, error }) =>
      error ? theme.colors.error : theme.colors.border} !important;
    border-radius: ${({ theme }) => theme.radius?.fields || 0.4}rem; !important;
    background-color: ${({ theme }) => theme.colors.fields?.background || 'white'};
    color: ${({ theme }) => theme.colors.fields?.text || '#101010'};
  }

  .ant-select-selection-overflow-item{
    padding-top:4px;
  }

  .ant-select-selector,
  .ant-select-disabled {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
    background: white !important;
  }


  .ant-select-selector:focus-within {
    border-color: ${({ theme }) =>
      theme.colors.fields?.borderFocus || theme.colors.fields?.border || '#d4d5de'} !important;
    box-shadow: ${({ theme }) =>
      theme.colors.fields?.borderFocus
        ? `0 0 0 4px ${theme.colors.fields.borderFocus}33`
        : 'none'} !important;
    outline: none !important;
    animation-duration: 0s !important;
    transition: none !important;
  }
`;

const TreeSelectContainer = styled.div`
  display: block;
  @media ${device.mobileL} {
    border: none;
  }
`;

const RelativeFieldWrapper = styled(FieldWrapper)`
  position: relative;
`;
