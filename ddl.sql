-- Esquema padrão para o projeto de Banco de Dados 1 2019.1

CREATE TABLE CLIENTE (
    cpf 	VARCHAR2(14),
	email 	VARCHAR2(50) NOT NULL,
	nome 	VARCHAR2(100) NOT NULL,
	endereco 	VARCHAR2(100) NOT NULL,
	sexo 	VARCHAR2(10) NOT NULL,
	data_nasc 	DATE NOT NULL,
	
	
	CONSTRAINT pk_cliente
	PRIMARY KEY (cpf)
);


CREATE TABLE FUNCIONARIO (
    cpf		VARCHAR2(14),
    nome 	VARCHAR2(100) NOT NULL,
    data_nasc 	DATE NOT NULL,
    salario	NUMBER(6,2) NOT NULL,
    funcao	VARCHAR2(50) NOT NULL,
	
	
	CONSTRAINT pk_funcionario
	PRIMARY KEY (cpf)
);

CREATE TABLE QUARTO (
	numero	VARCHAR2(20),
	tipo		VARCHAR2(50) NOT NULL,
	vista		VARCHAR2(50) NOT NULL,
	valor_diaria	 NUMBER(6,2) NOT NULL,

	CONSTRAINT pk_quarto
	PRIMARY KEY (numero)
);

CREATE TABLE RESERVA (
	id_reserva INT ,
	cpf_cliente VARCHAR2(14),
	numero_quarto	VARCHAR2(20),
	dia_check_in DATE NOT NULL,
	dia_check_out DATE NOT NULL,

    CONSTRAINT fk_reserva_cliente
    FOREIGN KEY (cpf_cliente) 
    REFERENCES  CLIENTE(cpf),

    CONSTRAINT fk_reserva_quarto    
    FOREIGN KEY (numero_quarto) 
    REFERENCES  QUARTO(numero),

	CONSTRAINT pk_reserva
	PRIMARY KEY (id_reserva)
);

CREATE TABLE MANUTENCAO (
	id_manutencao INT,
	cpf_funcionario VARCHAR2(14),
	numero_quarto	VARCHAR2(20),
	data	DATE NOT NULL,
	tipo_manutencao	VARCHAR2(50) NOT NULL,
	observacao	VARCHAR2(255),

    CONSTRAINT fk_manutencao_funcionario
    FOREIGN KEY (cpf_funcionario) 
    REFERENCES  FUNCIONARIO(cpf),

    CONSTRAINT fk_manutencao_quarto
    FOREIGN KEY (numero_quarto) 
    REFERENCES  QUARTO(numero),

	CONSTRAINT pk_manutencao
	PRIMARY KEY (id_manutencao)
);

CREATE TABLE PRODUTO (
    id	INT,
    tipo	VARCHAR2(50) NOT NULL,
    nome 	VARCHAR2(100) NOT NULL,	
    valor NUMBER(5,2) NOT NULL,
    descricao	VARCHAR2(255) NOT NULL,
	
	CONSTRAINT pk_produto
	PRIMARY KEY (id)
);


CREATE TABLE AVALIACAO (
    id	INT,
    nota INT NOT NULL,
	data	DATE NOT NULL,
	comentario	VARCHAR2(255),
	cpf_cliente VARCHAR2(14) NOT NULL,

    CONSTRAINT fk_avaliacao_cliente    
    FOREIGN KEY (cpf_cliente) 
    REFERENCES  CLIENTE(cpf),
	
	CONSTRAINT pk_avaliacao
	PRIMARY KEY (id)	
);

CREATE TABLE DEPENDENTE (
    cpf 	VARCHAR2(14),
    data_nasc 	DATE NOT NULL,
    nome 	VARCHAR2(100) NOT NULL,
	cpf_cliente VARCHAR2(14) NOT NULL,
    
    CONSTRAINT fk_dependente_cliente 
    FOREIGN KEY (cpf_cliente) 
    REFERENCES  CLIENTE(cpf),
	
	CONSTRAINT pk_dependente
	PRIMARY KEY (cpf, cpf_cliente)	
);


CREATE TABLE HOSPEDA (
	id_hospedagem INT,
	dia_check_in DATE NOT NULL,
	dia_check_out DATE NOT NULL,
	cpf_cliente VARCHAR2(14),
    numero_quarto	VARCHAR2(20),

    CONSTRAINT fk_hospeda_cliente 
    FOREIGN KEY (cpf_cliente) 
    REFERENCES  CLIENTE(cpf),

    CONSTRAINT fk_hospeda_quarto 
    FOREIGN KEY (numero_quarto) 
    REFERENCES  QUARTO(numero),

	CONSTRAINT pk_hospeda
	PRIMARY KEY (id_hospedagem)
);


CREATE TABLE VENDA (
    id_venda INT,
    id_produto INT,
    numero_quarto VARCHAR2(20),
    data	DATE NOT NULL,
    quantidade	INT NOT NULL,

    CONSTRAINT fk_venda_quarto 
    FOREIGN KEY (numero_quarto) 
    REFERENCES  QUARTO(numero),

    CONSTRAINT fk_venda_produto     
    FOREIGN KEY (id_produto) 
    REFERENCES  PRODUTO(id),
            
	CONSTRAINT pk_venda
	PRIMARY KEY (id_venda)
);

CREATE TABLE TELEFONE (
	telefone VARCHAR2(14),
	cpf_cliente VARCHAR2(14),

    CONSTRAINT fk_telefone_cliente 
    FOREIGN KEY (cpf_cliente) 
    REFERENCES  CLIENTE(cpf),

	CONSTRAINT pk_telefone
	PRIMARY KEY (cpf_cliente, telefone)
);

CREATE TABLE EQUIPAMENTO (
	equipamento VARCHAR2(14),
    numero_quarto	VARCHAR2(20),

    CONSTRAINT fk_equipamento_quarto 
    FOREIGN KEY (numero_quarto) 
    REFERENCES  QUARTO(numero),
	
	CONSTRAINT pk_equipamento
	PRIMARY KEY (numero_quarto, equipamento)
);