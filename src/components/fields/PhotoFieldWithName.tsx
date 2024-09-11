import { useState } from 'react';
import styled from 'styled-components';
import { device } from '../../styles';
import { handleErrorToastFromServer } from '../../utils/functions';
import { buttonsTitles, inputLabels } from '../../utils/texts';
import Icon from '../other/Icons';
import LoaderComponent from '../other/LoaderComponent';
import TextField from './TextField';

export interface PhotoFieldWithNameProps {
  photo: File | any;
  handleDelete?: (index: number, id: string) => void;
  disabled?: boolean;
  index: number;
  getSrc: (photo: any) => string;
  getName: (photo: any) => string;
  getAuthor: (photo: any) => string;
  onChangeAuthor: (input: string) => void;
  onChangeName: (input: string) => void;
}

const PhotoFieldWithName = ({
  handleDelete,
  disabled = false,
  index,
  photo,
  getSrc,
  getName,
  getAuthor,
  onChangeAuthor,
  onChangeName,
}: PhotoFieldWithNameProps) => {
  const [loading, setLoading] = useState(true);
  const isMain = photo.main;

  const handleDeleteClickClick = (e: any) => {
    e.stopPropagation();
    if (!handleDelete) return;

    handleDelete(index, photo.id);
  };
  return (
    <ImageContainer key={`photo-${index}`}>
      <LabelRow>
        <ButtonRow onClick={handleDeleteClickClick}>
          <StyledIcon name="deleteItem" />
          <ButtonText>{buttonsTitles.delete}</ButtonText>
        </ButtonRow>
      </LabelRow>
      <ContentRow>
        <StyledImg
          onError={() => {
            handleErrorToastFromServer('photoNotUploaded');
            setLoading(false);
          }}
          display={!loading}
          disabled={disabled}
          key={index}
          src={getSrc(photo)}
          onLoad={() => setLoading(false)}
        />
        <TextField
          label={inputLabels.name}
          disabled={disabled}
          value={getName(photo)}
          name="name"
          onChange={(name) => onChangeName(name)}
        />
        <TextField
          label={inputLabels.author}
          disabled={disabled}
          value={getAuthor(photo)}
          name="author"
          onChange={(author) => onChangeAuthor(author)}
        />
      </ContentRow>
      {loading && (
        <ImageLayer>
          <LoaderComponent />
        </ImageLayer>
      )}
    </ImageContainer>
  );
};

const StyledIcon = styled(Icon)`
  cursor: pointer;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.danger};
  margin-right: 8px;
  @media ${device.mobileL} {
    margin: 0;
  }
`;

const ButtonText = styled.div`
  font-size: 1.4rem;
  line-height: 17px;
  color: #4b5565;
`;

const ButtonRow = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 11px 1fr;
  gap: 11px;
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageLayer = styled.div`
  transition: 0.5s ease;
  opacity: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainPhotoText = styled.div`
  font-size: 1.4rem;
  cursor: pointer;
  line-height: 17px;
  color: #4b5565;
`;

const StyledImg = styled.img<{
  disabled: boolean;
  display: boolean;
}>`
  height: 64px;
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
  opacity: 1;
  display: ${({ display }) => (display ? 'block' : 'none')};
  max-width: 100%;
  transition: 0.5s ease;
  backface-visibility: hidden;
  max-width: 100%;
`;

const ImageContainer = styled.div<{}>`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f8fafc;
  border-radius: 4px;
  padding: 18px 16px 18px 16px;
`;

export const ContentRow = styled.div<{ columns?: number }>`
  display: grid;
  margin-top: 16px;
  grid-template-columns: 100px 1fr 1fr;
  gap: 16px;
  @media ${device.mobileL} {
    grid-template-columns: 1fr;
  }
`;

export default PhotoFieldWithName;
