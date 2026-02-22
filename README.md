# Sistema de Gerenciamento de Notas - Grade App

## Visão Geral

Este é um **Sistema de Gerenciamento de Notas** desenvolvido como um **CRUD (Create, Read, Update, Delete)** em React. O projeto foi criado originalmente em **2019/2020** como parte da entrega final do **curso fullstack da IGTI**.

## Tecnologias Utilizadas

### Frontend
- **React** 16.13.1
- **React Router DOM** 5.2.0
- **Bootstrap** 4.5.0
- **Axios** 1.13.5 (para requisições HTTP)
- **Create React App** 5.0.1

### Backend (Mock)
- **igtibackend** outra parte do projeto
#### Após o update
- **igtibackend** - Simula uma API REST para desenvolvimento
- **db.json** - Arquivo de dados JSON

## Funcionalidades

- **Listagem de Notas**: Visualizar todas as notas cadastradas
- **Detalhes da Nota**: Visualizar informações detalhadas de uma nota específica
- **Cadastro de Notas**: Adicionar novas notas ao sistema
- **Edição de Notas**: Atualizar informações de notas existentes
- **Exclusão de Notas**: Remover notas do sistema
- **Navegação**: Sistema de rotas para diferentes funcionalidades

## Estrutura do Projeto

```
src/
├── components/
│   ├── AddGrade.js      # Formulário de cadastro de notas
│   ├── Grade.js         # Visualização de detalhes da nota
│   └── GradeList.js     # Lista de todas as notas
├── services/
│   └── GradeService.js  # Camada de comunicação com a API
├── http-common.js       # Configuração do cliente HTTP
├── App.js              # Componente principal da aplicação
└── index.js            # Ponto de entrada da aplicação
```

## Instalação e Execução

### Pré-requisitos
- Node.js (versão 12 ou superior)
- npm ou yarn

### Instalação de Dependências
```bash
npm install
```

### Execução em Desenvolvimento

Para iniciar o desenvolvimento, execute ambos o frontend e o backend:

```bash
# Iniciar o JSON Server (backend mock) e o React (frontend) simultaneamente
npm run dev:server
```

Alternativamente, você pode iniciar cada serviço separadamente:

```bash
# Em um terminal - iniciar o JSON Server
npm run json-server

# Em outro terminal - iniciar o React
npm start
```

### Comandos Disponíveis

- `npm start` - Inicia o frontend em modo desenvolvimento
- `npm run dev:server` - Inicia ambos frontend e backend simultaneamente
- `npm run json-server` - Inicia apenas o JSON Server (backend mock)
- `npm run build` - Cria a versão de produção
- `npm test` - Executa os testes

## Uso da Aplicação

1. **Listar Notas**: Acesse a página inicial para ver todas as notas cadastradas
2. **Adicionar Nota**: Clique em "Add" para cadastrar uma nova nota
3. **Visualizar Detalhes**: Clique no nome de uma nota para ver seus detalhes
4. **Editar/Excluir**: Use os botões disponíveis na página de detalhes

## Modelo de Dados

Cada nota contém os seguintes campos:

```json
{
  "id": "1",
  "name": "Matemática",
  "subject": 8.5,
  "type": "Prof. Silva",
  "value": "500"
}
```

**Observação**: Existe uma inconsistência no modelo de dados onde:
- O campo `subject` armazena o valor numérico da nota
- O campo `type` armazena o nome do professor
- O campo `value` contém um valor fixo "500" (placeholder)

## Problemas Conhecidos

⚠️ **Atenção**: Este projeto possui alguns problemas que precisam de atenção:

1. **Inconsistência no Modelo de Dados**: Os nomes dos campos não correspondem ao que armazenam
2. **Endpoints da API**: O serviço chama endpoints `/grade` mas o JSON Server usa `/grades`
3. **Dependências Desatualizadas**: O React 16.13.1 é uma versão antiga (atualmente estamos na versão 18+)
4. **Configuração de Rotas**: Pode haver conflitos nas rotas devido à inconsistência dos endpoints

## Atualizações Recentes

### Atualização com IA (Ferramenta Cline)

Este projeto foi recentemente atualizado utilizando a ferramenta **Cline**, uma extensão de IA para VSCode. As principais melhorias incluem:

- **Criação do db.json**: Arquivo de dados mock para simular o backend
- **Configuração de Scripts**: Adição de scripts para execução simultânea do frontend e backend
- **Melhorias na Estrutura**: Organização dos arquivos e dependências

### Histórico de Versões

- **2019/2020**: Versão original desenvolvida para o curso fullstack da IGTI
- **2026**: Atualização com ferramenta Cline e criação do db.json

## Contribuição

Este projeto foi desenvolvido como trabalho acadêmico e está disponível para estudos e referências. Caso deseje contribuir para a resolução dos problemas conhecidos, sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto foi desenvolvido para fins educacionais e não possui licença específica.