export class CustomError extends Error {
    constructor(statusCode: number, message: string){
        super(message)
    }
}

export class InvalidName extends CustomError{ 
    constructor(){
        super(400, "Nome inválido")
    }
}

export class InvalidEmail extends CustomError{ 
    constructor(){
        super(400, "Email inválido")
    }
}

export class InvalidPassword extends CustomError{ 
    constructor(){
        super(400, "Senha inválida")
    }
}

export class UserNotFound extends CustomError{ 
    constructor(){
        super(404, "Usuário não encontrado")
    }
}

export class RecipeNotFound extends CustomError{ 
    constructor(){
        super(404, "Receita não encontrada")
    }
}

export class Unauthorized extends CustomError{
    constructor(){ 
        super(404, "Usuário não autorizado")
    }
}

export class InvaliRole extends CustomError{ 
    constructor(){
        super(400, "Tipo de usuario invalido")
    }
}