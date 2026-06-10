import { LocalActivity, Review, Appointment } from './types';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Wagner Moura',
    rating: 5,
    comment: 'Adorei de coração essa peixada, e com essa promoção ficou melhor ainda hahaha!',
    date: '10/06/2026',
  },
  {
    id: 'rev-2',
    userName: 'José de Alencar',
    rating: 4,
    comment: 'A peixada e o ambiente é muito bom. Só achei o atendimento um pouco demorado.',
    date: '09/06/2026',
  },
  {
    id: 'rev-3',
    userName: 'Chico Buarque',
    rating: 5,
    comment: 'Eu não sou muito fã de peixe, mas essa peixada mudou meu pensamento. Nota 10!!!!',
    date: '08/06/2026',
  }
];

export const IMAGES = {
  welcomeBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCTuq_3oaY94cCEYhi3gm9a8da9ODKYJMl0bi9zY7la-GD-KtAFUSaLZWyJWjPInVuh3Q7lUrq72UpQhrD3fPU5z5E7ss-olwJRFaT6O86Ks86Jj3Qyf7pSGS89hg6OyPuPcc6CBG1nqjDV3FKde-Xj5xMMw4kP-IjmDHkG4oPKrfx601p3FcwAxD-jLaRSddtyzQxNFihZNEBAqI5YabmAGl8qS6WSteB3IerwzK22AdhWdThJ9cK7q7LCqFlTEKqE2lJ7BOjW2DS',
  googleLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLmXwpFfGyksVKGeJDh0wk48SV8qpBR25xvR8dhkvgAksRwQuaybf0CMgixtrWAkA_6k2KU1d6Y1-1pcoZxskFajcNW99FZuDn-SEzwR-aW8y-2wTt8ggS97MUoTRMUaoGLdmWzur33bFfT0l1eP62cPiuShJhjpAqrT9g4LoqNHT_dsIz6nHDu0DXl1naVXPrfyQjdJn4oIqK-17Nji5FLCPH3T2IozHigAeDlwMIIvIvHFRe15M5EV5HuvlvUhw7P9d8mMrR1u2T',
  userProfile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-IEoruuUEIIvhTx36sOSlPOm1VFAbfg04QatZilqDByTYIaH-t2o3oofeu9texxe6ck3BP-8NzPhyXmYweHCxKqwg4WkD2Y-DvvxFDdbarPzw4mAk3oU4vpNCG71bEmRB9W89mwAvlcl3qDpP7nuu37RRPo1Pxp8onODGRNjDCuOE4aYIdP1C0XejUxZZ68BS3OssbbiPRUlena8pP73CmA3GVfbhLPPOLPNBw8rxbFMRUzHxp9a733HSemZhOn20avalLHcpRYF3',
  searchMap: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_d0Axx6ZQB96yvc6V32kikOpfGjXWPHrUXgIdQ7lIN-hUWw2Rg4Mag8QF_rnJXMYiNEZFRpRVjRyWSLdWtz7dp194uJMrUA9dLa7MJcI2th083xkgA-aj7JCvZCu-y5SFlvo1sLz0bvLftf-mB0kFq25ZSJx3H73RjlMgIbnPpnwCUd1x2G38B3aSYz6PpzPMnFH5LcJU4crfxwtHshSX3IY3gA-i-41kKuMCu4_hhHGsZZ2YjEn08MKUAfojf41Oowvaeg80kp3g',
  interactiveMap: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6TSC9pb8SuN4XR8ucZ5jnDdxQeNXQVyPAChLRCvc0-ztrtZPgK3HMjh3nQ2F_J_nRxDM50-0iaF2vlFXS9beVfad7TBrasV3yWSTvSsHdAEdGZ-LfBxiaOd3bAUVpnKZVd8bovkD_35prBLf9yKiUmPtsCbxGkgtaAdXBcTqdkmEXhPghWH_go6MoerzSQOQz1fme08VK3bCQ7jfP8IoBvRSbuyLfL_FeWwmxlUpKx4Rosi3HKN0noPeXEBnYhu_ScuAkQrIY_jZG',
  surfMapDetail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2U23Vc5aJ_4qdtvGc3EhMFOP_nPAZxIWeckIIjb3XgvaLyVZKXIutrVGpNkMjCXIKO1m-gMDiZFC7tKA5FSAk3bSjT_uOpDOdccxR8xNQZmp8_Jwj_vrmmNVzbem7NDmgzqoNJ-CNItHl1-9bu55fHhmvp0fWcb1O_rg5HACW9IfXk9KLX7iN5ockTvnaXW7d0MXD26hAZj8-RCzs3YX4uLxK1xJAkeRrdAWjE8jaC7uS5PpSaZGogqX9_zm9evM1vlyhhhokT-Y1',
  peixadaMapDetail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXP6m4TyVhSq6KkMLe-fMXaEZtMYcp8BAlgX-8YU0OdhDu0eovNhm6z4JUGuxNw1G0nJnIOuU7NuKqDR9bLkSh2vTAAqornsiZbePsx4ErMvKho_7iq74Yjx2K_U3OBPohfzmJl0rteBtgms5UJgu3cgkrQvPVMgYF49iuusPautGi1lOeLXSBgdcSC6IK-NOw9qSa0pwF_afseENLON6j6XjYsx2PiK071zAhq3QI-rE7EJvMGgYxWC2ZIz4QmaFOX-eqYEBhG2Mf',
  barracaLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdrJVPwycg2fzlZ_ah4C_V5T0A6FEjademeA5BDpUo_NVGUu2YMVBfr05BG0AWzBG0rNUSnte8fsJG_s42LpR5qZhshhN5FSkReigH_wcPgK7FI9wjz6ZvbvdxllzdoO_QpWW08N_iXvSw5oROwhtkiivVZUK8wICg82yDqP9vpXDHCCEzYemmxmrHAh8XAKSxtnqKvsukuuXxJC02zTYO8kQyllzV2bNC-rSnM_1L7bbtO8YZMBJK1yiNtEAkfnWP4p0obQ8kaGna',
  fishIcon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9gc5B9PM-Pbj8co3zfDGXOCztXJQvy0J0v7h3QNR2aj2ZzdWffIPtyrFadwES3ovQ2iVbMzpkCWrCq8FMLLQ9JsxRll52sO50_FFIbLA7Pgc55e1oyYUS5G8uUqtEG09wu5IpsmiQJZ3sSZ48BsJ5GmBhxycA-E62MQlC3AuQS79yxOLtuPTXc5OTQ8r_Ytg68UAIB9x-sfPvkD0rYv65E6_32tYGt4rKvAVv9Q5VkVsFoFai_wHNvtNSlswMqK4tbhsSX4-Ktg3H',
  moqueca: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpLFGe_vBdflg8ws9j2zNE6PE1FGXA0_F9KpN1gLz3s-De00mqmOpcREcWCMAESi1RQlhuDqYCbxR0FTCGF7KmDtJztES5Hy7DSX2_eaap4FCv2-xaPw8ua6vN94a5AA_XcPJQs0_qnYmEixpuZBlWLRFgmBUp_8UjEQIxRHd9QyBQo5v7-LIdQXs0qgvuzeMg4rWA2AMUdCwtB6PC5ZGe00yOVl3h93OBeS3BuJiZLJ2zYg00aS5XxnEfGAY557MWFwJtHifbCIHE',
  drink: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIFSZymU8rL-lMngNLa1p9-HklMHPliRolRXen5_ia8mzzqsuDiV44nNMCY2okTJtZZ3y7bsQ8YpRWT0SC_rwXP19G5hC9tHQleuY9-ksc0zlPqssgdNS5Qt0jqLbC2PrUBOIpRIx8qAUjnKLmIIWyxDuvatB_5j7W7MfzeMbIrUUrQhCzjihm1mFto2OaByjLYZuaWMCSlAtN5RusU0Z6rMbI8jKTti--pujnPcooHOsq67A5ZmoI55DU85YatYs4aicTE3BQcwhK',
  soup: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDXbknGLRHYmhFq-qrOWtwxlpBFsKNrVDcn_LH_HYbqRizmPohsUl3nHHuxRKKqVfbLUihrXzGWgCRgw8gsvzBy4SH2HNvbYZP-a9HLUbaoOtDzWMmgFZ4qW2PRIL5YU1S2sarYXzQDYc70sDVTvfzwFoXZpAfxtDJkhWYsBb3gANejngQaWIYc-t1RZYQEdjgnOk9i2oWeqFqvbW7LOq1Q7zc1zdN91JsfEsfkfd-DnC4ffujjJMRf2yeg2re_154gT_3nq8MKxwA',
  eventDetailMockMap: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArsmvyoh7dbnKS_GP_BHBhCWBfM4Nn0yuSn7w7wSMSkZEve7G1dvv3bhj9cuYHIXZICWSCa6AQaDc2TJvXWnN3UV8WAjaLdszux6ViUQS54cTvF9ZGWbcs9av2Tfurk_VbE8l2v0bNbNA4WvTQSoIM7kOTqhEY2fcIW8SRVVDL22ZudoaptKy8-2HFllV90SbZECjkc2NGEIgN8_J0hes1Hwo9sjvEHMV1qRvLKlCL9fd78pR2Gvmb01NHXWX0SDFd0NFEPnUda7Cv',
  serviceDetailMockMap: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD62eGqyhYdImkbbVPQuPxcT5fjre0RhbYNrOju62bjyJKVy-k3veVIsbItVpO1PV0RZpztlPXogTvguDTBfOZJuVy2HWSzWSEzVm7k450TFDB-o-3J5atD92PmN8Gs9rihoOEZkZZMpqSynrOsmDLNH-1HwMmr_dcDVztZ9YlU6z-6DlHdp5eqjFmFb9J4ccZsoG_FV0593DedHdz8K5i9A-WcPgExQ0Hkz-YHogAPbqoyMHWJUC_gFzm-a0xg6EPOc08Gbgqz8bic'
};

