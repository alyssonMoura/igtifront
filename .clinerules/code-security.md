# Regras de Segurança de Código para Desenvolvedores Front-End

Este documento estabelece as regras de segurança que todos os desenvolvedores front-end devem seguir para garantir a integridade e segurança das aplicações.

## 1. Gestão de Dependências

### 1.1 Atualização de Dependências
- **Obrigatório**: Verificar e atualizar dependências vulneráveis semanalmente
- **Ferramenta**: Executar `npm audit` ou `yarn audit` antes de cada commit
- **Ação**: Atualizar imediatamente dependências com vulnerabilidades críticas (CVE)

### 1.2 Versões de Dependências
- **Proibido**: Uso de versões desatualizadas com vulnerabilidades conhecidas
- **Recomendado**: Sempre usar versões LTS e mantidas
- **Monitoramento**: Configurar alertas de segurança no GitHub para dependências

## 2. Proteção de Credenciais e Segredos

### 2.1 Armazenamento de Credenciais
- **Proibido**: Hardcoding de senhas, chaves de API, tokens ou secrets no código
- **Obrigatório**: Uso exclusivo de variáveis de ambiente (.env)
- **Formato**: Variáveis devem seguir o padrão `UPPER_CASE_WITH_UNDERSCORES`

### 2.2 Arquivos de Configuração
- **Proibido**: Comitar arquivos .env no repositório
- **Obrigatório**: Adicionar .env ao .gitignore
- **Modelo**: Criar .env.example com valores de exemplo (não reais)

### 2.3 Identificação de Credenciais
Procurar e remover imediatamente:
- Strings contendo: `password`, `token`, `secret`, `apiKey`, `AWS_`, `GITHUB_`
- Comentários com credenciais
- Configurações expostas em arquivos públicos

## 3. Prevenção de XSS (Cross-Site Scripting)

### 3.1 Renderização de Conteúdo
- **Proibido**: Uso de `innerHTML` com dados não sanitizados
- **Proibido**: Uso de `dangerouslySetInnerHTML` sem validação rigorosa
- **Obrigatório**: Sanitizar todo conteúdo dinâmico antes da renderização

### 3.2 Entrada de Usuário
- **Obrigatório**: Validar e sanitizar todas as entradas de usuário
- **Ferramenta**: Utilizar bibliotecas como DOMPurify para sanitização
- **Proibido**: Renderizar HTML bruto proveniente de fontes externas

### 3.3 Execução de Código
- **Proibido**: Uso de `eval()`, `Function()`, ou `setTimeout/setInterval` com strings
- **Alternativa**: Sempre usar funções nomeadas ou arrow functions

## 4. Validação de Entrada

### 4.1 Formulários
- **Obrigatório**: Validar todos os campos de formulário no frontend
- **Recomendado**: Uso de bibliotecas como Joi, Yup ou Zod
- **Campos críticos**: Validar e-mails, senhas, números de cartão, etc.

### 4.2 Upload de Arquivos
- **Obrigatório**: Verificar tipo de arquivo, tamanho e extensão
- **Proibido**: Aceitar arquivos executáveis (.exe, .bat, .sh)
- **Recomendado**: Validar MIME types e usar scanners de vírus

### 4.3 APIs e Requisições
- **Obrigatório**: Validar parâmetros de URL e query strings
- **Proibido**: SQL injection em consultas (mesmo que seja apenas frontend)
- **Recomendado**: Uso de validação de schemas para APIs

## 5. Configuração de Segurança

### 5.1 CORS
- **Proibido**: Configuração CORS permissiva (`Access-Control-Allow-Origin: *`)
- **Recomendado**: Listar domínios específicos e confiáveis
- **Obrigatório**: Validar origem das requisições

### 5.2 Headers de Segurança
- **Obrigatório**: Configurar Content-Security-Policy (CSP)
- **Recomendado**: Implementar X-Frame-Options, X-Content-Type-Options
- **Proibido**: Desativar headers de segurança sem justificativa

### 5.3 Cookies
- **Obrigatório**: Uso de flags `httpOnly` e `Secure` para cookies sensíveis
- **Recomendado**: Configurar SameSite para prevenir CSRF
- **Proibido**: Armazenar dados sensíveis em cookies sem criptografia

## 6. Autenticação e Autorização

### 6.1 Tokens JWT
- **Obrigatório**: Definir tempo de expiração (exp) para tokens
- **Recomendado**: Uso de refresh tokens para renovação segura
- **Proibido**: Armazenar tokens em localStorage sem criptografia

### 6.2 Senhas
- **Proibido**: Armazenar senhas em plain text no frontend
- **Obrigatório**: Sempre usar HTTPS para transmissão de credenciais
- **Recomendado**: Implementar validação de força de senha

