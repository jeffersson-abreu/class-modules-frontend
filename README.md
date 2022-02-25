# Catálogo de aulas por módulos

Este é um desafio para a vaga Fullstack na Verzel. Abaixo segue o passo-a-passo para avaliação, instalação e uso do fontend.

## Requisitos

- [Backend da aplicação](https://github.com/jeffersson-abreu/class-modules-backend)
- [Node](https://nodejs.org/pt-br/download/) ***v16.13.2***
- [Git](https://git-scm.com/downloads)


Você pode obter o node e o npm usando o [nvm](https://pip.pypa.io/en/stable/) (Node version manager) seguindo a [documentação](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)


## Instalação

Após a instalação e configuração do [backend](https://github.com/jeffersson-abreu/class-modules-backend) da aplicação, com o backend rodando e aceitando conexões, poderemos dar inicio a  instalação do front-end para avaliação.


```bash
# Download do projeto
$ git clone https://github.com/jeffersson-abreu/class-modules-frontend.git

# Instalando as dependências
$ cd class-modules-frontend
$ npm install
```

Após a instalação das dependências, poderemos rodar o projeto.
```bash
$ npm start
```

Agora nossa aplicação está pronta para fazer requisições locais ao nosso backend. Abaixo estão as operações suportadas. O layout das páginas é auto explicativo.

## Modulos
- Listagem
- Criação
- Remoção
- Edição

## Aulas
- Listagem
- Criação
- Remoção
- Edição

As rotas de criação, remoção, e edição de ambos são protegidas para usuários não autenticados, tanto no back-end quanto no front-end. Antes de fazer qualquer operação nessas rotas protegidas é obrigatório fazer login na área administrativa. 

Caso não tenha uma conta você poderá criar uma atrávés da área administrativa seguindo o link "Cadastre-se" no rodapé do formulário.

Após o login ou criação da conta você poderá adicionar, remover e editar módulos e aulas facilmente.

## Considerações Finais

O design não está totalmente completo. Desconsidere animações e efeitos de fluídez no front-end. No mais, agradeço pelo tempo energia disponibilizados para avaliação deste desafio.
