import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../state/hooks";
import { actions } from "../../state/modal/reducer";
import { device } from "../../styles";
import { FeatureCollection } from "../../types";
import { url } from "../../utils/texts";
import Button from "../buttons/Button";
import { ErrorMessage } from "./ErrorMessage";
import Icon from "./Icons";

export interface MapProps {
  height?: string;
  onSave?: (data: any) => void;
  onClose?: () => void;
  error?: string;
  queryString?: string;
  value?: FeatureCollection;
  showError?: boolean;
}

const DrawMap = ({
  height,
  onSave,
  error,
  onClose,
  queryString = "",
  value,
  showError = true
}: MapProps) => {
  const [showModal, setShowModal] = useState(false);
  const iframeRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  const src = `${url.DRAW}${queryString}`;

  const handleLoadMap = () => {
    if (!value) return;

    iframeRef?.current?.contentWindow?.postMessage({ geom: value }, "*");
  };

  const handleSaveGeom = useCallback((event) => {
    if (!event?.data?.mapIframeMsg) return;

    const userObjects = JSON.parse(event?.data?.mapIframeMsg?.data);

    if (!userObjects) return;

    onSave && onSave(userObjects);
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleSaveGeom);
    return () => window.removeEventListener("message", handleSaveGeom);
  }, []);

  useEffect(() => {
    dispatch(actions.setModal(showModal));
  }, [showModal]);

  return (
    <>
      <Container showModal={showModal} error={!!error}>
        <InnerContainer showModal={showModal}>
          <StyledButton
            popup={showModal}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (!!onClose) {
                return onClose();
              }

              setShowModal(!showModal);
            }}
          >
            <StyledIconContainer>
              <StyledIcon name={showModal ? "exitFullScreen" : "fullscreen"} />
            </StyledIconContainer>
          </StyledButton>
          <StyledIframe
            allow="geolocation *"
            ref={iframeRef}
            src={src}
            width={"100%"}
            height={showModal ? "100%" : `${height || "230px"}`}
            style={{ border: 0 }}
            allowFullScreen={true}
            onLoad={handleLoadMap}
            aria-hidden="false"
            tabIndex={1}
          />
        </InnerContainer>
      </Container>
      {showError && <ErrorMessage error={error} />}
    </>
  );
};

const Container = styled.div<{
  showModal: boolean;
  error: boolean;
}>`
  width: 100%;
  ${({ showModal }) =>
    showModal &&
    `
  height: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #0b1b607a;
  top: 0;
  left: 0;
  overflow-y: auto;
  z-index: 1001;
  
  `}
  ${({ theme, error }) => error && `border: 1px solid ${theme.colors.error};`}
`;

const InnerContainer = styled.div<{
  showModal: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ showModal }) =>
    showModal &&
    `
    padding: 16px;
  `}

  @media ${device.mobileL} {
    padding: 0;
  }
`;

const StyledIframe = styled.iframe<{
  height: string;
  width: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const StyledButton = styled(Button)<{ popup: boolean }>`
  position: absolute;
  z-index: 10;
  top: ${({ popup }) => (popup ? 30 : 15)}px;
  right: ${({ popup }) => (popup ? 28 : 11)}px;
  min-width: 28px;

  height: 28px;
  @media ${device.mobileL} {
    top: 80px;
    right: 10px;
  }
  button {
    border-color: #e5e7eb;
    background-color: white !important;
    width: 30px;
    height: 30px;
    padding: 0;
    box-shadow: 0px 18px 41px #121a5529;
  }
`;

const StyledIcon = styled(Icon)`
  font-size: 3rem;
  color: #6b7280;
`;

const StyledIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default DrawMap;
