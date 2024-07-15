# GCars

## Descrição

O GCars é um sistema de gerenciamento de estacionamento projetado para facilitar a vida dos usuários e proprietários de estacionamentos. Ele permite o registro e login de usuários, armazena informações sobre os veículos e calcula automaticamente o valor a ser pago pelo tempo de estacionamento.

## Funcionalidades

- **Registro e Login de Usuários**: Permite que os usuários se registrem e façam login no sistema.
- **Gerenciamento de Veículos**: Armazena informações sobre os veículos, incluindo modelo e placa.
- **Cálculo de Tarifas**: Calcula automaticamente o valor a ser pago com base no tempo de permanência do veículo no estacionamento.

## Tecnologias Utilizadas

- **Backend**: Spring Boot
- **Frontend**: React, HTML, CSS
- **Banco de Dados**:  MySQL

## Estrutura do Projeto

- **frontend**: Contém o projeto ReactJS.
- **backend**: Contém o projeto Spring Boot.

## Instalação

### Pré-requisitos

- Node.js e npm instalados
- JDK11 (Java Development Kit) instalado
- MySQL configurado

### Backend

1. Navegue até o diretório `backend`:
   ```bash
   cd backend
   ```

2. Configure o banco de dados e as variáveis de ambiente conforme necessário. Edite o arquivo `application.properties` com as configurações do banco de dados.

3. Compile e execute o projeto Spring Boot:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend

1. Navegue até o diretório `frontend`:
   ```bash
   cd frontend
   ```

2. Instale as dependências do projeto React:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento React:
   ```bash
   npm start
   ```

## Uso

- Registre-se e faça login no sistema.
- Adicione Proprietários
- Adicione veículos vinculados aos proprietários
- Estacione seu veículo e quando o mesmo marcar saída, o sistema calculará automaticamente o valor a ser pago com base no tempo de permanência.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma nova branch:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça suas alterações e commit:
   ```bash
   git commit -m "Minha nova feature"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## Contato

Para mais informações, entre em contato com [fabioantoniocaldeiracaldeira@gmail.com](fabioantoniocaldeiracaldeira@gmail.com).
```