export const ACTIVITIES: LocalActivity[] = [
  {
    id: 'act-1',
    title: 'Aula de Surf',
    icon: 'Waves',
    date: '10/04/2026',
    location: 'Praia do Cupe',
    organizer: 'Surf estilo de vida',
    price: 'R$80,00 + prancha',
    rating: 4.8,
    reviewsCount: '230 avaliações',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=200',
    details: 'Venha aproveitar essa grande oportunidade de conhecer seu novo estilo de vida com a Surf estilo de vida. Aqui te garantimos um modo divertido e seguro de aprender surf, com instrutores certificados e o melhor cenário das praias de Porto de Galinhas.',
    category: 'Surf',
    type: 'evento'
  },
  {
    id: 'act-2',
    title: 'Festival de Música',
    icon: 'Music',
    date: '15 a 20/05/2026',
    location: 'Porto de Galinhas Centrinho',
    organizer: 'Prefeitura Municipal',
    price: 'Entrada gratuita',
    rating: 4.9,
    reviewsCount: '2.3k interessados',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=200',
    details: 'Grande festival de música celebrando ritmos nordestinos e bandas nacionais nas praias de Porto de Galinhas. Venha curtir com a família, barraquinhas de comida e clima maravilhoso!',
    category: 'Geral',
    type: 'evento'
  },
  {
    id: 'act-3',
    title: 'Trilha em Gaibu',
    icon: 'Compass',
    date: '30/05/2026',
    location: 'Início: Arcomix Gaibu',
    organizer: 'Guias Locais de Cabo',
    price: 'Guia R$15',
    rating: 4.91,
    reviewsCount: '128 avaliações',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=200',
    details: 'Incrível caminhada ecológica pelos mirantes de Gaibu, passando pela histórica tirolesa, Forte de Castelo e terminando em Calhetas.',
    category: 'Caminhada',
    type: 'evento'
  },
  {
    id: 'act-4',
    title: 'Peixada do Nê',
    icon: 'Fish',
    date: '10 de Abril, 2026',
    location: 'Barraca Céu Azul - Porto',
    organizer: 'Barraca Céu Azul',
    price: 'R$ 75,00 (15% OFF nê-promo)',
    rating: 4.8,
    reviewsCount: '230 avaliações',
    image: IMAGES.fishIcon,
    details: 'Venha aproveitar a maravilhosa peixada da Barraca Céu Azul. Estamos com uma promoção incrível em comemoração do aniversário do Nê, o fundador da nossa barraca. Só amanhã, a partir das 05h, 15% de desconto na primeira compra da sua peixada. VEM!!!',
    category: 'Restaurantes',
    type: 'servico'
  },
  {
    id: 'act-5',
    title: 'Muqueca Baiana',
    icon: 'Soup',
    date: 'Diariamente - 18h às 02h',
    location: 'Orla de Porto de Galinhas',
    organizer: 'OrlaBar',
    price: 'Aniversário do bar - 15% OFF na muqueca baiana',
    rating: 4.85,
    reviewsCount: '230 avaliações',
    image: IMAGES.moqueca,
    details: 'Sabor autêntico com peixe fresco da costa, coentro, azeite de dendê legítimo e leite de coco fresco cozido devagar na panela de barro.',
    category: 'Restaurantes',
    type: 'servico'
  },
  {
    id: 'act-6',
    title: 'Caipiroska Carnavalesca',
    icon: 'GlassWater',
    date: '30/05/2026',
    location: 'Praia de Gaibu',
    organizer: 'Nininho Drinks Tropicais',
    price: '20% OFF na Caipiroska',
    rating: 4.91,
    reviewsCount: '128 avaliações',
    image: IMAGES.drink,
    details: 'Bebida super refrescante feita com lima fresca, kiwi, açúcar orgânico e destilados premium. Perfeito para o calor tropical.',
    category: 'Bares',
    type: 'servico'
  },
  {
    id: 'act-7',
    title: 'Caldinho Rabo de Galo',
    icon: 'Bean',
    date: '23/05/2026',
    location: 'Orla de Boa viagem',
    organizer: 'Caldinho do Esquerdinha',
    price: '15% de desconto se for seu aniversário',
    rating: 4.95,
    reviewsCount: '98 avaliações',
    image: IMAGES.soup,
    details: 'Tradição praiana absoluta: caldinho de feijão preto ou fava, encorpado, servido com croutons dourados, cheiro verde e ovo de codorna.',
    category: 'Autônomos',
    type: 'servico'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-peixada',
    title: 'Peixada do Nê',
    icon: 'set_meal',
    date: '10/08 - 20h',
    location: 'Cupe',
    organizer: 'Barraca Céu Azul',
    price: '15% de desconto na primeira compra',
    rating: 4.8,
    reviewsCount: '200 avaliações',
    category: 'Restaurantes'
  },
  {
    id: 'app-music',
    title: 'Festival de Música',
    icon: 'music_note',
    date: '15 a 20/05 - 19h',
    location: 'Porto de Galinhas',
    organizer: 'Entrada gratuita',
    price: '2.3k interessados',
    rating: 4.9,
    reviewsCount: 'Prefeitura',
    category: 'Geral'
  }
];
