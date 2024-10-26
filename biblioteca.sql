-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22/10/2024 às 13:31
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `biblioteca`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `adm`
--

CREATE TABLE `adm` (
  `ID` int(11) NOT NULL,
  `NOME` varchar(250) NOT NULL,
  `LOGIN` varchar(16) NOT NULL,
  `SENHA` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `adm`
--

INSERT INTO `adm` (`ID`, `NOME`, `LOGIN`, `SENHA`) VALUES
(1, 'Santana', 'gumkyy', 'vini9000'),
(2, 'Terezinha', 'tere', '1234'),
(3, 'Eliane', 'gatonna', '4321'),
(4, 'Sophia', 'sopa', '1234'),
(5, 'Noemi', 'noemiii', '1234'),
(6, 'João Celso', 'paulofreire', 'facebook'),
(7, 'Duarte', 'razawaky', 'pinto'),
(10, 'Maria Victória', 'vick', '1234');

-- --------------------------------------------------------

--
-- Estrutura para tabela `autor`
--

CREATE TABLE `autor` (
  `ID` int(11) NOT NULL,
  `NOME` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `autor`
--

INSERT INTO `autor` (`ID`, `NOME`) VALUES
(1, 'Clarisse Linspector'),
(2, 'Franklin Távora');

-- --------------------------------------------------------

--
-- Estrutura para tabela `autores`
--

CREATE TABLE `autores` (
  `TOMBO` int(11) NOT NULL,
  `ID_AUTOR` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `autores`
--

INSERT INTO `autores` (`TOMBO`, `ID_AUTOR`) VALUES
(1, 2),
(2, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria`
--

CREATE TABLE `categoria` (
  `ID` int(11) NOT NULL,
  `NOME` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `categorias`
--

CREATE TABLE `categorias` (
  `TOMBO` int(11) NOT NULL,
  `ID_CATEG` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `curso`
--

CREATE TABLE `curso` (
  `ID` int(11) NOT NULL,
  `NOME` varchar(40) NOT NULL,
  `EIXO` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `emprestimo`
--

CREATE TABLE `emprestimo` (
  `ID` int(11) NOT NULL,
  `DATA_RETIRADA` datetime NOT NULL,
  `PRAZO_DEV` date NOT NULL,
  `DATA_DEV` date NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `ID_ADM` int(11) NOT NULL,
  `ID_LIVRO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `emprestimo`
--

INSERT INTO `emprestimo` (`ID`, `DATA_RETIRADA`, `PRAZO_DEV`, `DATA_DEV`, `ID_USER`, `ID_ADM`, `ID_LIVRO`) VALUES
(1, '2024-10-22 12:37:38', '2024-10-22', '2024-10-29', 22198, 2, 1),
(2, '2024-10-22 13:27:23', '2024-10-22', '2024-10-29', 22098, 5, 8);

-- --------------------------------------------------------

--
-- Estrutura para tabela `livro`
--

CREATE TABLE `livro` (
  `TOMBO` int(11) DEFAULT NULL,
  `NOME` varchar(200) NOT NULL,
  `ADM_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `livro`
--

INSERT INTO `livro` (`TOMBO`, `NOME`, `ADM_ID`) VALUES
(1, 'A', 0),
(2, 'B', 0),
(3, 'C', 0),
(4, 'D', 0),
(5, 'E', 0),
(6, 'F', 0),
(7, 'G', 0),
(8, 'H', 0),
(9, 'I', 0),
(10, 'J', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `sistema`
--

CREATE TABLE `sistema` (
  `ID` int(11) NOT NULL,
  `EMAIL` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `sistema`
--

INSERT INTO `sistema` (`ID`, `EMAIL`) VALUES
(1, 'bibliotec.etec@gmail.com');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `RA` int(11) NOT NULL,
  `NOME` varchar(250) NOT NULL,
  `SERIE` varchar(250) NOT NULL,
  `EMAIL` varchar(250) NOT NULL,
  `TELEFONE` varchar(14) NOT NULL,
  `ADM_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`RA`, `NOME`, `SERIE`, `EMAIL`, `TELEFONE`, `ADM_ID`) VALUES
(1111, 'Teste Usuário', 'ling', 'usuariotester@gmail.com', '(14) 99999-999', 2),
(20054, 'Heitor Oliveira Santana', 'enf', 'heitor.santana@gmail.com', '(14) 99956-587', 1),
(21222, 'Juziscreitan de Andrade José Américo', 'ds', 'juziscreitanamordoce@gmail.com', '(14) 99842-061', 1),
(22098, 'Julia Herreira Fresneda', 'ling', 'julia.fresneda69@etec.sp.gov.br', '(14) 99869-632', 2),
(22198, 'Vinícius Oliveira Santana', 'ds', 'oliveirasantanavinicius@gmail.com', '(14) 99786-546', 1),
(22211, 'Ketyllyn Silva Ribeiro Santos Jesus ', 'rh', 'jesusketymiau@hotmail.com', '(14) 99692-355', 2),
(22222, 'Sophia Martins da Conceição Munhoz', 'adm', 'cmunhoz@gmail.com', '(14) 99795-833', 1),
(22313, 'José Mignony Felácio', 'juri', 'jmignoy@gmail.com', '(16) 99955-658', 2),
(22325, 'Luciano', 'cont', 'luciano@gmail.com', '(14) 99787-858', 1),
(22435, 'Fernando Mennezes', 'ling', 'ferdinando@gmail.com', '(14) 00000-000', 1),
(22458, 'Faline San', 'ling', 'falinesanyoutuber@gmail.com', '(54) 78995-633', 2),
(22548, 'Jaqueline', 'ds', 'jaqueline-123@gmail.com', '(14) 99899-790', 1),
(25000, 'Professor Teste', 'none', 'professor.teste@gmail.com', '(14) 12345-678', 1),
(27854, 'Jadiane Roberta', 'ds', 'jadiane.roberta@etec.sp.gov.br', '(14) 99876-545', 2),
(55555, 'Jorge Amsterdã dos Santos Pereira Filho', 'none', 'jorge.santos55@etec.sp.gov.br', '(14) 00000-000', 2),
(67282, 'Terezinha', 'rh', 'terezinha.boasorte@gmail.com', '(14) 87877-238', 1),
(96688, 'Estefânia', 'none', 'estefania123@etec.sp.gov.br', '(14) 08798-392', 2);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `adm`
--
ALTER TABLE `adm`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `autores`
--
ALTER TABLE `autores`
  ADD PRIMARY KEY (`TOMBO`,`ID_AUTOR`),
  ADD KEY `AUTOR` (`ID_AUTOR`);

--
-- Índices de tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`TOMBO`,`ID_CATEG`);

--
-- Índices de tabela `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `emprestimo`
--
ALTER TABLE `emprestimo`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `USER` (`ID_USER`),
  ADD KEY `LIVRO` (`ID_LIVRO`),
  ADD KEY `ADM` (`ID_ADM`);

--
-- Índices de tabela `livro`
--
ALTER TABLE `livro`
  ADD UNIQUE KEY `TOMBO` (`TOMBO`);

--
-- Índices de tabela `sistema`
--
ALTER TABLE `sistema`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`RA`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `adm`
--
ALTER TABLE `adm`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `autor`
--
ALTER TABLE `autor`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `curso`
--
ALTER TABLE `curso`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `emprestimo`
--
ALTER TABLE `emprestimo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `sistema`
--
ALTER TABLE `sistema`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `autores`
--
ALTER TABLE `autores`
  ADD CONSTRAINT `AUTOR` FOREIGN KEY (`ID_AUTOR`) REFERENCES `autor` (`ID`),
  ADD CONSTRAINT `LIVRO_AUTOR` FOREIGN KEY (`TOMBO`) REFERENCES `livro` (`TOMBO`);

--
-- Restrições para tabelas `emprestimo`
--
ALTER TABLE `emprestimo`
  ADD CONSTRAINT `ADM` FOREIGN KEY (`ID_ADM`) REFERENCES `adm` (`ID`),
  ADD CONSTRAINT `LIVRO` FOREIGN KEY (`ID_LIVRO`) REFERENCES `livro` (`TOMBO`),
  ADD CONSTRAINT `USER` FOREIGN KEY (`ID_USER`) REFERENCES `usuario` (`RA`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
