// Recupera os funcionários do localStorage ou inicializa com uma lista padrão
var funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [
    {   
        "nome": "Gervásio Duarte",
        "data_de_nascimento": "1970-01-12"
    },
    {
        "nome": "Irene Chaves",
        "data_de_nascimento": "1992-03-20"
    },
    {
        "nome": "Maria Antonia",
        "data_de_nascimento": "2004-01-10"
    }
];

// Atualiza os dados de idade e dias até o aniversário
function editarFuncionario() {
    for (let i = 0; i < funcionarios.length; i++) {
        var data = new Date(funcionarios[i].data_de_nascimento);
        funcionarios[i] = { 
            "nome": funcionarios[i].nome, 
            "data_de_nascimento": funcionarios[i].data_de_nascimento, 
            "idade": calcularIdade(data),
            "dias_aniversario": faltanTantosDias(data)
        };
    }
}

// Adiciona um novo funcionário
function adicionarFuncionario() {
    var nome = document.getElementById('nome').value;
    var dt_Nascimento = document.getElementById('data_nascimento').value;
    var data = new Date(dt_Nascimento);
    
    var novoFunc = {
        "nome": nome, 
        "data_de_nascimento": dt_Nascimento, 
        "idade": calcularIdade(data),
        "dias_aniversario": faltanTantosDias(data)
    };
    
    adicionarNoLocalStorage(novoFunc);

    document.getElementById('nome').value = '';
    document.getElementById('data_nascimento').value = '';
    
    funcionarios.push(novoFunc);
    funcionarios.sort((a, b) => a.dias_aniversario - b.dias_aniversario);
    carregarFuncionarios();
}

// Exibe os funcionários na tela
function carregarFuncionarios() {
    var Conts = document.getElementById('Funcionários'); 
    var container = document.getElementById('funcionarios-container');
    container.innerHTML = '';

    var Fun = document.querySelector('#Funcionários h1');
    if (!Fun) {
        Fun = document.createElement('h1');
        Fun.textContent = 'Funcionários';
        Conts.insertBefore(Fun, container);
    }

    var linhaDivisoria = document.querySelector('#Funcionários hr');
    if (!linhaDivisoria) {
        linhaDivisoria = document.createElement('hr');
        Conts.insertBefore(linhaDivisoria, container);
    }

    for (let i = 0; i < funcionarios.length; i++) {
        var funcionario = funcionarios[i];
        
        var titulo = document.createElement('h4');
        titulo.textContent = funcionario.nome; 
        
        var dataNascimento = document.createElement('p');
        var data = new Date(funcionario.data_de_nascimento);
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        
        dataNascimento.textContent = `${dia}/${mes}/${ano} - (${funcionario.idade} anos - faltam ${funcionario.dias_aniversario} dias para o aniversário)`;

        container.appendChild(titulo);
        container.appendChild(dataNascimento);
    }

    var linhaDivisoria2 = document.querySelector('#Funcionários hr:nth-of-type(2)');
    if (!linhaDivisoria2) {
        linhaDivisoria2 = document.createElement('hr');
        Conts.appendChild(linhaDivisoria2);
    }
}

// Calcula a idade do funcionário
function calcularIdade(dataNascimento) {
    var hoje = new Date();
    var idade = hoje.getFullYear() - dataNascimento.getFullYear();
    var mes = hoje.getMonth() - dataNascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }
    return idade;
}

// Calcula quantos dias faltam para o próximo aniversário
function faltanTantosDias(dataNascimento) {
    var hoje = new Date();
    var proximoAniversario = new Date(hoje.getFullYear(), dataNascimento.getMonth(), dataNascimento.getDate());

    if (hoje > proximoAniversario) {
        proximoAniversario.setFullYear(hoje.getFullYear() + 1);
    }

    var diferença = proximoAniversario - hoje;
    var diasFaltando = Math.ceil(diferença / (1000 * 60 * 60 * 24)); 

    return diasFaltando;
}

// Adiciona um novo funcionário ao localStorage, evitando duplicações
function adicionarNoLocalStorage(novoFuncionario) {
    var funcionariosExistentes = JSON.parse(localStorage.getItem("funcionarios")) || [];
    var funcionarioExistente = funcionariosExistentes.some(func => func.nome === novoFuncionario.nome);
    
    if (!funcionarioExistente) {
        funcionariosExistentes.push(novoFuncionario);
        localStorage.setItem("funcionarios", JSON.stringify(funcionariosExistentes));
    } 
}

window.onload = function() {
    // Atualiza os dados dos funcionários existentes
    editarFuncionario();
    
    // Ordena os funcionários por proximidade do aniversário
    funcionarios.sort((a, b) => a.dias_aniversario - b.dias_aniversario);

    // Carrega os funcionários para a interface
    carregarFuncionarios();
};
