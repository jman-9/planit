import styled from 'styled-components';

type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  size?: ButtonSize;
}

const sizeStyles = {
  small: {
    fontSize: '1.6rem',
    padding: '0.1rem 0.75rem',
    minHeight: '32px',
    minWidth: '80px',
  },
  medium: {
    fontSize: '2rem',
    lineHeight: '0',
    padding: '0.1rem 1rem',
    minHeight: '40px',
    minWidth: '100px',
  },
  large: {
    fontSize: '2.50rem',
    padding: '0.1rem 1.5rem',
    minHeight: '48px',
    minWidth: '120px',
  },
};

const RoundedButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: inherit;
  font-weight: 100;
  font-size: ${({ size = 'medium' }) => sizeStyles[size].fontSize};
  padding: ${({ size = 'medium' }) => sizeStyles[size].padding};
  min-height: ${({ size = 'medium' }) => sizeStyles[size].minHeight};
  min-width: ${({ size = 'medium' }) => sizeStyles[size].minWidth};
  border: 1px solid #333;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #099;
  }
`;

export default RoundedButton;
