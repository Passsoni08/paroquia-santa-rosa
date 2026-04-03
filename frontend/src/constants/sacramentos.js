import { FaWater, FaCross, FaPrayingHands, FaHeart, FaHandsHelping, FaChurch, FaBible } from 'react-icons/fa';

export const SACRAMENTOS = [
  {
    id: 'batismo',
    nome: 'Batismo',
    icon: FaWater,
    resumo: 'O sacramento que nos torna filhos de Deus e membros da Igreja.',
    descricao: 'O Batismo é o primeiro sacramento da iniciação cristã. Pelo Batismo, somos libertados do pecado original e renascemos como filhos de Deus, tornando-nos membros de Cristo e da Igreja.',
    requisitos: [
      'Certidão de nascimento da criança',
      'Documento dos pais e padrinhos',
      'Curso de preparação para pais e padrinhos',
      'Padrinhos devem ser batizados e crismados',
    ],
  },
  {
    id: 'eucaristia',
    nome: 'Eucaristia',
    icon: FaBible,
    resumo: 'O sacramento do Corpo e Sangue de Cristo.',
    descricao: 'A Eucaristia é fonte e ápice de toda a vida cristã. Nela, Jesus Cristo se faz presente sob as aparências do pão e do vinho, oferecendo-se como alimento espiritual.',
    requisitos: [
      'Ter recebido o Batismo',
      'Participar da catequese (mínimo 2 anos)',
      'Idade mínima de 9 anos',
      'Participação ativa na comunidade',
    ],
  },
  {
    id: 'crisma',
    nome: 'Crisma',
    icon: FaCross,
    resumo: 'O sacramento que confirma e fortalece a graça batismal.',
    descricao: 'A Confirmação ou Crisma completa a graça do Batismo. Pelo dom do Espírito Santo, o crismado é fortalecido para testemunhar a fé cristã com mais coragem.',
    requisitos: [
      'Ter recebido Batismo e Eucaristia',
      'Participar da catequese de Crisma (1 a 2 anos)',
      'Idade mínima de 15 anos',
      'Escolher um padrinho/madrinha crismado(a)',
    ],
  },
  {
    id: 'confissao',
    nome: 'Reconciliação',
    icon: FaPrayingHands,
    resumo: 'O sacramento do perdão e da misericórdia de Deus.',
    descricao: 'No sacramento da Reconciliação, o fiel confessa seus pecados ao sacerdote e recebe o perdão de Deus. É um encontro pessoal com a misericórdia divina.',
    requisitos: [
      'Ter feito a Primeira Eucaristia',
      'Exame de consciência prévio',
      'Horários disponíveis na paróquia',
    ],
  },
  {
    id: 'matrimonio',
    nome: 'Matrimônio',
    icon: FaHeart,
    resumo: 'O sacramento da aliança conjugal entre homem e mulher.',
    descricao: 'O Matrimônio é a aliança pela qual um homem e uma mulher constituem entre si uma comunidade de vida e amor, elevada por Cristo à dignidade de sacramento.',
    requisitos: [
      'Ambos devem ser batizados',
      'Curso de preparação para noivos',
      'Documentação civil e eclesiástica',
      'Agendar com no mínimo 6 meses de antecedência',
    ],
  },
  {
    id: 'ordem',
    nome: 'Ordem',
    icon: FaChurch,
    resumo: 'O sacramento do ministério apostólico.',
    descricao: 'O sacramento da Ordem consagra homens para o serviço da comunidade como diáconos, presbíteros ou bispos, perpetuando a missão confiada por Cristo aos apóstolos.',
    requisitos: [
      'Vocação discernida com orientação espiritual',
      'Formação no seminário',
      'Consultar o pároco para orientação',
    ],
  },
  {
    id: 'uncao',
    nome: 'Unção dos Enfermos',
    icon: FaHandsHelping,
    resumo: 'O sacramento de fortalecimento na doença.',
    descricao: 'A Unção dos Enfermos confere uma graça especial ao cristão que enfrenta doença grave ou a fragilidade da velhice, fortalecendo-o com a paz e a coragem.',
    requisitos: [
      'Pessoa em estado de doença grave ou idosa',
      'Solicitar ao pároco ou à secretaria',
      'Disponível também em hospitais',
    ],
  },
];
