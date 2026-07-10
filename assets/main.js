class Validarformulario{
    constructor(){
        this.formulario = document.querySelector('.form')
        this.eventos();
    }

    eventos(){
        this.formulario.addEventListener('submit', e =>{
            this.handleSubmit(e);
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const camposValidos = this.camposSaoValidos();
        const usuarioValido = this.usuariosValidos();
        const senhaValida = this.senhaValida();
    }

    camposSaoValidos(){
        let validCampos = true;
        for(let campo of this.formulario.querySelectorAll('.validar')){
            if(!campo.value){
                this.criaErroCampo(campo,'Não pode ficar em branco')
                validCampos = false;
            }
        }
    }   
    usuariosValidos(){
        let validUsuarios = true
        const letrasNumeros = /^[\p{L}\p{N}]+$/u
        const tamanhoLetras = /^[\p{L}]{6,12}$/u
        if(!this.formulario.querySelector('.nome') === letrasNumeros){
            this.criaErroUsuario('Usuario só pode contem letras/ou números')
            this.validUsuarios = false;
        }
        if(!this.formulario.querySelector('.nome') === tamanhoLetras){
            this.criaErroUsuario('Usuario so pode conter entre 6 a 12 caracteres');
            this.validUsuarios = false
        }
    }

    senhaValida(){
        let validSenha = true
        const tamanhoLetras = /^[\p{L}]{6,12}$/u
        if(!this.formulario.querySelector('.senha') === tamanhoLetres){
            this.criaErroUsuario('A senha so pode conter entre 6 a 12 caracteres');
            this.validSenha = false
        }
    }

    criaErroCampo(campo, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }

    criaErroUsuario(msg){
        const criaErroUs = document.createElement('p')
        criaErroUs.innerHTML = msg
        criaErroUs.classList.add('error-usuario')
    }


}

const valida = new Validarformulario()