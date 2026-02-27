# Cadastro de Participantes - Evento

Projeto da disciplina **Programação Web II**.

Aplicação web simples para cadastrar, visualizar e remover participantes de um evento, seguindo os conceitos de:
- Progressive Enhancement
- Mobile First
- Responsividade
- Acessibilidade
- Separação de camadas (HTML, CSS e JS)
- Compatibilidade entre navegadores

---

## Sobre o projeto

A página permite:
- cadastrar participante com nome, e-mail, presença, tipo de ingresso e interesse em novidades;
- listar os participantes em cards;
- remover participante da lista;
- destacar visualmente participantes VIP e Convidado;
- mostrar campo adicional de assuntos de interesse quando o usuário marca novidades.

Também exibe:
- alerta de boas-vindas ao carregar;
- data e hora atual no topo da página.

---

## Tecnologias usadas

- HTML5
- CSS3
- JavaScript (puro, sem framework)

---

## Estrutura de arquivos

- index.html
- styles.css
- script.js

---

## Requisitos da atividade atendidos

### 1) Progressive Enhancement

- A estrutura base funciona sem JavaScript com fallback em `noscript`.
- Com JavaScript ativo, o formulário é criado dinamicamente e a interface ganha melhorias.

### 2) Mobile First e Responsividade

- CSS iniciado para telas pequenas.
- Media queries para tablet e desktop.
- Layout fluido com `width: 100%`, `max-width` e grid responsivo.

### 3) Acessibilidade

- Uso de elementos semânticos (`header`, `main`, `section`, `label`, etc.).
- Uso de `for`, `id`, `required`, `aria-*` e foco visível.
- Contraste adequado e botões com área clicável confortável.
- Integração com VLibras.

### 4) Lógica com JavaScript

- Validação de campos obrigatórios.
- Validação simples de e-mail.
- Uso de objeto para participante + array para armazenamento em memória.
- Eventos dinâmicos de submit, change e click.
- Logs no console com os dados cadastrados.

### 5) Boas práticas

- Código separado em HTML, CSS e JS.
- Código comentado.
- Sem uso de bibliotecas/frameworks externos para a lógica principal.

---

## Como executar

### Opção 1 (rápida)
1. Baixe/clone o projeto.
2. Abra a pasta no VS Code.
3. Abra o arquivo `index.html` no navegador.

### Opção 2 (recomendada)
1. Com a pasta aberta, rode um servidor local:
   - Python: `python -m http.server 5500`
2. Acesse no navegador:
   - `http://localhost:5500`

---

## Como testar rapidamente

1. Cadastre participante com dados válidos.
2. Teste validação com campo vazio e e-mail inválido.
3. Marque “novidades” e veja o campo de assuntos aparecer.
4. Cadastre VIP e Convidado para validar destaque visual.
5. Remova um participante pelo botão “Remover”.
6. Teste com nome/e-mail muito longos para confirmar que não quebra layout.
7. Teste navegação por teclado (Tab/Enter) e foco visível.
8. Desative JavaScript no navegador para validar o fallback do formulário.

---

## Observações

- Os participantes ficam em memória (não há banco de dados).
- O envio do formulário sem JS é apenas demonstrativo (sem backend).

---

## Autor

- Nome: **[Seu Nome Aqui]**
- Disciplina: **Programação Web II**
- Professor(a): **Jéssica de Paulo Rodrigues**
- Data: **26/02/2026**
