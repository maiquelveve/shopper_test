# SHPPPER - TEST
#
 - Test Shopper - testepara a vaga de Full Stack Jr da empresa shopper.
#


#
# CLONANDO O PROJETO E INSTALANDO SUAS DEPENDENCIAS

  1º - Clone o projeto do github com o seguindo comando
    
      - git clone https://github.com/maiquelveve/shopper_test.git
   
  
  2º - Após ter clonado, notará que há duas pasta no repositório, uma referente ao FRONTEND e outra referente ao BACKEND. agora para iniciar os projetos é necessário que se instalem as dependencias dos mesmos. Acesse, via terminal, a pasta do frontend e execute o comando a seguir:

      - yarn ou npm i -> Ou use o gerenciador de pacote de sua preferencia.
    

  3º - Agora acesse, via terminal também, a pasta do backend e execute o comando a seguir:

        - yarn ou npm i -> Ou use o gerenciador de pacote de sua preferencia.

        

#
# CONFIGURANDO AS VARIÁVEIS DOS PROJETOS

  **** BACKEND ****

    Dentro da pasta "backend" há um arquivo de exemplo das variaveis de ambientes necessária para configuração corrente do setup. 
        
        - Na "raiz" da pasta backend cria um arquivo ".env",
        - Agora crie as variaveis iguais as do arquivo ".env.example" 

            - Variaveis:

              NODE_ENV -> Indica onde esta sendo executado o projeto, em produção, testes ou desenvolvimento
                ex: "development"
              
              API_PORT -> Indica qual a porta que o sistema do backend irá rodar.
                ex: "3333"
              
              API_HOST -> Indica qual o host que está executando a aplicação.
                ex: "localhost"

              API_PROTOCOL -> Indica qual a protocolo usará, HTTP OU HTTPS.
                ex: "http://" - lembre-se de adicionar aqui após o protocolo "://" escolha para rodar localmente com "http"

              DB_DIALECT -> Indica qual banco será usado mysql, postgress, oracle ect. 
                ex: "mysql" - Nesse caso utiliza o "mysql" pois o sistema foi construido para rodar utilizando o 'mysql'

              DB_HOST -> Indica o host do banco de dados, localhost, ip do servidor etc
                ex: "172.31.143.215" ou "localhost"

              DB_PORT -> Indica a porta em que o banco de dados irá rodar, informe a porta conforme o banco e hospedagem
                ex:"3306" - Como já dito antes o sistem utiliza o mysql e por padrão a porta é a 3306.

              DB_USERNAME -> Indica o nome do usuario do banco de dados
                ex: "root" 

              DB_PASSWORD -> Indica a senha do nome do usuario do banco de dados
                ex: "123456" 

              DB_NAME_DATABASE_DEV -> Indica o nome a ser utilizado da base de dados em desenvolvimento
                ex: "shopperDB_dev"

              DB_NAME_DATABASE_PROD -> Indica o nome a ser utilizado da base de dados em produção
                ex: "shopperDB"

              DB_NAME_DATABASE_TEST -> Indica o nome a ser utilizado da base de dados em testes
                ex: "shopperDB_test"
   
        OBSERVAÇÃO: Antes de executar qualquer comando defina as variaveis correntamente para  a execução do projeto


**** FRONTEND ****

    Dentro da pasta "frontend" em "src/config/constants.ts" altere o valor da variavel URL_API
        
        ex:
          const URL_API = "http://localhost:3333";

    OBSERVAÇÃO: Lembre-se de preencher conforme as variaveis de ambiente setadas no backend, pois essa variavel contém o endereço da API que irá receber e tratar as requisições, dando, assim, "vida ou sistema".    


#
# CRIANDO O BANCO DE DADOS E EXECUTANDO AS MIGRATES

  Acesse o termina e vá a pasta, "raiz", do backend e execute os comandos abaixo:
  
  
    - 1º EXECUTE O COMANDO PARA CRIAR O BANDO DE DADOS.

        yarn dbcreate:dev ou npm run dbcreate:dev.
  
    - 2º EXECUTE O COMANDO PARA CRIAR AS TABELAS POR MEIO DAS MIGRATES

        yarn dbmigrate:dev ou npm run dbmigrate:dev

  Agora o banco de dado já está pronto para ser utilizado pelo sistema. Note que nos exemplo acimas consideramos somente o ambiente de desenvolvimento, para o ambiemte de produção utilize a flag ":prod".


#
# EXECUTANDO O PROJETO

  - BACKEND => 
  Agora que as variáveis de ambiente extão configuradas e com o banco de dados rodando.
  Acesse a pasta do backend pelo termina, na raiz, e execute o comando abaixo:
      
    ``````      
    yarn dev ou npm run dev
    ``````

  - FRONTEND => 
  Agora com as constantes do frontend configuradas e também com o backend e banco de dados rodando.
  Acesse a pasta do frontend pelo termina, na raiz, e execute o comando abaixo:

    ``````      
    yarn dev ou npm run dev
    ``````


Note que o frontend deve estar rodando por padrão em "http://localhost:5173/".


#
# TECNOLOGIAS UTILIZADAS

  Para o backend foram utilizadas as seguintes tecnologias:
    
    - node
    - express
    - typescript
    - sequelize
    - mysql
    - multer
    - cors
    - eslint
    - tsx
    - tsup

  Para o frontend foram utilizadas as seguintes tecnologias:
    
    - react
    - vite
    - material ui 5
    - typescript
    - axios
    - react router dom
    - react-dropzone
    - sweetalert2
    - eslint






        
    
