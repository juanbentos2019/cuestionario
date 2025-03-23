document.addEventListener("DOMContentLoaded", function() {
  // Variables globales
  let currentQuizQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;            // Modo individual
  let score1 = 0, score2 = 0; // Modo dual
  let answersHistory = [];      // Historial modo individual
  let answersHistory1 = [];     // Historial jugador 1 (modo dual)
  let answersHistory2 = [];     // Historial jugador 2 (modo dual)
  let currentSelection = null;    // Selección individual
  let currentSelection1 = null;   // Selección jugador 1
  let currentSelection2 = null;   // Selección jugador 2

  let gameMode = "individual"; // Por defecto modo individual

  // Variables para nombres en modo dual
  let player1Name = "";
  let player2Name = "";

  // Referencias a elementos del DOM para selección de modo
  const modeSelectionContainer = document.getElementById("mode-selection-container");
  const modeIndividualBtn = document.getElementById("mode-individual");
  const modeDualBtn = document.getElementById("mode-dual");
  const playerNamesContainer = document.getElementById("player-names-container");
  const player1Input = document.getElementById("player1-name");
  const player2Input = document.getElementById("player2-name");
  const startQuizBtn = document.getElementById("start-quiz");

  // Referencias a elementos del DOM para el quiz y resultados
  const quizContainer = document.getElementById("quiz-container");
  const questionContainer = document.getElementById("question-container");
  const nextBtn = document.getElementById("next-btn");
  const resultContainer = document.getElementById("result-container");
  const retryQuizBtn = document.getElementById("retry-quiz");

  // -----------------------------------------------------------------------------------
  // Preguntas del quiz (55 en total, 5 bloques de 11)
  // -----------------------------------------------------------------------------------
  const allQuestions = [
    // --- ORGANIZACIÓN SOCIAL Y POLÍTICA (11) ---
    {
      question: "¿Qué eran las polis en la Antigua Grecia?",
      options: [
        "Regiones unificadas bajo un solo rey",
        "Ciudades-estado con autonomía propia",
        "Las fuerzas del orden(Policia)",
        "Áreas de culto exclusivo para sacerdotes"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cuál eran los dos alimentos principales que se producian?",
      options: [
        "cerezos y manzanas",
        "uvas y bananas",
        "uvas y aceitunas",
        "aceitunas y arandanos"
      ],
      correctAnswer: 2
    },
    {
      question: "¿Qué grupo social estaba excluido de la ciudadanía ateniense?",
      options: [
        "Hombres libres mayores de 18 años",
        "Mujeres, esclavos y metecos",
        "Todos los habitantes de la ciudad",
        "Los filósofos y poetas"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Que diosa era Demeter?",
      options: [
        "Diosa del vino",
        "Diosa del amor y la belleza",
        "Diosa de la agricultura y las cosechas",
        "Diosa de la guerra"
      ],
      correctAnswer: 2
    },
    {
      question: "¿Que intercambiaban por las uvas y aceitunas?",
      options: [
        "Cereales",
        "Oro",
        "Metales",
        "Esclavos"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Que legados dejo la antigua Grecia?",
      options: [
        
        "La monarquía, la esclavitud y la guerra",
        "La dictadura, la ignorancia y la pobreza",
        "La corrupción, la violencia y la desigualdad",
        "La democracia, la filosofía y el arte",
      ],
      correctAnswer: 3
    },
    {
      question: "¿De que mares esta rodeada Grecia?",
      options: [
        "Mediterraneo, Egeo y Jónico",
        "Atlántico, Pacifico y Artico",
        "Filosofico, Pitufo y Pepa Pig",
        "Natron, WIFI y Bluetooth"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Como se clasificaban las personas de mayor a menor importancia?",
      options: [
        "Ciudadanos, Metecos, Escalvos, Mujeres",
        "Policia, Bomberos, Doctores",
        "Lamparas, Dragones, Bromistas",
        "Politicos, Mujeres, Metecos"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Cual de las siguientes opciones son filosofos griegos?",
      options: [
        
        "Tanjiro, Luffy, Goku",
        "Pablo Coelho, Gabriel Garcia Marquez, Mario Benedetti",
        "Platon, Aristoteles, Socrates",
        "Platon, Pikachu, Natalia Isabel"
      ],
      correctAnswer: 2
    },
    {
      question: "¿Como se llama el mayor monumento historico de Grecia?",
      options: [
        "La Torre Eiffel",
        "El Partenon",
        "El Coliseo",
        "El Campeon del Siglo"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Que tipo de religion parcticaban en la antigua Grecia?",
      options: [
        "El Politeismo",
        "El Monoteismo",
        "El Ateismo",
        "El Budismo"
      ],
      correctAnswer: 0
    },
    // --- ECONOMÍA (11) ---
    {
      question: "¿Cuál era la base de la economía de la Antigua Grecia?",
      options: [
        "La agricultura y el comercio",
        "La explotación de minas de diamantes",
        "El turismo masivo",
        "La pesca en el Océano Atlántico"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué importancia tenía la moneda en las polis griegas?",
      options: [
        "No se usaba, siempre se hacía trueque",
        "Facilitaba las transacciones y establecía un valor común",
        "Era un objeto sagrado que no circulaba",
        "Se usaba solo para pagar a los soldados"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cuál era un producto agrícola destacado en Grecia?",
      options: [
        "La papa",
        "El olivo",
        "La caña de azúcar",
        "El cacao"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cómo influyó la geografía en la economía griega?",
      options: [
        "La costa y las islas favorecieron el comercio marítimo",
        "Solo había desiertos, por lo que se importaba todo",
        "Había oro en todas partes",
        "No había puertos naturales"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué hacían los artesanos para contribuir a la economía?",
      options: [
        "Elaboraban cerámica, tejidos y armas",
        "Solo trabajaban como agricultores",
        "Se dedicaban a la enseñanza de filosofía",
        "No existían artesanos en Grecia"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Por qué era importante la exportación de aceite de oliva?",
      options: [
        "No tenía relevancia en el comercio exterior",
        "Era un producto muy valorado en otras regiones",
        "Se usaba solo para encender lámparas en Atenas",
        "Era un recurso gratuito entregado por los dioses"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cómo se beneficiaban las polis del intercambio comercial?",
      options: [
        "Recibían productos que no podían producir y ganaban riquezas",
        "Perdían siempre al vender sus productos",
        "Evitaban la influencia cultural de otras regiones",
        "No realizaban comercio con nadie"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué tipo de mercado solía existir en el Ágora?",
      options: [
        "Uno de esclavos únicamente",
        "Un mercado abierto de alimentos, cerámica y textiles",
        "Un mercado clandestino",
        "No se permitía comerciar en el Ágora"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cómo contribuía la minería a la economía de Atenas?",
      options: [
        "Proporcionaba metales como la plata para acuñar monedas",
        "Solo se extraían piedras sin valor",
        "Estaba prohibida la minería",
        "No había minas en Grecia"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué eran los metecos en el ámbito económico?",
      options: [
        "Forasteros que vivían y comerciaban en la polis",
        "Esclavos de la polis",
        "Sacerdotes dedicados a Zeus",
        "Antiguos guerreros sin derechos"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Cuál era la ventaja de tener rutas marítimas seguras?",
      options: [
        "Facilitaba la piratería",
        "Aseguraba el transporte de mercancías y el flujo comercial",
        "Dificultaba las exportaciones",
        "Solo servía para la pesca local"
      ],
      correctAnswer: 1
    },
    // --- RECURSOS NATURALES (11) ---
    {
      question: "¿Qué mineral extraían los atenienses en Laurión?",
      options: [
        "Diamantes",
        "Plata",
        "Petróleo",
        "Mármol"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Por qué eran valiosos los bosques en Grecia?",
      options: [
        "No existían bosques en Grecia",
        "Proporcionaban madera para construcciones y barcos",
        "Solo se usaban para la caza de leones",
        "No tenían valor económico"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cómo influía el clima mediterráneo en la agricultura?",
      options: [
        "Facilitaba el cultivo de vid y olivo",
        "Provocaba heladas constantes",
        "Imposibilitaba la siembra de cereales",
        "Llovía todo el año sin parar"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué recurso marino era importante para la dieta griega?",
      options: [
        "Los peces y mariscos del Mediterráneo",
        "Las ballenas del Atlántico",
        "Los cocodrilos del Nilo",
        "Los corales de la costa africana"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Para qué se utilizaban los ríos y manantiales en la Antigua Grecia?",
      options: [
        "Para regar cultivos y abastecer a la población",
        "Para desperdiciar agua",
        "Para alimentar animales exóticos",
        "No existía agua dulce en Grecia"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué papel jugaba la tierra fértil en las llanuras griegas?",
      options: [
        "No había llanuras en Grecia",
        "Permitía sembrar cereales y otros alimentos",
        "Se dedicaba solo a la construcción de templos",
        "Era un territorio sagrado sin uso"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cómo aprovechaban los griegos las montañas?",
      options: [
        "Para cultivar arroz en las cimas",
        "Para extraer piedra y protegerse de invasiones",
        "No tenían montañas",
        "Se usaban solo para actos religiosos"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Por qué el mar era esencial para Grecia?",
      options: [
        "Facilitaba la comunicación, el comercio y la pesca",
        "No se usaba para nada",
        "Solo era una barrera natural",
        "Estaba prohibido navegar"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué recurso se obtenía de la ganadería en las zonas rurales?",
      options: [
        "Armas de hierro",
        "Leche, carne y lana",
        "Vino y aceite",
        "Esculturas de mármol"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cómo protegían los griegos sus bosques y manantiales?",
      options: [
        "Los incendiaban al final de cada verano",
        "Creían que estaban bajo protección divina y evitaban la sobreexplotación",
        "Solo los usaban para rituales de guerra",
        "No se permitía el acceso a nadie"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Qué hacían en caso de escasez de alimentos en su región?",
      options: [
        "Iniciaban guerras para robar cultivos",
        "Importaban granos de otras zonas mediante el comercio",
        "No tenían forma de conseguir comida extra",
        "Invocaban lluvias mágicas"
      ],
      correctAnswer: 1
    },
    // --- ACTIVIDADES ECONÓMICAS (11) ---
    {
      question: "¿Qué actividad era el pilar de la economía griega?",
      options: [
        "La cacería de animales salvajes",
        "La construcción de pirámides",
        "La agricultura",
        "La minería de uranio"
      ],
      correctAnswer: 2
    },
    {
      question: "¿Qué productos obtenían de la agricultura?",
      options: [
        "Bananas y piñas",
        "Cereales, aceitunas, uvas y hortalizas",
        "Solo trigo",
        "Nada, el suelo era estéril"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Qué hacían los pescadores en las costas griegas?",
      options: [
        "Navegaban al Polo Norte",
        "Buscaban perlas para los sacerdotes",
        "Solo pescaban para la familia real",
        "Capturaban peces y comerciaban con ellos"
      ],
      correctAnswer: 3
    },
    {
      question: "¿Qué tipo de objetos fabricaban los artesanos griegos?",
      options: [
        "Cerámica, herramientas y armas",
        "Instrumentos electrónicos",
        "Carros voladores",
        "No existían artesanos"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Por qué era importante el comercio entre las distintas polis?",
      options: [
        "Permitía el intercambio de productos y el crecimiento económico",
        "Estaba prohibido el comercio interior",
        "Solo se usaba para regalar esclavos",
        "No había rutas marítimas ni terrestres"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué función tenía la minería en la actividad económica griega?",
      options: [
        "No era relevante",
        "Solo se minaban joyas para los templos",
        "Producía metales para acuñar monedas y fabricar armas",
        "Estaba dedicada a buscar tesoros mitológicos"
      ],
      correctAnswer: 2
    },
    {
      question: "¿Cómo se transportaban los productos entre ciudades costeras?",
      options: [
        "En trenes subterráneos",
        "Principalmente en barcos de vela",
        "En caravanas de elefantes",
        "No se transportaban productos"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Qué actividades complementaban la agricultura en Grecia?",
      options: [
        "La cría de ganado y la elaboración de vino",
        "La enseñanza de filosofía",
        "La búsqueda de reliquias mágicas",
        "No existía ninguna otra actividad"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué rol tenían los mercados en la polis?",
      options: [
        "Servían para intercambiar bienes y socializar",
        "Estaban prohibidos para los ciudadanos",
        "Solo vendían esclavos",
        "Eran lugares secretos sin acceso"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Cómo beneficiaba la diversidad de actividades económicas a la polis?",
      options: [
        "Generaba caos y competencia desleal",
        "No tenía ninguna ventaja",
        "Disminuía el comercio",
        "Evitaba depender de un solo producto y fomentaba el intercambio"
      ],
      correctAnswer: 3
    },
    {
      question: "¿Qué otro producto se elaboraba además del aceite de oliva?",
      options: [
        "Azúcar refinada",
        "Chocolate",
        "Especias de la India",
        "Vino a partir de uvas"
      ],
      correctAnswer: 3
    },
    // --- CULTURA Y RELIGIÓN (11) ---
    {
      question: "¿Quién era considerado el dios principal del Olimpo?",
      options: [
        "Zeus",
        "Hades",
        "Poseidón",
        "Hermes"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué diosa era protectora de la sabiduría y de la ciudad de Atenas?",
      options: [
        "Atenea",
        "Afrodita",
        "Hera",
        "Artemisa"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué importancia tenía el Partenón?",
      options: [
        "Funcionaba como granero",
        "Almacenaba armas de guerra",
        "Era un templo dedicado a la diosa Atenea",
        "Era la casa de los esclavos"
      ],
      correctAnswer: 2
    },
    {
      question: "¿Qué enseñaban los mitos de dioses y héroes griegos?",
      options: [
        "Solo eran cuentos de terror",
        "Valores, virtudes y ejemplos de conducta",
        "No se transmitían a la gente",
        "Eran guías de estrategia militar"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Qué tipo de obras se presentaban en el teatro griego?",
      options: [
        "Tragedias y comedias",
        "Operetas en latín",
        "Batallas con animales",
        "No existía el teatro"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Por qué eran importantes las fiestas religiosas en Grecia?",
      options: [
        "Se usaban solo para castigar a los criminales",
        "Eran restringidas a los extranjeros",
        "No se celebraban en la polis",
        "Unían a la comunidad y honraban a los dioses"
      ],
      correctAnswer: 3
    },
    {
      question: "¿Qué papel tuvo la filosofía en la cultura griega?",
      options: [
        "Fue prohibida por los gobernantes",
        "Se limitaba a la clase militar",
        "Promover el pensamiento crítico y el razonamiento",
        "No tuvo relevancia"
      ],
      correctAnswer: 2
    },
    {
      question: "¿Qué instrumentos musicales eran comunes en Grecia?",
      options: [
        "La lira y la flauta",
        "El piano moderno",
        "El tambor africano",
        "La guitarra eléctrica"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Cómo se relacionaba la religión con la vida diaria griega?",
      options: [
        "No existía relación alguna",
        "Solo los sacerdotes conocían a los dioses",
        "Estaba prohibido rendir culto en público",
        "Los dioses y diosas estaban presentes en rituales y celebraciones cotidianas"
      ],
      correctAnswer: 3
    },
    {
      question: "¿Qué enseñaban grandes pensadores como Sócrates, Platón y Aristóteles?",
      options: [
        "La importancia de la búsqueda de la verdad y el conocimiento",
        "La obediencia ciega al rey",
        "Las técnicas de pesca en el Egeo",
        "Nada, no dejaron escritos"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué función tenía el Oráculo de Delfos?",
      options: [
        "Servir como almacén de granos",
        "Formar soldados espartanos",
        "Dar respuestas divinas y profecías",
        "Crear obras de teatro"
      ],
      correctAnswer: 2
    },
    // --- LEGADO (11) ---
    {
      question: "¿Qué idea política surgida en Atenas sigue siendo influyente hoy?",
      options: [
        "La tiranía",
        "La monarquía absoluta",
        "El totalitarismo",
        "La democracia"
      ],
      correctAnswer: 3
    },
    {
      question: "¿Cómo han influido los templos griegos en la arquitectura moderna?",
      options: [
        "Inspirando el uso de columnas y proporciones armoniosas",
        "Con rascacielos de cristal",
        "No tuvieron ninguna influencia",
        "Se limitaron a un estilo subterráneo"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué poemas épicos de Homero se consideran parte del legado literario griego?",
      options: [
        "La Ilíada y la Odisea",
        "El Poema de Gilgamesh y Beowulf",
        "El Quijote y la Eneida",
        "La República y Las Nubes"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué juegos se celebraban en Olimpia cada cuatro años?",
      options: [
        "La Copa del Mundo",
        "Los Juegos Olímpicos",
        "Las Panateneas",
        "Las carreras de carros en Roma"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Cómo aportaron los griegos a las ciencias?",
      options: [
        "Desarrollaron la geometría, la astronomía y bases de la medicina",
        "Inventaron el teléfono y la radio",
        "No hicieron aportes científicos",
        "Se enfocaron solo en la magia"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Qué influencia tuvo la filosofía griega en el pensamiento occidental?",
      options: [
        "No fue estudiada jamás",
        "Se aplicó solo en Esparta",
        "Fue rechazada en toda Europa",
        "Fundamentó la lógica, la ética y la política"
      ],
      correctAnswer: 3
    },
    {
      question: "¿Qué valoraban los griegos para construir una sociedad más justa?",
      options: [
        "La participación, el diálogo y la educación",
        "El silencio y el miedo",
        "El aislamiento total",
        "La obediencia sin cuestionar"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Cómo influyó el arte griego en civilizaciones posteriores?",
      options: [
        "Se adoptaron principios de equilibrio y belleza en la escultura",
        "No hubo influencia alguna",
        "Generó rechazo total",
        "Solo se copió la cerámica"
      ],
      correctAnswer: 0
    },
    {
      question: "¿Por qué los Juegos Olímpicos antiguos son parte del legado cultural?",
      options: [
        "Eran luchas a muerte",
        "Fomentaban la competencia pacífica y la unidad entre polis",
        "Se realizaban cada mes",
        "Los organizaban los persas"
      ],
      correctAnswer: 1
    },
    {
      question: "¿Qué enseñanza dejó la democracia ateniense para el mundo moderno?",
      options: [
        "Que solo un rey debe gobernar",
        "Que no se deben tener leyes",
        "La idea de que los ciudadanos pueden participar en las decisiones",
        "Que la libertad no es relevante"
      ],
      correctAnswer: 2
    },
    {
      question: "¿Por qué se considera que el legado griego sigue vivo hoy?",
      options: [
        "Ya no existe ninguna otra cultura",
        "Los griegos no dejaron huella",
        "Se mantuvo todo en secreto hasta el siglo XX",
        "Sus ideas en política, arte y ciencia aún influyen en nuestra sociedad"
      ],
      correctAnswer: 3
    }
  ];

  // -----------------------------------------------------------------------------------
  // Manejo de bloques (5 bloques de 11 preguntas)
  // -----------------------------------------------------------------------------------
  function getQuizBlockIndex() {
    let index = parseInt(localStorage.getItem("quizBlockIndex"));
    if (isNaN(index)) {
      index = 0;
    }
    return index;
  }

  function updateQuizBlockIndex() {
    let index = getQuizBlockIndex();
    // Avanzar al siguiente bloque de forma cíclica
    index = (index + 1) % 5;
    localStorage.setItem("quizBlockIndex", index);
  }

  // -----------------------------------------------------------------------------------
  // Selección de modo
  // -----------------------------------------------------------------------------------
  modeIndividualBtn.addEventListener("click", function() {
    gameMode = "individual";
    modeIndividualBtn.classList.add("selected-mode");
    modeDualBtn.classList.remove("selected-mode");
    playerNamesContainer.style.display = "none";
  });

  modeDualBtn.addEventListener("click", function() {
    gameMode = "dual";
    modeDualBtn.classList.add("selected-mode");
    modeIndividualBtn.classList.remove("selected-mode");
    playerNamesContainer.style.display = "block";
  });

  // -----------------------------------------------------------------------------------
  // Botón Iniciar Quiz
  // -----------------------------------------------------------------------------------
  startQuizBtn.addEventListener("click", function() {
    if (gameMode === "dual") {
      player1Name = player1Input.value.trim();
      player2Name = player2Input.value.trim();
      if (player1Name === "" || player2Name === "") {
        alert("Por favor, ingresa los nombres de ambos jugadores.");
        return;
      }
    }
    startQuiz();
  });

  // -----------------------------------------------------------------------------------
  // Iniciar el quiz
  // -----------------------------------------------------------------------------------
  function startQuiz() {
    // Reiniciar variables
    score = 0;
    score1 = 0;
    score2 = 0;
    currentQuestionIndex = 0;
    answersHistory = [];
    answersHistory1 = [];
    answersHistory2 = [];
    currentSelection = null;
    currentSelection1 = null;
    currentSelection2 = null;

    // Seleccionar el bloque de 11 preguntas según el índice actual
    const blockIndex = getQuizBlockIndex();
    currentQuizQuestions = allQuestions.slice(blockIndex * 11, blockIndex * 11 + 11);

    modeSelectionContainer.style.display = "none";
    resultContainer.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
  }

  // -----------------------------------------------------------------------------------
  // Mostrar la pregunta actual
  // -----------------------------------------------------------------------------------
  function showQuestion() {
    questionContainer.innerHTML = "";
    nextBtn.style.display = "block";
    currentSelection = null;
    currentSelection1 = null;
    currentSelection2 = null;

    const currentQuestion = currentQuizQuestions[currentQuestionIndex];
    if (!currentQuestion) {
      // Si no existe la pregunta, es que no hay más datos en este bloque
      alert("No hay más preguntas en este bloque. Verifica que tengas 11 preguntas por bloque.");
      return;
    }

    const questionEl = document.createElement("h3");
    questionEl.textContent = `Pregunta ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    questionContainer.appendChild(questionEl);

    if (gameMode === "individual") {
      // Modo individual
      currentQuestion.options.forEach((option, index) => {
        const optionEl = document.createElement("div");
        optionEl.classList.add("option");
        optionEl.textContent = option;
        optionEl.addEventListener("click", () => selectOptionIndividual(optionEl, index));
        questionContainer.appendChild(optionEl);
      });
    } else {
      // Modo dual
      const dualContainer = document.createElement("div");
      dualContainer.style.display = "flex";
      dualContainer.style.justifyContent = "space-around";
      dualContainer.style.gap = "20px";

      // Contenedor Jugador 1
      const player1Container = document.createElement("div");
      player1Container.style.width = "45%";
      const player1Title = document.createElement("h4");
      player1Title.textContent = player1Name;
      player1Container.appendChild(player1Title);

      currentQuestion.options.forEach((option, index) => {
        const optionEl = document.createElement("div");
        optionEl.classList.add("option");
        optionEl.textContent = option;
        optionEl.addEventListener("click", () => selectOptionDual(1, optionEl, index));
        player1Container.appendChild(optionEl);
      });

      // Contenedor Jugador 2
      const player2Container = document.createElement("div");
      player2Container.style.width = "45%";
      const player2Title = document.createElement("h4");
      player2Title.textContent = player2Name;
      player2Container.appendChild(player2Title);

      currentQuestion.options.forEach((option, index) => {
        const optionEl = document.createElement("div");
        optionEl.classList.add("option");
        optionEl.textContent = option;
        optionEl.addEventListener("click", () => selectOptionDual(2, optionEl, index));
        player2Container.appendChild(optionEl);
      });

      dualContainer.appendChild(player1Container);
      dualContainer.appendChild(player2Container);
      questionContainer.appendChild(dualContainer);
    }
  }

  // -----------------------------------------------------------------------------------
  // Selección en modo individual
  // -----------------------------------------------------------------------------------
  function selectOptionIndividual(selectedEl, selectedIndex) {
    const options = questionContainer.querySelectorAll(".option");
    options.forEach(opt => opt.classList.remove("selected"));
    selectedEl.classList.add("selected");
    currentSelection = selectedIndex;
  }

  // -----------------------------------------------------------------------------------
  // Selección en modo dual
  // -----------------------------------------------------------------------------------
  function selectOptionDual(player, selectedEl, selectedIndex) {
    const container = selectedEl.parentElement;
    // Quitar las clases de selección previas
    container.querySelectorAll(".option").forEach(opt => {
      opt.classList.remove("selected-player1", "selected-player2");
    });
  
    // Asignar la clase según el jugador
    if (player === 1) {
      selectedEl.classList.add("selected-player1");
      currentSelection1 = selectedIndex;
    } else {
      selectedEl.classList.add("selected-player2");
      currentSelection2 = selectedIndex;
    }
  }
  

  // -----------------------------------------------------------------------------------
  // Botón Siguiente
  // -----------------------------------------------------------------------------------
  nextBtn.addEventListener("click", function() {
    const currentQuestion = currentQuizQuestions[currentQuestionIndex];
    if (!currentQuestion) return;

    if (gameMode === "individual") {
      if (currentSelection === null) {
        alert("Por favor, selecciona una respuesta");
        return;
      }
      const isCorrect = (currentSelection === currentQuestion.correctAnswer);
      answersHistory.push({
        question: currentQuestion.question,
        selected: currentSelection,
        selectedText: currentQuestion.options[currentSelection],
        correct: currentQuestion.correctAnswer,
        correctText: currentQuestion.options[currentQuestion.correctAnswer],
        isCorrect: isCorrect
      });
      if (isCorrect) score++;
    } else {
      // Modo dual
      if (currentSelection1 === null || currentSelection2 === null) {
        alert("Por favor, ambos jugadores deben seleccionar una respuesta");
        return;
      }
      const isCorrect1 = (currentSelection1 === currentQuestion.correctAnswer);
      const isCorrect2 = (currentSelection2 === currentQuestion.correctAnswer);

      answersHistory1.push({
        question: currentQuestion.question,
        selected: currentSelection1,
        selectedText: currentQuestion.options[currentSelection1],
        correct: currentQuestion.correctAnswer,
        correctText: currentQuestion.options[currentQuestion.correctAnswer],
        isCorrect: isCorrect1
      });
      answersHistory2.push({
        question: currentQuestion.question,
        selected: currentSelection2,
        selectedText: currentQuestion.options[currentSelection2],
        correct: currentQuestion.correctAnswer,
        correctText: currentQuestion.options[currentQuestion.correctAnswer],
        isCorrect: isCorrect2
      });
      if (isCorrect1) score1++;
      if (isCorrect2) score2++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuizQuestions.length) {
      showQuestion();
    } else {
      showResult();
      // Cambiamos el bloque de preguntas para la próxima vez
      updateQuizBlockIndex();
    }
  });

  // -----------------------------------------------------------------------------------
  // Mostrar resultados finales
  // -----------------------------------------------------------------------------------
  function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultContainer.innerHTML = "";

    const resultTitle = document.createElement("h2");
    resultTitle.textContent = "Resultado";
    resultContainer.appendChild(resultTitle);

    if (gameMode === "individual") {
      // Puntaje y listado de respuestas
      const scoreText = document.createElement("p");
      scoreText.textContent = `Obtuviste ${score} de ${currentQuizQuestions.length} puntos.`;
      resultContainer.appendChild(scoreText);

      const historyList = document.createElement("div");
      historyList.id = "history-list";
      historyList.style.marginTop = "20px";
      answersHistory.forEach((item, index) => {
        const itemEl = document.createElement("div");
        itemEl.style.borderBottom = "1px solid #ddd";
        itemEl.style.padding = "10px 0";
        const icon = item.isCorrect ? "✔" : "✖";
        itemEl.innerHTML = `
          <strong>Pregunta ${index + 1}:</strong> ${item.question}<br>
          <em>Tu respuesta:</em> ${item.selectedText}<br>
          <em>Respuesta correcta:</em> ${item.correctText}
          <span style="color:${item.isCorrect ? 'green' : 'red'}; font-size:1.2em; margin-left:10px;">
            ${icon}
          </span>
        `;
        historyList.appendChild(itemEl);
      });
      resultContainer.appendChild(historyList);
    } else {
      // Modo dual: puntajes y historiales en dos columnas
      const scoreDiv = document.createElement("div");
      scoreDiv.id = "score-container";
      scoreDiv.style.display = "flex";
      scoreDiv.style.justifyContent = "space-around";
      scoreDiv.style.marginTop = "20px";

      const player1ScoreDiv = document.createElement("div");
      player1ScoreDiv.classList.add("score-box");
      const player2ScoreDiv = document.createElement("div");
      player2ScoreDiv.classList.add("score-box");

      const player1Title = document.createElement("h3");
      player1Title.textContent = player1Name;
      const player2Title = document.createElement("h3");
      player2Title.textContent = player2Name;

      const player1ScoreText = document.createElement("p");
      player1ScoreText.textContent = `Obtuviste ${score1} de ${currentQuizQuestions.length} puntos.`;
      const player2ScoreText = document.createElement("p");
      player2ScoreText.textContent = `Obtuviste ${score2} de ${currentQuizQuestions.length} puntos.`;

      player1ScoreDiv.appendChild(player1Title);
      player1ScoreDiv.appendChild(player1ScoreText);
      player2ScoreDiv.appendChild(player2Title);
      player2ScoreDiv.appendChild(player2ScoreText);

      scoreDiv.appendChild(player1ScoreDiv);
      scoreDiv.appendChild(player2ScoreDiv);
      resultContainer.appendChild(scoreDiv);

      // Historial en columnas
      const historyContainer = document.createElement("div");
      historyContainer.style.display = "flex";
      historyContainer.style.justifyContent = "space-around";
      historyContainer.style.marginTop = "20px";

      const historyList1 = document.createElement("div");
      historyList1.style.width = "45%";
      const historyList2 = document.createElement("div");
      historyList2.style.width = "45%";

      const titleHistory1 = document.createElement("h4");
      titleHistory1.textContent = player1Name;
      const titleHistory2 = document.createElement("h4");
      titleHistory2.textContent = player2Name;

      historyList1.appendChild(titleHistory1);
      historyList2.appendChild(titleHistory2);

      answersHistory1.forEach((item, index) => {
        const itemEl = document.createElement("div");
        itemEl.style.borderBottom = "1px solid #ddd";
        itemEl.style.padding = "10px 0";
        const icon = item.isCorrect ? "✔" : "✖";
        itemEl.innerHTML = `
          <strong>Pregunta ${index + 1}:</strong> ${item.question}<br>
          <em>Tu respuesta:</em> ${item.selectedText}<br>
          <em>Respuesta correcta:</em> ${item.correctText}
          <span style="color:${item.isCorrect ? 'green' : 'red'}; font-size:1.2em; margin-left:10px;">
            ${icon}
          </span>
        `;
        historyList1.appendChild(itemEl);
      });

      answersHistory2.forEach((item, index) => {
        const itemEl = document.createElement("div");
        itemEl.style.borderBottom = "1px solid #ddd";
        itemEl.style.padding = "10px 0";
        const icon = item.isCorrect ? "✔" : "✖";
        itemEl.innerHTML = `
          <strong>Pregunta ${index + 1}:</strong> ${item.question}<br>
          <em>Tu respuesta:</em> ${item.selectedText}<br>
          <em>Respuesta correcta:</em> ${item.correctText}
          <span style="color:${item.isCorrect ? 'green' : 'red'}; font-size:1.2em; margin-left:10px;">
            ${icon}
          </span>
        `;
        historyList2.appendChild(itemEl);
      });

      historyContainer.appendChild(historyList1);
      historyContainer.appendChild(historyList2);
      resultContainer.appendChild(historyContainer);
    }

    // Botón para reintentar el MISMO bloque (opcional)
    const retryBtn = document.createElement("button");
    retryBtn.textContent = "Reintentar Quiz";
    retryBtn.addEventListener("click", function() {
      modeSelectionContainer.style.display = "block";
      quizContainer.style.display = "none";
      resultContainer.style.display = "none";
      player1Input.value = "";
      player2Input.value = "";
      modeIndividualBtn.classList.remove("selected-mode");
      modeDualBtn.classList.remove("selected-mode");
      // NOTA: Esto NO llama a updateQuizBlockIndex(), así que repite el mismo bloque.
    });
    resultContainer.appendChild(retryBtn);

    // Botón para ir al SIGUIENTE juego (nuevo bloque)
    const nextGameBtn = document.createElement("button");
    nextGameBtn.textContent = "Siguiente juego";
    nextGameBtn.style.marginLeft = "10px";
    nextGameBtn.addEventListener("click", function() {
      // Como ya llamamos a updateQuizBlockIndex() al final del quiz,
      // en este punto el bloque de preguntas ya cambió.
      modeSelectionContainer.style.display = "block";
      quizContainer.style.display = "none";
      resultContainer.style.display = "none";
      player1Input.value = "";
      player2Input.value = "";
      modeIndividualBtn.classList.remove("selected-mode");
      modeDualBtn.classList.remove("selected-mode");
    });
    resultContainer.appendChild(nextGameBtn);
  }

  // -----------------------------------------------------------------------------------
  // Reiniciar la UI (este botón existe en quiz.html)
  // -----------------------------------------------------------------------------------
  retryQuizBtn.addEventListener("click", function() {
    modeSelectionContainer.style.display = "block";
    quizContainer.style.display = "none";
    resultContainer.style.display = "none";
    player1Input.value = "";
    player2Input.value = "";
    modeIndividualBtn.classList.remove("selected-mode");
    modeDualBtn.classList.remove("selected-mode");
  });
});
