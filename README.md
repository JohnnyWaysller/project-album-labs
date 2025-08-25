# Album Labs - Gerenciador de Músicas e Playlists



## Funcionalidades Principais

- **Gerenciamento Completo**: Crie, edite e delete álbuns, playlists e músicas.

- **Integração com Spotify API**: Pesquise e obtenha dados de artistas, músicas e álbuns diretamente da API oficial do Spotify.

- **Coleção Personalizada**: Adicione músicas e álbuns encontrados no Spotify diretamente às suas playlists ou à sua lista de músicas.

- **Autenticação Segura**: Implementação de autenticação OAuth 2.0 para acesso seguro à API do Spotify, gerenciando a expiração do token de acesso.

- **Interface Intuitiva**: Navegação minimalista e fluida, com opções de temas de cores (escuro e muito escuro).

- **Design Responsivo**: Layout otimizado para uma experiência de usuário consistente em diferentes dispositivos e tamanhos de tela.



### *criando nova playlist

<img src="https://github.com/user-attachments/assets/bd6d508f-ab45-4745-b3c0-416b3db33676" width="320"/>



###  *Exclusao e edição da playlist

<img src="https://github.com/user-attachments/assets/862ac088-a442-4abc-982b-dc5c26380533" width="520"/>



###  *Navegação do Carousel da playlist

<img src="https://github.com/user-attachments/assets/c76f1b91-75dc-418a-a1ba-2e5688671c82" width="520"/>



### *Implementação da Api Externa Busca no Spotify (permite navegar por Album, Artistas, Musicas) foi criado carousel de Navegação.

<img src="https://github.com/user-attachments/assets/0a17a374-7401-4e59-a87d-d9693ca95c86" width="600"/>



###  *Varias Funcionalidades - Switch color Theme - Transicao de Layouts - Pequenas animacoes - Adicionar musicas na Playlist ou Musicas

###  Deletar musicas da playlist ou de Musicas - Deletar playlist - Renomear playlist - Tela responsiva.

<img src="https://github.com/user-attachments/assets/d7bf0f1c-1022-4da6-b8a2-4a269fb3b7f6" width="520"/>







## Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias e conceitos de desenvolvimento:



**Frontend**

- **EJS (Embedded JavaScript)**: Para renderização de templates HTML dinâmicos.

- **CSS3**: Para estilização e animação do layout.

- **JavaScript**: Para interações de front-end, renderização e comunicação com a API.



**Backend**

- **Node.js & Express**: Ambiente de runtime e framework para a construção da API.

- **REST APIs**: Padrão de arquitetura para comunicação entre o front-end e o back-end.



**API Externa**

- **Spotify API**: Utilizada para busca de dados e conteúdo musical.



---



## Desafios e Aprendizados

Este projeto foi uma oportunidade valiosa para aplicar e aprofundar conhecimentos em diversas áreas do desenvolvimento.



- **Consumo de APIs Externas**: Foi um desafio obter e tratar os dados da API do Spotify, garantindo que a comunicação fosse eficiente e segura.

- **Autenticação OAuth 2.0**: A implementação do fluxo de autenticação e o gerenciamento do token de acesso (incluindo a lógica de expiração) foram cruciais para a segurança das requisições.

- **Arquitetura MVC**: A separação de responsabilidades (Models, Views e Controllers) foi fundamental para organizar o código, facilitando a manutenção e a reutilização de lógicas.

- **Modelagem de Dados**: A criação de um modelo de dados eficaz no backend para gerenciar músicas e playlists foi essencial para a funcionalidade do projeto.

- **Reutilização de Código**: Lógicas foram encapsuladas e reutilizadas, otimizando o código e demonstrando uma preocupação com a eficiência e a escalabilidade.



---

## Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar a aplicação na sua máquina.



**Pré-requisitos**

- [Node.js](https://nodejs.org/) instalado

```bash

**Instalação**

1. Clone este repositório:

git clone https://github.com/JohnnyWaysller/project-album-labs.git



2. Clone este repositório:

cd project-album-labs (ou entre na pasta do clone)



3. Instale as Dependencias

npm install



4. Crie um arquivo .env na raiz do projeto e configure suas variáveis de ambiente para a autenticação do Spotify API.

Você pode obter suas credenciais em Spotify for Developers:

SPOTIFY_CLIENT_ID=sua_chave_de_cliente

SPOTIFY_CLIENT_SECRET=seu_segredo_de_cliente



5. Inicie o servidor

npm start
