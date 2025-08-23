# Web-II---API-de-Gerenciamento-de-Carteira-de-Investimentos

Este é um projeto full-stack de uma API para gerenciamento de carteira de investimentos, desenvolvido como parte da disciplina de Web II. O sistema permite ao usuário cadastrar, visualizar, editar e remover seus ativos financeiros, além de consultar um resumo consolidado da carteira.

A aplicação é dividida em um **Backend** robusto construído com Java e Spring Boot, e um **Frontend** moderno e interativo desenvolvido com React e TypeScript.

## Funcionalidades

* **CRUD completo de Ativos:**
    * Cadastrar novos investimentos (Ações, Criptos, Fundos, etc.).
    * Listar todos os ativos da carteira.
    * Visualizar detalhes de um ativo específico.
    * Atualizar informações de um ativo.
    * Remover um ativo da carteira.
* **Resumo da Carteira:** Visualizar dados consolidados como o total investido e a quantidade de ativos.
* **Filtragem e Busca:** Filtrar ativos por tipo e buscar por símbolo na tela de listagem.
* **Interface Reativa:** Frontend moderno com uma experiência de usuário fluida.
* **Tema Claro/Escuro:** Botão para alternar o tema da interface.

## Tecnologias Utilizadas

O projeto utiliza uma stack de tecnologias modernas e populares no mercado.

### Backend

* **Java 17**
* **Spring Boot 3.2.5**
* **Spring Data JPA (Hibernate)**
* **PostgreSQL**
* **Maven**
* **Docker & Docker Compose**

### Frontend

* **React 19**
* **TypeScript**
* **Vite**
* **Axios** (para comunicação com a API)
* **React Router DOM** (para navegação)
* **Bootstrap** (para estilização)

## Como Executar o Projeto

Para executar este projeto em sua máquina local, siga os passos abaixo.

### Pré-requisitos

* **Docker** e **Docker Compose**
* **JDK 17** ou superior
* **Maven 3.8** ou superior
* **Node.js 20** ou superior

### 1. Iniciar o Banco de Dados (Backend)

O banco de dados PostgreSQL roda em um container Docker. Para iniciá-lo, navegue até a pasta raiz do projeto no terminal e execute:

```bash
docker-compose up -d
