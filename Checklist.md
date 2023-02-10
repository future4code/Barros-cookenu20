# 1 - Cadastro / Criar Pessoa Usuário

[ X ] Como o projeto está no início, o usuário só precisa informar: o e-mail, nome a sua senha para realizar o cadastro. A senha tem uma regra: ela deve conter, no mínimo, 6 caracteres.

```
Método: POST
Path: /signup

Entradas: Body
{
	"name": "Alice",
	"email": "alice@lbn.com",
	"password": "123456"
}

Saída: Body
{
	"access_token": "token de acesso"
}
```
[ X ] O seu código deve validar se os três campos estão completos (ou seja se não foram enviados ou se não estão vazios) e retornar um erro caso não estejam válidos

[ X ] O seu código deve gerar o id do usuário


# 2 - Login

[ X ] Basta informar o email e a senha corretamente que o usuário poderá se logar na aplicação. Os endpoints de login e cadastro devem retornar um token.

```
Método: POST
Path: /login

Entradas: Body
{
	"email": "alice@lbn.com",
	"password": "123456"
}

Saída: Body
{
	"access_token": "token de acesso"
}
```
[ X ] O seu código deve validar se os dois campos estão completos (ou seja se não foram enviados ou se não estão vazios) e retornar um erro caso não estejam válidos

# 3 - Informações do próprio perfil

[ X ] A partir do token de autenticação fornecido no login, o usuário deve ser capaz de ver as suas informações salvas no banco (id, nome e email)

```
Método: GET
Path: /user/profile

Entradas: Headers
Authorization: "token de autenticação"

Saída: Body
{
	"id": "id do usuário",
	"name": "Alice",
	"email": "alice@lbn.com"
}
```
# 4 - Criar receitas
    
[ X ] O usuário deve poder criar uma receita. A receita deve ter os seguintes atributos: título, descrição/modo de preparo e data de criação

```
Método: POST
Path: /recipe

Entradas:
Headers: Authorization: "token de autenticação"

Saída: Body
{
	"title": "título da receita",
	"description": "descrição da receita"
}
```

# 5 - Seguir usuário

[ _ ] Um usuário deve poder seguir outros usuários. Para isso, ele deve fornecer o id do usuário que deseja seguir. Atente-se que essa funcionalidade se assemelha ao do instagram: um usuário seguir outro, não significa que "esse outro" está seguindo o primeiro.


```
Método: GET
Path: /user/:id

Entradas:
Path Param: id: "id do usuário"
Headers: Authorization: "token de autenticação"

Saída: Body
{
	"id": "id do usuário",
	"name": "Bob",
	"email": "bob@lbn.com"
}
```

# 6 - Feed

[ _ ] Um usuário deve poder visualizar as receitas criadas pelos usuários que ele segue. As receitas devem estar ordenadas pela data de criação

```
Método: GET
Path: /recipe/:id

Entradas:
Path Param: id: "id da receita"

Saída: Body
{
	"id": "id da receita",
	"title": "Ovo Frito",
	"description": "Pega o ovo, põe na frigideira e reza!"
	"cratedAt": "31/12/2020"
}
```
# [ _ ] - Readme

# [ _ ] - Documentação Postman

# [ _ ] - Deploy