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

        if(camposValidos){
            alert('Enviado')
            this.formulario.submit();
        }
    }

    camposSaoValidos(){
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')){
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')){
            const label = campo.previousElementSibling.innerHTML;

            if(!campo.value){
                this.criaErroCampo(campo, `Campo ${label} não pode está em branco`)
                valid = false;
                continue;
            }

            if(campo.classList.contains('cpf')){
                if(!this.validaCpf(campo)) valid = false;
            }

            if(campo.classList.contains('usuario')){
                if(!this.usuariosValidos(campo)) valid = false;
            }

            if(campo.classList.contains('senha')){
                if(!this.senhaValida(campo)) valid = false;
            }
        }

        return valid
    }   
    usuariosValidos(campo){
        let valid = true;
        const usuario = this.formulario.querySelector('.usuario')
        if(!usuario.value.match(/^[a-zA-Z0-9]+$/)){
            this.criaErroCampo(campo, 'Usuario só pode contem letras/ou números')
            valid = false;
        }
        if(usuario.value.length < 6 || usuario.value.length > 12 ){
            this.criaErroCampo(campo, 'Usuario so pode conter entre 6 a 12 caracteres');
            valid = false
        }

        return valid
    }

    senhaValida(campo){
        let valid = true;
        const senha = this.formulario.querySelector('.senha');
        const senhaRepetida = this.formulario.querySelector('.senha-repetida');
        if(senha.value.length < 6 || senha.value.length > 12 ){
            this.criaErroCampo(senha, 'A senha so pode conter entre 6 a 12 caracteres');
            valid = false;
        }
        if(senhaRepetida.value !== senha.value){
            this.criaErroCampo(senhaRepetida, 'Senha invalida, use a senha que você colocou');
            valid = false;
        }

        return valid
    }

    validaCpf(campo){
        const cpf = new ValidaCPF(campo.value);
        if(!cpf.valida()){
            this.criaErroCampo(campo, 'Cpf Invalido')
            return false;
        }
        return true

    }

    criaErroCampo(campo, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }

}

const valida = new Validarformulario()