var funcionarios = [
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

function editarFuncionario() {
    for (let i = 0; i < funcionarios.length; i++) {
        var data = new Date(funcionarios[i].data_de_nascimento);
        funcionarios[i] = { 
            "nome":funcionarios[i].nome, 
            "data_de_nascimento":funcionarios[i].data_de_nascimento, 
            "idade": calcularIdade(data),
            "dias_aniversario":faltanTantosDias(data)};
    }
}

function adicionarFuncionario(){
    var nome = document.getElementById('nome').value;
    var dt_Nascimento = document.getElementById('data_nascimento').value;
    var data = new Date(dt_Nascimento);
    
    var novoFunc = {
        "nome":nome, 
        "data_de_nascimento":dt_Nascimento, 
        "idade": calcularIdade(data),
        "dias_aniversario":faltanTantosDias(data)
    };
    
    //Adicionar
    funcionarios.push(novoFunc);

    // Limpar os campos após adicionar
    document.getElementById('nome').value = '';
    document.getElementById('data_nascimento').value = '';
    
    //Ordenar e atualizar
    funcionarios.sort((a, b) => a.dias_aniversario - b.dias_aniversario);
    carregarFuncionarios();

}


function carregarFuncionarios() {
    var Conts = document.getElementById('Funcionários'); 
    var container = document.getElementById('funcionarios-container');
    container.innerHTML = '';

    // Cria e adiciona o título "Funcionários" apenas se ele ainda não estiver presente
    var Fun = document.querySelector('#Funcionários h1');
    if (!Fun) {
        Fun = document.createElement('h1');
        Fun.textContent = 'Funcionários';
        Conts.insertBefore(Fun, container);
    }

    // Cria e adiciona a linha divisória apenas se ela ainda não estiver presente
    var linhaDivisoria = document.querySelector('#Funcionários hr');
    if (!linhaDivisoria) {
        linhaDivisoria = document.createElement('hr');
        Conts.insertBefore(linhaDivisoria, container);
    }

    for (let i = 0; i < funcionarios.length; i++) {
        var funcionario = funcionarios[i];
        
        // Criação do elemento de título para o nome do funcionário
        var titulo = document.createElement('h4');
        titulo.textContent = funcionario.nome; 
        
        // Criação do elemento de parágrafo para data de nascimento
        var dataNascimento = document.createElement('p');
        var data = new Date(funcionario.data_de_nascimento);
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        
        // Define o texto no formato dia/mês/ano
        dataNascimento.textContent = `${dia}/${mes}/${ano} - (${funcionario.idade} anos - faltam ${funcionario.dias_aniversario} dias para o aniversário)`;

        // Adiciona os elementos ao contêiner
        container.appendChild(titulo);
        container.appendChild(dataNascimento);
    }

    var linhaDivisoria2 = document.querySelector('#Funcionários hr:nth-of-type(2)');
    if (!linhaDivisoria2) {
        linhaDivisoria2 = document.createElement('hr');
        Conts.appendChild(linhaDivisoria2);
    }
}

function calcularIdade(dataNascimento) {
    var hoje = new Date();
    var idade = hoje.getFullYear() - dataNascimento.getFullYear();
    var mes = hoje.getMonth() - dataNascimento.getMonth();
    // Verifica se o aniversário já passou este ano
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }
    return idade;
}
function faltanTantosDias(dataNascimento){
    var hoje = new Date();
    var proximoAniversario = new Date(hoje.getFullYear(), dataNascimento.getMonth(), dataNascimento.getDate());

    // Se o aniversário já passou neste ano, calcula para o próximo ano
    if (hoje > proximoAniversario) {
        proximoAniversario.setFullYear(hoje.getFullYear() + 1);
    }

    // Calcula a diferença em milissegundos e converte para dias
    var diferença = proximoAniversario - hoje;
    var diasFaltando = Math.ceil(diferença / (1000 * 60 * 60 * 24)); // Converte milissegundos para dias

    return diasFaltando;
}


window.onload = function() {
    editarFuncionario();
    funcionarios.sort((a, b) => a.dias_aniversario - b.dias_aniversario);
    carregarFuncionarios();
    
};