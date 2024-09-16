import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import AsyncSelect from '../../../components/fields/AsyncSelect';
import TextField from '../../../components/fields/TextField';
import LoaderComponent from '../../../components/other/LoaderComponent';
import SimpleContainer from '../../../components/other/SimpleContainer';
import FormPageWrapper from '../../../components/wrappers/FormPageWrapper';
import { ColumnOne, FormRow, InnerContainer } from '../../../styles/CommonStyles';
import { handleErrorToastFromServer, isNew } from '../../../utils/functions';
import api from '../utils/api';
import { getCategoriesOptions } from '../utils/functions';
import { slugs } from '../utils/slugs';
import { formLabels, inputLabels, pageTitles } from '../utils/texts';
import { Category } from '../utils/types';
import { validateInfo } from '../utils/validation';

export interface CategoryProps {
  name: string;
  nameEn: string;
  parent?: Category;
}

const CategoryForm = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();

  const { data: category, isLoading } = useQuery(['category', id], () => api.getCategory(id), {
    onError: () => {
      navigate(slugs.categories);
    },
    enabled: !isNew(id),
  });

  const title = isNew(id) ? pageTitles.newCategory : pageTitles.updateCategory;

  const handleSubmit = async (values: CategoryProps) => {
    const params = {
      ...values,
      parent: values.parent?.id,
    };
    if (isNew(id)) {
      return await createForm.mutateAsync(params);
    }

    return await updateForm.mutateAsync(params);
  };

  const createForm = useMutation((values: { [key: string]: any }) => api.createCategory(values), {
    onError: () => {
      handleErrorToastFromServer();
    },
    onSuccess: () => {
      navigate(slugs.categories);
    },
    retry: false,
  });

  const updateForm = useMutation(
    (values: { [key: string]: any }) => api.updateCategory(id!, values),
    {
      onError: () => {
        handleErrorToastFromServer();
      },
      onSuccess: () => {
        navigate(slugs.categories);
      },
      retry: false,
    },
  );

  const initialValues: CategoryProps = {
    name: category?.name || '',
    nameEn: category?.nameEn || '',
    parent: category?.parent,
  };

  const renderForm = (values: CategoryProps, errors: any, handleChange) => {
    return (
      <InnerContainer>
        <ColumnOne>
          <SimpleContainer title={formLabels.info}>
            <FormRow columns={1}>
              <AsyncSelect
                label={inputLabels.parentCategory}
                value={values?.parent}
                name="parent"
                onChange={(category) => {
                  handleChange('parent', category);
                }}
                getOptionLabel={(option) => option?.name}
                loadOptions={(input, page) => getCategoriesOptions(input, page)}
              />
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
                name="image.png"
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

export default CategoryForm;
