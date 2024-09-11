import { isEmpty } from 'lodash';
import { useState } from 'react';
import styled from 'styled-components';
import { device } from '../../styles';
import { handleErrorToastFromServer, validateFileTypes } from '../../utils/functions';
import { inputLabels } from '../../utils/texts';
import Icon from '../other/Icons';
import Loader from '../other/Loader';
import FieldWrapper from './components/FieldWrapper';
import PhotoFieldWithName from './PhotoFieldWithName';

export const availableMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];

export interface PhotoUploadFieldProps {
  name: string;
  photos: File[] | any[];
  onChange?: (files: File[]) => void;
  onUpload?: (files: File[]) => void;
  handleDelete?: (index: number, id: string) => void;
  onImageClick?: (files: File[]) => void;
  onChangeAuthor: (input: string, index: number) => void;
  onChangeName: (input: string, index: number) => void;
  disabled?: boolean;
  canOpenPhoto?: boolean;
  getSrc: (photo: any) => string;
  getName: (photo: any) => string;
  getAuthor: (photo: any) => string;
  error?: string;
  showError?: boolean;
}
export const availablePhotoMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const PhotoFieldWithNames = ({
  photos,
  name,
  disabled = false,
  handleDelete,
  onChangeAuthor,
  onChangeName,
  getName,
  getAuthor,
  onUpload,
  getSrc,
  error,
  showError = true,
}: PhotoUploadFieldProps) => {
  const [loading, setLoading] = useState(false);

  const handleSetFiles = async (currentFiles: File[]) => {
    const isValidFileTypes = validateFileTypes(currentFiles, availableMimeTypes);
    if (!isValidFileTypes) return handleErrorToastFromServer('badFileTypes');
    if (onUpload) {
      setLoading(true);
      await onUpload(currentFiles);
      setLoading(false);
    }
  };

  return (
    <FieldWrapper error={error} showError={showError}>
      <Container>
        {photos.map((photo: File | any, index: number) => {
          if (!photo) return;

          return (
            <PhotoFieldWithName
              disabled={disabled}
              photo={photo}
              handleDelete={handleDelete}
              index={index}
              getSrc={getSrc}
              getName={getName}
              getAuthor={getAuthor}
              onChangeAuthor={(input) => onChangeAuthor(input, index)}
              onChangeName={(input) => onChangeName(input, index)}
            />
          );
        })}

        {loading && (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        )}

        {!disabled && (
          <UploadFieldContainer error={!!error}>
            <UploadFieldInnerContainer>
              <StyledIcon name="addPhoto" />
              <StyledText>{inputLabels.uploadPhotosWithNames}</StyledText>
            </UploadFieldInnerContainer>
            <StyledInput
              disabled={disabled}
              value={undefined}
              multiple={true}
              type="file"
              accept="image/*"
              name={name}
              onChange={(e: any) => {
                const files: File[] = Array.from(e?.target?.files);
                if (isEmpty(files)) return;

                handleSetFiles(files);
              }}
            />
          </UploadFieldContainer>
        )}
      </Container>
    </FieldWrapper>
  );
};

const LoaderContainer = styled.div`
  height: 36px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadFieldInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  @media ${device.mobileL} {
    width: 100%;
  }
`;

const StyledInput = styled.input``;

const StyledText = styled.div`
  color: #b55007;
  font-size: 1.6rem;
  line-height: 18px;
`;

const UploadFieldContainer = styled.div<{
  error: boolean;
}>`
  border-width: 1px;
  border-color: ${({ error }) => (error ? 'red' : '#CDD5DF')};
  border-style: ${({ error }) => (error ? 'solid' : 'dashed')};
  width: 100%;
  padding: 4px;
  border-radius: 4px;
  position: relative;
  background-color: white;
  input {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    cursor: pointer;
    opacity: 0;
    width: 100%;
    height: 36px;
  }
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  font-size: 2.4rem;
  color: #b55007;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

export default PhotoFieldWithNames;
