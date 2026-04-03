---
name: frontend-component
description: Gera um componente React reutilizável com styled components seguindo o tema e padrões do projeto
allowed-tools: Read Grep Glob Write Edit Bash
---

# Criar componente frontend: $ARGUMENTS

Consulte `prompt-igreja-catolica-v3.md` para os detalhes do componente solicitado.

## Passos

1. **Leia os arquivos existentes** para entender os padrões:
   - `frontend/src/styles/theme.js` — cores, fontes, breakpoints
   - Componentes já criados em `frontend/src/components/` — padrão de estrutura
   - Hooks em `frontend/src/hooks/` — reutilizar hooks existentes

2. **Crie o componente** em `frontend/src/components/$ARGUMENTS.jsx`:
   - Componente funcional com export default
   - Props tipadas via destructuring
   - Styled Components usando valores do `theme`
   - Acessibilidade: aria-labels, roles, foco visível
   - Responsivo mobile-first com breakpoints do tema

3. **Se o componente consome dados**:
   - Dados estáticos: importar de `constants/`
   - Dados da API: usar hooks existentes ou services
   - AbortController se useEffect com fetch
   - Estado de loading com skeleton

4. **Styled Components**:
   - Cores: bordô `#7B1C1C`, dourado `#C9A84C`, creme `#FDFAF5`
   - Fontes: Playfair Display (títulos), Lato (corpo), Cinzel (destaque)
   - Sempre via theme props: `${({ theme }) => theme.colors.primary}`

5. **Verifique** com `cd frontend && npx eslint src/components/$ARGUMENTS.jsx`.
