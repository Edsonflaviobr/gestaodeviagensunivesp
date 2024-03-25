import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

* {
  padding: 0;
  margin: 0;
  vertical-align: baseline;
  list-style: none;
  box-sizing: border-box;
  border: 0;
}

body {
  background: #f2f2f2; /* Um tom suave de cinza */
  color: #333333; /* Cor de texto mais escura */
  font-family: 'Raleway', sans-serif; /* Usando a fonte Raleway */
}

:root {
  --primary-color: #1E88E5; /* Azul suave */
  --secondary-color: #42A5F5; /* Azul mais claro */
  --tertiary-color: #BDBDBD; /* Cinza mais claro */
  
  --btn-bg-color-gradient: linear-gradient(
    45deg,
    #9b34ef 0%,
    #1E88E5 20%, /* Azul suave como cor de gradiente */
    transparent 50%
  );

  --btn-link-bg-color: #ffffff; /* Branco para botões de link */
  --btn-link-color: #333333; /* Texto escuro para botões de link */
  --card-bg-color: #ffffff; /* Fundo branco para cartões */

  --divider-bg-color: #9e86ff; /* Roxo claro para divisores */
  --nav-bg-color: rgba(0, 0, 0, 0.1); /* Cor de fundo translúcida para navegação */
  --text-color: #333333; /* Cor de texto mais escura */
  --link-color: #1E88E5; /* Azul suave para links */
  --form-bg-color: rgba(211, 211, 211, 0.06); /* Fundo translúcido para formulários */
  --form-field-bg-color: #ffffff; /* Fundo branco para campos de formulário */
  --form-field-border: 1px solid #BDBDBD; /* Borda cinza claro para campos de formulário */
  --form-field-placeholder: #BDBDBD; /* Texto de espaço reservado cinza claro para campos de formulário */
  --form-field-error: rgb(255, 76, 76); /* Cor de erro para campos de formulário */

  scroll-behavior: smooth;
}

@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;700&display=swap");

/* Custom Scroll */
::-webkit-scrollbar {
  width: 8px;
}
  
::-webkit-scrollbar-thumb {
  background: var(--tertiary-color);
  border-radius: 10px;
}
  
::-webkit-scrollbar-thumb:hover {
  background: var(--secondary-color);
}  
`