### 6.3 Controle de Acesso
- **Proibido**: Basear lógica de autorização apenas no frontend
- **Obrigatório**: Validar permissões no backend para todas as operações
- **Recomendado**: Implementar validação de sessão em todas as rotas

## 7. Proteção de Dados

### 7.1 Dados Sensíveis
- **Proibido**: Armazenar PII (dados pessoais identificáveis) em localStorage
- **Obrigatório**: Criptografar dados sensíveis antes de armazenar
- **Recomendado**: Uso de sessionStorage para dados temporários

### 7.2 Logs e Debug
- **Proibido**: Expor informações sensíveis em logs de desenvolvimento
- **Obrigatório**: Remover logs de debug antes de builds de produção
- **Recomendado**: Uso de níveis de log apropriados (debug, info, warn, error)

### 7.3 Comunicação
- **Obrigatório**: Uso exclusivo de HTTPS para todas as comunicações
- **Recomendado**: Implementar HSTS (HTTP Strict Transport Security)
- **Proibido**: Comunicação HTTP em ambientes de produção

## 8. Desserialização Segura

### 8.1 Processamento de Dados
- **Proibido**: Uso de `JSON.parse()` em dados não confiáveis
- **Obrigatório**: Validar esquema dos dados antes da desserialização
- **Recomendado**: Uso de bibliotecas de validação de schemas

### 8.2 Bibliotecas de Desserialização
- **Obrigatório**: Uso apenas de bibliotecas mantidas e seguras
- **Proibido**: Bibliotecas descontinuadas ou com histórico de vulnerabilidades
- **Recomendado**: Verificar atualizações de segurança regularmente

## 9. Análise de Código Estático

### 9.1 Ferramentas de Análise
- **Obrigatório**: Configurar ESLint com regras de segurança
- **Recomendado**: Uso de SonarQube, Snyk ou ferramentas similares
- **Integração**: Configurar análise estática em pipelines CI/CD

### 9.2 Verificação de Vulnerabilidades
- **Obrigatório**: Executar análise de vulnerabilidades antes de cada deploy
- **Recomendado**: Configurar alertas automáticos para novas vulnerabilidades
- **Documentação**: Manter registro de vulnerabilidades identificadas e corrigidas

## 10. Procedimentos de Verificação

### 10.1 Checklist de Segurança
Antes de cada commit, verificar:
- [ ] Dependências atualizadas e sem vulnerabilidades
- [ ] Nenhuma credencial exposta no código
- [ ] Validação de entrada implementada
- [ ] Headers de segurança configurados
- [ ] Tokens JWT com expiração definida
- [ ] Dados sensíveis protegidos
- [ ] Logs sem informações confidenciais

### 10.2 Documentação de Vulnerabilidades
- **Obrigatório**: Criar arquivo `verificacao-vulnerabilidade_YYYY-MM-DD-XX.md` na pasta docs
- **Formato**: Seguir modelo estabelecido no agente security_expert
- **Acompanhamento**: Manter registro de correções implementadas

### 10.3 Plano de Correção
Para cada vulnerabilidade identificada:
- **Obrigatório**: Criar plano de correção detalhado
- **Formato**: Arquivo `correcao_vulnerabilidade_YYYY-MM-DD.md` na pasta docs
- **Prazo**: Corrigir vulnerabilidades críticas em até 24 horas

## 11. Treinamento e Conscientização

### 11.1 Conhecimento de Segurança
- **Recomendado**: Treinamento regular sobre OWASP Top 10
- **Obrigatório**: Conhecimento das melhores práticas de segurança front-end
- **Atualização**: Manter-se informado sobre novas ameaças e vulnerabilidades

### 11.2 Compartilhamento de Conhecimento
- **Recomendado**: Documentar lições aprendidas com incidentes de segurança
- **Obrigatório**: Compartilhar boas práticas com a equipe
- **Feedback**: Participar de revisões de código focadas em segurança

## 12. Conformidade e Auditoria

### 12.1 Revisões de Código
- **Obrigatório**: Revisão de segurança em todos os pull requests
- **Foco**: Identificar vulnerabilidades e falhas de segurança
- **Participação**: Equipe de segurança deve validar mudanças críticas

### 12.2 Auditorias Periódicas
- **Recomendado**: Auditorias de segurança trimestrais
- **Escopo**: Análise completa do código, dependências e configurações
- **Relatório**: Documentar findings e planos de correção

## Aplicação das Regras

Estas regras são obrigatórias para todos os desenvolvedores front-end e serão verificadas automaticamente nos pipelines de CI/CD. Violações resultarão em bloqueio de deploy até que as correções sejam implementadas.

Para dúvidas ou exceções, consultar o time de segurança antes da implementação.

**Última atualização**: 21/02/2026
**Versão**: 1.0