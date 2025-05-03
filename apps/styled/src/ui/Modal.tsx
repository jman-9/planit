// components/ui/Modal.tsx
import styled from "styled-components";
import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  padding-top: 1.5rem;
  min-width: 300px;
  max-width: min(90vw, 1000px);
  max-height: 90vh;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 1001;

  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
`;

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <Overlay>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        {children}
      </ModalBox>
    </Overlay>
  );
}
