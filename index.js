const fs = require("fs");

let primaryKeys = [];

const insertCliente =
  "INSERT INTO CLIENTE (CPF, EMAIL, NOME, ENDERECO, SEXO, DATA_NASC) VALUES";
const insertDependente =
  "INSERT INTO DEPENDENTE (CPF, DATA_NASC, NOME, CPF_CLIENTE) VALUES";

const insertAvaliacao =
  "INSERT INTO AVALIACAO (ID, NOTA, DATA, COMENTARIO, CPF_CLIENTE) VALUES";

const insertFuncionario =
  "INSERT INTO FUNCIONARIO (CPF, NOME, DATA_NASC, SALARIO, FUNCAO) VALUES";

const insertQuarto =
  "INSERT INTO QUARTO (NUMERO, TIPO, VISTA, VALOR_DIARIA) VALUES";

const insertProduto =
  "INSERT INTO PRODUTO (ID, TIPO, NOME, VALOR, DESCRICAO) VALUES";

const insertTelefone = "INSERT INTO TELEFONE (TELEFONE, CPF_CLIENTE) VALUES";

const insertEquipamento =
  "INSERT INTO EQUIPAMENTO (EQUIPAMENTO, NUMERO_QUARTO) VALUES";

const insertHospeda =
  "INSERT INTO HOSPEDA (ID_HOSPEDAGEM, DIA_CHECK_IN, DIA_CHECK_OUT, CPF_CLIENTE, NUMERO_QUARTO) VALUES";
const insertReserva =
  "INSERT INTO RESERVA (ID_RESERVA, CPF_CLIENTE, NUMERO_QUARTO, DIA_CHECK_IN, DIA_CHECK_OUT) VALUES";

const insertVenda =
  "INSERT INTO VENDA (ID_VENDA, ID_PRODUTO, NUMERO_QUARTO, DATA, QUANTIDADE) VALUES";

const insertManuntencao =
  "INSERT INTO MANUTENCAO (ID_MANUTENCAO, CPF_FUNCIONARIO, NUMERO_QUARTO, DATA, TIPO_MANUTENCAO, OBSERVACAO) VALUES";

