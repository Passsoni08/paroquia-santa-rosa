---
name: frontend-page
description: Gera uma página React completa com styled components seguindo o tema e padrões do projeto
allowed-tools: Read Grep Glob Write Edit Bash
---

# Criar página frontend: $ARGUMENTS

Consulte `prompt-igreja-catolica-v3.md` para os detalhes da página solicitada.

## Passos

1. **Leia os arquivos existentes** para entender os padrões:
   - `frontend/src/styles/theme.js` — cores, fontes, breakpoints
   - Páginas já criadas em `frontend/src/pages/` — padrão de estrutura
   - `frontend/src/services/api.js` — como fazer chamadas à API

2. **Determine o tipo de página**:
   - **Pública**: usa `Layout` (Navbar + Footer)
   - **Admin** (prefixo `Admin`): usa `AdminLayout` (sidebar), protegida por `PrivateRoute`

3. **Crie o arquivo da página** em `frontend/src/pages/$ARGUMENTS.jsx`:
   - Import do styled-components
   - Usar valores do `theme` via props (ex: `${({ theme }) => theme.colors.primary}`)
   - Se consome API: usar hooks existentes ou criar service em `services/`
   - `AbortController` em useEffect com fetch
   - Skeleton loader durante carregamento
   - Responsivo mobile-first
   - SEO: `document.title` no useEffect

4. **Styled Components**: definir no mesmo arquivo ou em `$ARGUMENTS.styles.js` se complexo.
   - Usar cores do tema: bordô `#7B1C1C`, dourado `#C9A84C`, creme `#FDFAF5`
   - Fontes: Playfair Display (títulos), Lato (corpo)
   - Breakpoints do tema para responsividade

5. **Registre a rota** em `frontend/src/routes/AppRoutes.jsx`:
   - Pública: rota direta com `Layout`
   - Admin: envolver com `PrivateRoute` e `AdminLayout`
   - Usar `React.lazy` para lazy loading

6. **Verifique** com `cd frontend && npx eslint src/pages/$ARGUMENTS.jsx`.
