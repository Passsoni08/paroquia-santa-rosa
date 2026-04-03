---
paths:
  - "frontend/**"
---

# Regras do Frontend

## Estilização

- **Styled Components** obrigatório. Nunca usar CSS puro ou CSS modules.
- Sempre usar valores do `theme.js` (cores, fontes, breakpoints). Nunca hardcodar valores visuais.
- `GlobalStyle.js` para reset e estilos base.
- Mobile-first: media queries de min-width. Breakpoints: 480px, 768px, 1024px, 1280px.

## Componentes e Páginas

- Dois layouts: `Layout` (público com Navbar/Footer) e `AdminLayout` (sidebar).
- `PrivateRoute` protege `/admin/*`. Redireciona para `/admin/login` se não autenticado.
- `/admin/login` é pública (única exceção dentro de `/admin`).
- Lazy loading com `React.lazy` + `Suspense` para rotas.
- `ErrorBoundary` envolvendo a aplicação.

## Estado e Dados

- `AuthContext` para estado global de autenticação.
- Custom hooks: `useAuth`, `useLiturgia`, `useBibleVerse`, `useAdminPolling`, `useIntersection`.
- Axios em `services/api.js` com interceptor para refresh automático do token.
- `AbortController` em todo `useEffect` que faz fetch. Cleanup no return.
- Dados estáticos em `constants/` (missas, sacramentos, versiculos, liturgicalColors).

## UX

- Toast com `react-toastify` para feedback ao usuário.
- Skeleton loaders durante carregamento de dados da API.
- Imagens com `loading="lazy"`.
- WCAG AA: contraste mínimo, aria-labels, foco visível.
- SEO: title/meta por página, Open Graph na home.

## Tema visual

- Bordô: `#7B1C1C` / Dourado: `#C9A84C` / Creme: `#FDFAF5`
- Fontes: Playfair Display (títulos), Lato (corpo), Cinzel (destaque)
