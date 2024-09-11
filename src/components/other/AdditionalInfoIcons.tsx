import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import api from '../../modules/tourism/utils/api';
import {
  handleErrorToast,
  handleErrorToastFromServer,
  validateFileTypes,
} from '../../utils/functions';
import { inputLabels, validationTexts } from '../../utils/texts';
import FieldWrapper from '../fields/components/FieldWrapper';
import Icon, { IconProps } from './Icons';
import LoaderComponent from './LoaderComponent';

interface AnimalIconsProps {
  error?: string;
  selectedIcon?: IconProps | string;
  handleSelect: (icon: string) => void;
}

export const AdditionalInfoIcons = ({ error, selectedIcon, handleSelect }: AnimalIconsProps) => {
  const queryClient = useQueryClient();
  const { data: icons, isLoading } = useQuery(
    ['additionalInfoIcons'],
    () => api.getAnimalIcons(),
    {},
  );

  const createIcon = useMutation((values: File) => api.createIcon(values), {
    onError: () => {
      handleErrorToastFromServer();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['additionalInfoIcons']);
    },
    retry: false,
  });

  const deleteIcon = useMutation((id: string) => api.deleteIcon(id), {
    onError: () => {
      handleErrorToastFromServer();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['additionalInfoIcons']);
    },
    retry: false,
  });

  const handleUploadIcon = async (file) => {
    const isValidFileTypes = validateFileTypes([file], ['image/svg+xml']);
    if (!isValidFileTypes) return handleErrorToast(validationTexts.badFileTypes);

    createIcon.mutateAsync(file);
  };

  const handleDeleteIcon = async (id: string) => {
    deleteIcon.mutateAsync(id);
  };

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <Container>
      <FieldWrapper error={error} label={inputLabels.selectIcon}>
        <InnerContainer>
          {icons.map((icon, index) => {
            const isSelectedIcon = icon.id === selectedIcon;

            return (
              <IconContainer
                key={`animal-icon-${index}`}
                selected={isSelectedIcon}
                onClick={() => handleSelect(icon.id)}
              >
                <StyledCloseIconContainer
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteIcon(icon.id);
                  }}
                >
                  <StyledCloseIcon name="close" />
                </StyledCloseIconContainer>

                <AnimalIcon src={icon.url} />
              </IconContainer>
            );
          })}
          <FileInputContainer type="button" error={!!error}>
            <StyledIcon name="plus" />
            <StyledInput
              value={undefined}
              type="file"
              accept=".svg"
              name={'icons'}
              onChange={(e) => handleUploadIcon(e.target.files?.[0])}
            />
          </FileInputContainer>
        </InnerContainer>
      </FieldWrapper>
    </Container>
  );
};

const FileInputContainer = styled.button<{
  error: boolean;
}>`
  width: 48px;
  height: 48px;

  background-color: #f8fafc;
  position: relative;
  border: 1px dashed #cdd5df;
  border-radius: 4px;
  opacity: 1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  input[type='file'] {
    cursor: pointer;
  }
`;

const StyledCloseIcon = styled(Icon)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.danger};
`;

const StyledCloseIconContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  opacity: 0;
  display: none;
  cursor: pointer;
  z-index: 10;
`;

const IconContainer = styled.div<{ selected: boolean }>`
  border: ${({ selected }) => (selected ? '1px solid #004650' : 'none ')};
  width: 48px;
  height: 48px;
  padding: 5px;
  background-color: #edf1f2;
  position: relative;
  border-radius: 4px;
  opacity: 1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover ${StyledCloseIconContainer} {
    opacity: 1;
    display: block;
  }
`;

export const AnimalIcon = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const StyledInput = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  width: 48px;
  height: 48px;
`;

const StyledIcon = styled(Icon)`
  font-size: 2.4rem;
  color: #a5b9c0;
`;

const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
  gap: 10px;
  padding-top: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;
