document.getElementById('cadastroForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita o envio do formulário
    const isNomeValido = validarNome();
    const isTelefoneValido = validarTelefone();
    const isDataValida = validarDataNascimento();
    const isEnderecoValido = validarEndereco();

    if (isNomeValido && isTelefoneValido && isDataValida && isEnderecoValido) {
        alert('Cadastro realizado com sucesso!');
    } else {
        alert('Preencha os campos corretamente.');
    }
});

document.getElementById('limparBtn').addEventListener('click', function () {
    document.getElementById('cadastroForm').reset();
    limparEstilos();
});

function validarNome() {
    const nomeInput = document.getElementById('nome');
    const nome = nomeInput.value.trim();
    const erroNome = document.getElementById('erroNome');

    if (nome.length < 10) {
        erroNome.textContent = 'O nome deve ter pelo menos 10 caracteres.';
        nomeInput.classList.add('invalid');
        nomeInput.classList.remove('valid');
        return false;
    } else {
        erroNome.textContent = '';
        nomeInput.classList.add('valid');
        nomeInput.classList.remove('invalid');
        return true;
    }
}

function validarTelefone() {
    const telefoneInput = document.getElementById('telefone');
    const telefone = telefoneInput.value.trim();
    const telefoneErro = document.getElementById('erroTelefone');
    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/; // Exemplo: (12) 12345-6789

    if (!telefoneRegex.test(telefone)) {
        telefoneErro.textContent = 'Formato de telefone inválido. Use (xx) xxxxx-xxxx.';
        telefoneInput.classList.add('invalid');
        telefoneInput.classList.remove('valid');
        return false;
    } else {
        telefoneErro.textContent = '';
        telefoneInput.classList.add('valid');
        telefoneInput.classList.remove('invalid');
        return true;
    }
}

function validarDataNascimento() {
    const dataInput = document.getElementById('dataNascimento');
    const data = dataInput.value;
    const dataErro = document.getElementById('erroDataNascimento');

    if (!data) {
        dataErro.textContent = 'A data de nascimento é obrigatória.';
        dataInput.classList.add('invalid');
        dataInput.classList.remove('valid');
        return false;
    } else {
        dataErro.textContent = '';
        dataInput.classList.add('valid');
        dataInput.classList.remove('invalid');
        return true;
    }
}

function validarEndereco() {
    const enderecoInput = document.getElementById('cep');
    const enderecoErro = document.getElementById('erroEndereco');

    if (enderecoInput.value.length === 0) {
        enderecoErro.textContent = 'O CEP é obrigatório.';
        enderecoInput.classList.add('invalid');
        enderecoInput.classList.remove('valid');
        return false;
    } else {
        enderecoErro.textContent = '';
        enderecoInput.classList.add('valid');
        enderecoInput.classList.remove('invalid');
        return true;
    }
}

function limparEstilos() {
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
    });

    const erros = document.querySelectorAll('.error-message');
    erros.forEach(erro => erro.textContent = '');
}

function buscarEndereco() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert('CEP inválido!');
        document.getElementById('cep').classList.add('invalid');
        document.getElementById('cep').classList.remove('valid');
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
                return;
            }
            document.getElementById('endereco').value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
            document.getElementById('cep').classList.add('valid');
            document.getElementById('cep').classList.remove('invalid');
        })
        .catch(() => alert('Erro ao buscar o endereço.'));
}
