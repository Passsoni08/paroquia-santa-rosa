import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.admin.card};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  border-bottom: 1px solid ${({ theme }) => theme.admin.topbarBorder};
  background: ${({ theme }) => theme.admin.content};
`;

const Td = styled.td`
  padding: 12px 16px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.admin.topbarBorder};
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 12px 16px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const PageBtn = styled.button`
  background: none;
  color: ${({ theme, disabled }) => disabled ? theme.colors.border : theme.colors.primary};
  font-size: 14px;
  padding: 4px;

  &:disabled { cursor: default; }
`;

export default function DataTable({ columns, data, pagina, total, limite, onPageChange }) {
  const totalPages = Math.ceil(total / limite) || 1;

  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            {columns.map((col) => (
              <Th key={col.key}>{col.label}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <Td colSpan={columns.length} style={{ textAlign: 'center', padding: 32 }}>
                Nenhum registro encontrado
              </Td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={row.id || i}>
                {columns.map((col) => (
                  <Td key={col.key}>
                    {col.render ? col.render(row) : row[col.key]}
                  </Td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {onPageChange && (
        <Pagination>
          <span>Página {pagina} de {totalPages}</span>
          <PageBtn disabled={pagina <= 1} onClick={() => onPageChange(pagina - 1)}>
            <FaChevronLeft />
          </PageBtn>
          <PageBtn disabled={pagina >= totalPages} onClick={() => onPageChange(pagina + 1)}>
            <FaChevronRight />
          </PageBtn>
        </Pagination>
      )}
    </Wrapper>
  );
}
