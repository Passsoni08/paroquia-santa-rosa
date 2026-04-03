import styled, { css } from 'styled-components';

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textLight};
    &:hover { background: ${({ theme }) => theme.colors.primaryDark}; }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.textLight};
    &:hover { background: #A93226; }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textMuted};
    border: 1px solid ${({ theme }) => theme.colors.border};
    &:hover { background: ${({ theme }) => theme.admin.content}; }
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success};
    color: ${({ theme }) => theme.colors.textLight};
    &:hover { background: #1E8449; }
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  transition: background 0.2s;

  ${({ $variant }) => variants[$variant] || variants.primary}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function AdminButton({ variant = 'primary', children, ...props }) {
  return <StyledButton $variant={variant} {...props}>{children}</StyledButton>;
}
