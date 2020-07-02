Instalação no ambiente local:
É necessário ter o node instalado para rodar este projeto. 
npm 

Para instalar as dependencias do projeto você precisará entrar na pasta do projeto e rodar o comando abaixo.
../suapasta/geocart_metadados_v1 $ npm install

Após concluir a instalação, rodar o comando abaixo para subir o projeto. O projeto atual usa um servidor de teste e após rodar o comando você poderá acessar o sistema através da url http://localhost:3000/

$ npm run prod

Para gerar o build do projeto, rodar o comando abaixo:

$ npm run build_prod

Deploy no Heroku:

Registro no GIT:
No GIT HUB criar seu repositório (ex: <seu usuario>/portalgeocart.git)

No termimal, no seu diretório:

$ git init
$ git add README.md
$ git commit -m"first-commit"
$ git remote add origin https://github.com/dasilvabedu/portalgeocart.git
$ git push -u origin master

