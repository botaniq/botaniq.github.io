const ptLangQuotes = [
  'Ter uma outra língua é possuir uma segunda alma.',
  'Uma língua diferente é uma visão diferente da vida.',
  'Você vive uma vida nova para cada língua nova que você fala. Se você sabe apenas uma língua, você vive apenas uma vez.',
  'O conhecimento de línguas é a porta para a sabedoria.',
  'Não importa o quanto você vá devagar desde que não pare.',
  'Tudo o que a mente humana pode conceber e acreditar, ela pode conquistar.',
  'Quem não arrisca não petisca.',
  'Seja sempre você mesmo, se expresse, tenha fé em si mesmo, não busque uma personalidade bem-sucedida e tente duplicá- la.',
  'Paciência, persistência e suor fazem uma combinação imbatível para o sucesso.',
  'Não vise o sucesso se você o quiser; basta fazer o que você ama e acredita, que ele virá naturalmente.',
  'Eu falhei uma e outra e outra vez na minha vida, e é por isso que eu consegui.',
  'Eu não meço o sucesso de um homem pelo quão alto ele sobe, mas o quão alto ele salta quando atinge o fundo',
  'O tamanho do seu sucesso é medido pela força do seu desejo, o tamanho do seu sonho e como você lida com a decepção ao longo do caminho.',
  'Um homem de sucesso é aquele que consegue estabelecer uma base firme com os tijolos que foram lançados contra ele.',
  'Amar não é nada. Ser amado é alguma coisa. Mas amar e ser amado é tudo.',
  'As estrelas não brilham sem escuridão.',
  'A família é uma das obras-primas da natureza.',
  'Andar com um amigo no escuro é melhor que caminhar sozinho na luz.',
  'Um amigo é aquele que te dá total liberdade de ser você mesmo.',
  'Meu melhor amigo é aquele que desperta o melhor em mim.',
  'A mentira tem pernas curtas.',
  'Na cama que farás, nela te deitarás.',
  'Obrigado por ser sempre o meu arco-íris depois da tempestade.',
  'Os limites da minha linguagem são os limites do meu mundo.',
  'Um idioma novo é uma vida nova.',
];

const enLangQuotes = [
  'To have another language is to possess a second soul.',
  'A different language is a different vision of life.',
  'You live a new life for every new language you speak. If you know only one language, you live only once.',
  'Knowledge of languages is the doorway to wisdom.',
  'It does not matter how slowly you go as long as you do not stop.',
  'Whatever the mind of man can conceive and believe, it can achieve.',
  'Those who don’t take a risk don’t have a snack',
  'Always be yourself, express yourself, have faith in yourself. Do not go out and look for a successful personality and duplicate it.',
  'Patience, persistence and perspiration make an unbeatable combination for success.',
  'Don\'t aim for success if you want it; just do what you love and believe in, and it will come naturally.',
  'I\'ve failed over and over and over again in my life and that is why I succeed.',
  'I don\'t measure a man\'s success by how high he climbs but how high he bounces when he hits bottom.',
  'The size of your success is measured by the strength of your desire; the size of your dream; and how you handle disappointment along the way.',
  'A successful man is one who can lay a firm foundation with the bricks others have thrown at him.',
  'To love is nothing. To be loved is something. But to love and be loved is everything.',
  'Stars can\'t shine without darkness.',
  'The family is one of nature\'s masterpieces.',
  'Walking with a friend in the dark is better than walking alone in the light.',
  'A friend is someone who gives you total freedom to be yourself.',
  'My best friend is the one who brings out the best in me.',
  'The lie has short legs.',
  'You’ll lie on the bed you’ll make.',
  'Thank you for always being my rainbow after the storm.',
  'The limits of my language are the limits of my world.',
  'A new language is a new life.',
];

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

document.addEventListener('DOMContentLoaded', function() {
  const alertPt = document.getElementById('alertPt');
  const alertEn = document.getElementById('alertEn');
  const quoteBtn = document.getElementById('quoteBtn');



  quoteBtn.addEventListener('click', function () {
    const randomIndex = randomInteger(0, enLangQuotes?.length - 1);

    alertPt.textContent = ptLangQuotes[randomIndex];
    alertEn.textContent = enLangQuotes[randomIndex];
  });
});