/*
 * Returns a random integer between min (inclusive) and max (inclusive).
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const clientes = () => {
  let clientes = "-----Clientes-----\n\n";
  primaryKeys.clientes = [];
  for (let idx = 0; idx < 20; idx++) {
    const cpf =
      "" +
      getRandomInt(100, 999) +
      "." +
      getRandomInt(100, 999) +
      "." +
      getRandomInt(100, 999) +
      "-" +
      getRandomInt(10, 99);
    primaryKeys.clientes.push(cpf);

    clientes += `${insertCliente} ('${cpf}','cliente 0${idx}', 'cliente0${idx}@gmail.com', 'Rua ${getRandomInt(
      1000,
      2000
    )}', '${
      idx % 2 === 0 ? "feminino" : "masculino"
    }', TO_DATE('0${getRandomInt(1, 9)}/0${getRandomInt(1, 9)}/${getRandomInt(
      1910,
      2019
    )}','DD/MM/YYYY'));\n\n`;
  }
  return clientes;
};

const dependentes = () => {
  let dependentes = "-----Dependentes------\n\n";
  let contDepen = 1;
  primaryKeys.clientes.forEach(element => {
    for (let idx = 0; idx < getRandomInt(1, 5); idx++) {
      const cpf =
        "" +
        getRandomInt(100, 999) +
        "." +
        getRandomInt(100, 999) +
        "." +
        getRandomInt(100, 999) +
        "-" +
        getRandomInt(10, 99);
      dependentes += `${insertDependente} ('${cpf}', TO_DATE('0${getRandomInt(
        1,
        9
      )}/0${getRandomInt(1, 9)}/${getRandomInt(
        1910,
        2019
      )}','DD/MM/YYYY'),'dependente 0${contDepen++}', '${element}');\n\n`;
    }
  });
  return dependentes;
};

const avaliacao = () => {
  const comentarios = [
    "Péssimo",
    "Ruim",
    "Neutro",
    "Ok",
    "Bom",
    "Muito Bom",
    "Top"
  ];
  let avaliacao = "-----Avaliação------\n\n";
  primaryKeys.clientes.forEach((element, idx) => {
    if (idx % 2 === 0) {
      avaliacao += `${insertAvaliacao} (${idx + 1}, ${getRandomInt(
        1,
        10
      )}, TO_DATE('0${getRandomInt(1, 9)}/0${getRandomInt(
        1,
        9
      )}/2019','DD/MM/YYYY'), '${
        comentarios[getRandomInt(0, comentarios.length - 1)]
      }','${element}');\n\n`;
    }
  });
  return avaliacao;
};

const funcionarios = () => {
  let funcionarios = "-----Funcionários-----\n\n";
  primaryKeys.funcionarios = [];
  for (let idx = 0; idx < 10; idx++) {
    const cpf =
      "" +
      getRandomInt(100, 999) +
      "." +
      getRandomInt(100, 999) +
      "." +
      getRandomInt(100, 999) +
      "-" +
      getRandomInt(10, 99);
    primaryKeys.funcionarios.push(cpf);

    funcionarios += `${insertFuncionario} ('${cpf}','funcionario 0${idx}', TO_DATE('0${getRandomInt(
      1,
      9
    )}/0${getRandomInt(1, 9)}/${getRandomInt(
      1910,
      2019
    )}','DD/MM/YYYY'), ${getRandomInt(1000, 1500)}.00,'${
      idx % 2 === 0 ? "camareiro" : "técnico"
    }');\n\n`;
  }
  return funcionarios;
};

const quarto = () => {
  const tipo = ["simples", "duplo twin", "duplo casal", "triplo"];

  primaryKeys.quarto = [];
  let quarto = "-----Quarto------\n\n";
  for (let idx = 0; idx < 30; idx++) {
    const numero = getRandomInt(100, 300);
    primaryKeys.quarto.push(numero);
    quarto += `${insertQuarto} ('${numero}', '${
      idx % 2 === 0 ? "frontal" : "lateral"
    }', '${tipo[getRandomInt(0, tipo.length - 1)]}', ${getRandomInt(
      100,
      300
    )}.00);\n\n`;
  }
  return quarto;
};

const produto = () => {
  const tipo = ["Lavanderia", "Bar", "Restaurante", "Frigobar"];

  primaryKeys.produto = [];
  let produto = "-----Produto------\n\n";
  for (let idx = 0; idx < 100; idx++) {
    const id = idx + 1;
    primaryKeys.produto.push(id);
    produto += `${insertProduto} (${id}, '${
      tipo[getRandomInt(0, tipo.length - 1)]
    }', 'produto ${idx}', ${getRandomInt(1, 10)}, ${getRandomInt(
      1,
      200
    )}.00);\n\n`;
  }
  return produto;
};

const telefone = () => {
  let telefone = "-----Telefone------\n\n";
  primaryKeys.clientes.forEach(element => {
    for (let idx = 0; idx < getRandomInt(1, 2); idx++) {
      telefone += `${insertTelefone} ('(0${getRandomInt(
        10,
        99
      )}) ${getRandomInt(10000, 99999)}-${getRandomInt(
        1000,
        9999
      )}', '${element}');\n\n`;
    }
  });
  return telefone;
};

const equipamento = () => {
  const tipo = ["televisão", "ar", "TV a cabo", "frigobar"];
  let equipamento = "-----Equipamentos------\n\n";
  primaryKeys.quarto.forEach(element => {
    for (let idx = 0; idx < getRandomInt(1, 5); idx++) {
      equipamento += `${insertEquipamento} ('${
        tipo[getRandomInt(0, tipo.length - 1)]
      } 0${idx + 1}', '${element}');\n\n`;
    }
  });
  return equipamento;
};

const hospeda = () => {
  let hospeda = "-----Hospeda------\n\n";
  let contHosp = 1;

  primaryKeys.clientes.forEach(element => {
    for (let idx = 0; idx < getRandomInt(1, 2); idx++) {
      let dia = getRandomInt(1, 5);
      let diaOut = dia + getRandomInt(1, 4);
      dia = "0" + dia;
      diaOut = "0" + diaOut;

      const mes = getRandomInt(1, 9);
      const ano = getRandomInt(2010, 2019);

      hospeda += `${insertHospeda} (${contHosp++}, TO_DATE('${dia}/0${mes}/${ano}','DD/MM/YYYY'), TO_DATE('${diaOut}/0${mes}/${ano}','DD/MM/YYYY'), '${element}', '${
        primaryKeys.quarto[getRandomInt(0, primaryKeys.quarto.length - 1)]
      }');\n\n`;
    }
  });
  return hospeda;
};

const reserva = () => {
  let reserva = "-----Reserva------\n\n";
  let contReserv = 1;

  primaryKeys.clientes.forEach(element => {
    for (let idx = 0; idx < getRandomInt(1, 3); idx++) {
      let dia = getRandomInt(1, 5);
      let diaOut = dia + getRandomInt(1, 4);
      dia = "0" + dia;
      diaOut = "0" + diaOut;

      const mes = getRandomInt(1, 9);
      const ano = getRandomInt(2010, 2019);

      reserva += `${insertReserva} (${contReserv++}, '${element}', '${
        primaryKeys.quarto[getRandomInt(0, primaryKeys.quarto.length - 1)]
      }', TO_DATE('${dia}/0${mes}/${ano}','DD/MM/YYYY'), TO_DATE('${diaOut}/0${mes}/${ano}','DD/MM/YYYY'));\n\n`;
    }
  });
  return reserva;
};

const venda = () => {
  let venda = "-----Venda------\n\n";
  for (let idx = 0; idx < 150; idx++) {
    venda += `${insertVenda} (${idx + 1}, ${
      primaryKeys.produto[getRandomInt(0, primaryKeys.produto.length - 1)]
    }, '${
      primaryKeys.quarto[getRandomInt(0, primaryKeys.quarto.length - 1)]
    }', TO_DATE('0${getRandomInt(1, 9)}/0${getRandomInt(1, 9)}/${getRandomInt(
      2015,
      2019
    )}','DD/MM/YYYY'), ${getRandomInt(1, 5)});\n\n`;
  }
  return venda;
};

const manutencao = () => {
  let manutencao = "-----Manutenção------\n\n";
  for (let idx = 0; idx < 50; idx++) {
    manutencao += `${insertManuntencao} (${idx + 1}, '${
      primaryKeys.funcionarios[
        getRandomInt(0, primaryKeys.funcionarios.length - 1)
      ]
    }', '${
      primaryKeys.quarto[getRandomInt(0, primaryKeys.quarto.length - 1)]
    }', TO_DATE('0${getRandomInt(1, 9)}/0${getRandomInt(1, 9)}/${getRandomInt(
      2015,
      2019
    )}','DD/MM/YYYY'), '${
      getRandomInt(0, 1) === 0 ? "limpeza" : "conserto"
    }', '${
      getRandomInt(0, 1) === 0 ? "Nenhuma" : "Uma bela e linda observação"
    }');\n\n`;
  }
  return manutencao;
};

/* -----------------------------------------------  */

const generateInserts = () => {
  const clientesString = clientes();
  const dependentesString = dependentes();
  const avaliacaoString = avaliacao();
  const funcionariosString = funcionarios();
  const quartoString = quarto();
  const produtoString = produto();
  const telefoneString = telefone();
  const equipamentoString = equipamento();
  const hospedaString = hospeda();
  const reservaString = reserva();
  const vendaString = venda();
  const manutencaoString = manutencao();

  save(
    clientesString +
      dependentesString +
      avaliacaoString +
      funcionariosString +
      quartoString +
      produtoString +
      telefoneString +
      equipamentoString +
      hospedaString +
      reservaString +
      vendaString +
      manutencaoString
  );
};

save = string => {
  fs.unlink("inserts.sql", function(err) {
    if (err) {
    }
    console.log("File deleted!");
  });

  fs.appendFile("inserts.sql", string, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("inserts.sql" + " was saved!");
  });
};

generateInserts();
