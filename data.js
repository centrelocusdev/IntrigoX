const chaptersData = {
  chapter: "Chapter 1",
  name: "Meadowville Story",
  paragraphs: [],
};
const ParagraphsData = [
  {
    type: "para",
    para_english:
      "Once upon a time, in the small town of Meadowville, there lived a curious little girl named Emma. Emma loved to explore the world around her, and every day after school, she would embark on a new adventure.",
    para_arabic:
      "ذات مرة، في بلدة ميدوفيل الصغيرة، عاشت فتاة صغيرة فضولية اسمها إيما. (إيما) أحبت أن تستكشف العالم حولها وكل يوم بعد المدرسة ستشرع بمغامرة جديدة.",
    para_chinese:
      "从前,在小城镇梅多维尔,有一个名叫艾玛的好奇小女孩活了下来. 艾玛喜欢探索她周围的世界,每天放学后,她都会开始新的冒险.",
    para_japanese:
      "かつては、メドウビルの小さな町で、エマという好奇心のある小さな少女が住んでいました。 エマは、彼女の周りの世界を探検し、毎日学校の後、彼女は新しい冒険に着きます.",
    para_portuguese:
      "Uma vez, na pequena cidade de Meadowville, lá viveu uma menina curiosa chamada Emma. Emma adorava explorar o mundo ao seu redor, e todos os dias depois da escola, ela embarcaria em uma nova aventura.",
    para_spanish:
      "Una vez, en el pequeño pueblo de Meadowville, vivía una niña curiosa llamada Emma. A Emma le encantaba explorar el mundo alrededor de ella, y cada día después de la escuela, ella se embarcaría en una nueva aventura.",
  },
  {
    type: "para",
    para_english:
      "One sunny afternoon, Emma decided to visit the magical Forest of Whispers. Legend had it that the forest was home to talking animals and hidden treasures. Emma, armed with her backpack and a sense of excitement, set off on the winding path that led to the heart of the forest.",
    para_arabic:
      "بعد ظهيرة مشمسة قررت (إيما) زيارة الغابة السحرية لـ(ويزر) كان الأسطورة أن الغابة كانت موطناً للحديث عن الحيوانات و الكنوز الخفية (إيما)، مُسلحة بحزمة ظهرها وشعور بالإثارة، إنطلقت على الطريق الريحي الذي أدى إلى قلب الغابة.",
    para_chinese:
      "一个阳光明媚的下午,艾玛决定去拜访神奇的 微声森林. 传说森林里有说话的动物和隐藏的珍宝 艾玛带着她的背包和兴奋感,从通向森林心脏的风向上起跑.",
    para_japanese:
      "晴れた日は、エマがウィスパーの魔法の森を訪問することにしました。 森が動物と秘宝を語るのに家だったという伝説はありました。 エマは、彼女のバックパックと興奮の感覚で武装し、森の心臓に導いた巻上げパスにオフに設定します.",
    para_portuguese:
      "Uma tarde ensolarada, Emma decidiu visitar a floresta mágica de Whispers. A lenda tinha que a floresta era o lar de falar animais e tesouros escondidos. Emma, armada com sua mochila e um senso de excitação, partiu no caminho sinuoso que levou ao coração da floresta.",
    para_spanish:
      "Una tarde soleada, Emma decidió visitar el Bosque mágico de los Whispers. La leyenda tenía que el bosque era el hogar para hablar animales y tesoros ocultos. Emma, armada con su mochila y un sentido de emoción, se desplomó en el camino de viento que llevó al corazón del bosque.",
  },
  {
    type: "assesment",
    level: "English level A1",
    pronounciationLessonAudio:
      "https://intrigoxchapterassesmentaudios.s3.ap-south-1.amazonaws.com/Play.ht+-+_Hello+and+welcome+to+our+English....wav",
    questions: [
      {
        text: {
          spanish: "El sol se levanta en el este.",
          japaneese: "太陽が東に上がります.",
          chineese: "日出东方.",
          portuguese: "O sol nasce no leste.",
          arabic: "الشمس تشرق في الشرق.",
          english: "The sun rises in the east.",
        },
        audio: {
          spanish:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+spanish.wav",
          japaneese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+japaneese.wav",
          chineese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+chineese.wav",
          portuguese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+potuguese.wav",
          arabic:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+arabic.wav",
          english:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+english.wav",
        },
      },
      {
        text: {
          spanish: "Los gatos son conocidos por su agilidad.",
          japaneese: "猫は自分の敏捷性のために知られています.",
          chineese: "猫以敏捷而出名.",
          portuguese: "Os gatos são conhecidos por sua agilidade.",
          arabic: "القطط معروفة بعقولهم.",
          english: "Cats are known for their agility.",
        },
        audio: {
          spanish:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+spanish.wav",
          japaneese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+japaneese.wav",
          chineese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+chinese.wav",
          portuguese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+portuguese.wav",
          arabic:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+arabic.wav",
          english:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+english.wav",
        },
      },
    ],
    flashcards: [],
  },
  {
    type: "para",
    para_english:
      "As she entered the enchanted woods, the trees seemed to whisper secrets to her, and the leaves crunched beneath her feet like a sweet melody. Suddenly, Emma spotted a colorful bird perched on a branch. To her surprise, the bird spoke!",
    para_arabic:
      "عندما دخلت الغابة السحرية، بدا أن الأشجار تهمس الأسرار لها، والأوراق مكتظة تحت أقدامها مثل ميلودي الحلو. وفجأة، (إيما) رصدت طائراً ملوناً على غصن لمفاجأتها، الطائر تحدث!",
    para_chinese:
      "当她走入被魔法所覆盖的树林时,树似乎向她低语了秘密,而树叶在她脚下像甜美的旋律一样被收起. 突然间,艾玛发现一只多彩的鸟被树枝所笼罩. 她很惊讶,鸟说话了!",
    para_japanese:
      "魅惑的な木に入ったように、木は彼女に秘密を細断するように見え、葉は甘いメロディーのような足の下に覆われた。 突然、エマは枝にカラフルな鳥を打ち立てました。 驚きに、鳥がスポーク!",
    para_portuguese:
      "Ao entrar na floresta encantada, as árvores pareciam sussurrar segredos para ela, e as folhas esmagadas abaixo de seus pés como uma doce melodia. De repente, Emma viu um pássaro colorido perched em um ramo. Para sua surpresa, o pássaro falou!",
    para_spanish:
      "Al entrar en los bosques encantados, los árboles parecían susurrarle secretos, y las hojas crujían bajo sus pies como una dulce melodía. De repente, Emma vio un pájaro colorido encaramado en una rama. ¡Por su sorpresa, el pájaro habló!",
  },
  {
    type: "assesment",
    level: "English level A2",
    pronounciationLessonAudio:
      "https://intrigoxchapterassesmentaudios.s3.ap-south-1.amazonaws.com/Play.ht+-+_Hello+and+welcome+to+our+English....wav",
    questions: [
      {
        text: {
          spanish: "El sol se levanta en el este.",
          japaneese: "太陽が東に上がります.",
          chineese: "日出东方.",
          portuguese: "O sol nasce no leste.",
          arabic: "الشمس تشرق في الشرق.",
          english: "The sun rises in the east.",
        },
        audio: {
          spanish:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+spanish.wav",
          japaneese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+japaneese.wav",
          chineese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+chineese.wav",
          portuguese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+potuguese.wav",
          arabic:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+arabic.wav",
          english:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+english.wav",
        },
      },
      {
        text: {
          spanish: "Los gatos son conocidos por su agilidad.",
          japaneese: "猫は自分の敏捷性のために知られています.",
          chineese: "猫以敏捷而出名.",
          portuguese: "Os gatos são conhecidos por sua agilidade.",
          arabic: "القطط معروفة بعقولهم.",
          english: "Cats are known for their agility.",
        },
        audio: {
          spanish:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+spanish.wav",
          japaneese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+japaneese.wav",
          chineese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+chinese.wav",
          portuguese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+portuguese.wav",
          arabic:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+arabic.wav",
          english:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+english.wav",
        },
      },
    ],
    flashcards: [],
  },
  {
    type: "para",
    para_english:
      "'Hello, young adventurer! I am Rainbow, the talking parrot. What brings you to our magical forest?' chirped Rainbow.",
    para_arabic:
      "مرحباً أيها المغامر الصغير أنا قوس قزح، والببغاء الحديث. ما الذي أتى بك إلى غابتنا السحرية؟.",
    para_chinese: "你好,年轻的冒险家! 我是彩虹,说话的鹦鹉。 什么风把你吹来了.",
    para_japanese:
      "こんにちは、若い冒険者! 私は虹です, 話すオウム. 私たちの魔法の森にあなたをもたらすものは何ですか.",
    para_portuguese:
      "Olá, jovem aventureiro! Sou o Rainbow, o papagaio que fala. O que o traz para a nossa floresta mágica?' Chirped Rainbow.",
    para_spanish:
      "¡Hola, joven aventurero! Soy Rainbow, el loro que habla. ¿Qué te trae a nuestro bosque mágico?' chirpeado arco iris.",
  },
  {
    type: "obstacle",
    obstacle_questions: [
      {
        que: "What is the color of the sky?",
        ans: "blue",
      },
      {
        que: "How many vowels are there in english language?",
        ans: "5",
      },
      {
        que: "Who is the Prime Minsiter of India?",
        ans: "Narendra Modi",
      },
    ],
    life_points: 30,
  },
  {
    type: "para",
    para_english:
      "Rainbow hopped onto Emma's shoulder, eager to be her guide. Together, they encountered a wise old owl named Oliver, a playful squirrel named Nutmeg, and a friendly rabbit named Cotton. Each creature shared stories and wisdom with Emma, teaching her about the importance of kindness, curiosity, and friendship.",
    para_arabic:
      "قفزت قوس قزح على كتف (إيما) متلهفة لتكون مرشدها معاً، واجهوا بومة حكيمة قديمة اسمها (أوليفر)، سنجاب مخادع اسمه (نتمج)، وأرنب ودود اسمه (كوتن). كل مخلوق يتشارك القصص والحكمة مع (إيما) يعلمها عن أهمية العطف والفضول والصداقة.",
    para_chinese:
      "彩虹扑向了艾玛的肩膀,渴望做她的向导. 他们一起遇到了一只叫奥利弗的聪明的老猫头鹰,一只叫努特梅格的玩弄活的松鼠和一只叫克通的友好的兔子. 每个生物都与艾玛分享故事和智慧,教她慈悲,好奇和友谊的重要性.",
    para_japanese:
      "エマの肩に虹が飛び、ガイドに熱心に。 一緒に、彼らは、オリバーという名前の賢い古いフクロウと遭遇しました, 遊び心のあるリスNutmegという名前, コットンという名前のフレンドリーなウサギ. 各生き物は、親切、好奇心、そして友情の重要性について教え、エマと物語と知恵を共有しました.",
    para_portuguese:
      "O arco-íris saltou para o ombro da Emma, ansioso por ser o seu guia. Juntos, encontraram uma velha coruja chamada Oliver, um esquilo brincalhão chamado Nutmeg, e um coelho amigável chamado Cotton. Cada criatura compartilhou histórias e sabedoria com Emma, ensinando-a sobre a importância da bondade, curiosidade e amizade.",
    para_spanish:
      "El arco iris saltó sobre el hombro de Emma, ansioso por ser su guía. Juntos, encontraron un viejo y sabio llamado Oliver, una ardilla juguetona llamada Nutmeg, y un conejo amistoso llamado Cotton. Cada criatura compartió historias y sabiduría con Emma, enseñándola sobre la importancia de la bondad, la curiosidad y la amistad.",
  },
  {
    type: "assesment",
    level: "English level B1",
    pronounciationLessonAudio:
      "https://intrigoxchapterassesmentaudios.s3.ap-south-1.amazonaws.com/Play.ht+-+_Hello+and+welcome+to+our+English....wav",
    questions: [
      {
        text: {
          spanish: "El sol se levanta en el este.",
          japaneese: "太陽が東に上がります.",
          chineese: "日出东方.",
          portuguese: "O sol nasce no leste.",
          arabic: "الشمس تشرق في الشرق.",
          english: "The sun rises in the east.",
        },
        audio: {
          spanish:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+spanish.wav",
          japaneese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+japaneese.wav",
          chineese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+chineese.wav",
          portuguese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+potuguese.wav",
          arabic:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+arabic.wav",
          english:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+english.wav",
        },
      },
      {
        text: {
          spanish: "Los gatos son conocidos por su agilidad.",
          japaneese: "猫は自分の敏捷性のために知られています.",
          chineese: "猫以敏捷而出名.",
          portuguese: "Os gatos são conhecidos por sua agilidade.",
          arabic: "القطط معروفة بعقولهم.",
          english: "Cats are known for their agility.",
        },
        audio: {
          spanish:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+spanish.wav",
          japaneese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+japaneese.wav",
          chineese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+chinese.wav",
          portuguese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+portuguese.wav",
          arabic:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+arabic.wav",
          english:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+english.wav",
        },
      },
    ],
    flashcards: [],
  },
  {
    type: "para",
    para_english:
      "Rainbow hopped onto Emma's shoulder, eager to be her guide. Together, they encountered a wise old owl named Oliver, a playful squirrel named Nutmeg, and a friendly rabbit named Cotton. Each creature shared stories and wisdom with Emma, teaching her about the importance of kindness, curiosity, and friendship.",
    para_arabic:
      "قفزت قوس قزح على كتف (إيما) متلهفة لتكون مرشدها معاً، واجهوا بومة حكيمة قديمة اسمها (أوليفر)، سنجاب مخادع اسمه (نتمج)، وأرنب ودود اسمه (كوتن). كل مخلوق يتشارك القصص والحكمة مع (إيما) يعلمها عن أهمية العطف والفضول والصداقة.",
    para_chinese:
      "彩虹扑向了艾玛的肩膀,渴望做她的向导. 他们一起遇到了一只叫奥利弗的聪明的老猫头鹰,一只叫努特梅格的玩弄活的松鼠和一只叫克通的友好的兔子. 每个生物都与艾玛分享故事和智慧,教她慈悲,好奇和友谊的重要性.",
    para_japanese:
      "エマの肩に虹が飛び、ガイドに熱心に。 一緒に、彼らは、オリバーという名前の賢い古いフクロウと遭遇しました, 遊び心のあるリスNutmegという名前, コットンという名前のフレンドリーなウサギ. 各生き物は、親切、好奇心、そして友情の重要性について教え、エマと物語と知恵を共有しました.",
    para_portuguese:
      "O arco-íris saltou para o ombro da Emma, ansioso por ser o seu guia. Juntos, encontraram uma velha coruja chamada Oliver, um esquilo brincalhão chamado Nutmeg, e um coelho amigável chamado Cotton. Cada criatura compartilhou histórias e sabedoria com Emma, ensinando-a sobre a importância da bondade, curiosidade e amizade.",
    para_spanish:
      "El arco iris saltó sobre el hombro de Emma, ansioso por ser su guía. Juntos, encontraron un viejo y sabio llamado Oliver, una ardilla juguetona llamada Nutmeg, y un conejo amistoso llamado Cotton. Cada criatura compartió historias y sabiduría con Emma, enseñándola sobre la importancia de la bondad, la curiosidad y la amistad.",
  },
  {
    type: "assesment",
    level: "English level B2",
    pronounciationLessonAudio:
      "https://intrigoxchapterassesmentaudios.s3.ap-south-1.amazonaws.com/Play.ht+-+_Hello+and+welcome+to+our+English....wav",
    questions: [
      {
        text: {
          spanish: "El sol se levanta en el este.",
          japaneese: "太陽が東に上がります.",
          chineese: "日出东方.",
          portuguese: "O sol nasce no leste.",
          arabic: "الشمس تشرق في الشرق.",
          english: "The sun rises in the east.",
        },
        audio: {
          spanish:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+spanish.wav",
          japaneese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+japaneese.wav",
          chineese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+chineese.wav",
          portuguese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+potuguese.wav",
          arabic:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+arabic.wav",
          english:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+english.wav",
        },
      },
      {
        text: {
          spanish: "Los gatos son conocidos por su agilidad.",
          japaneese: "猫は自分の敏捷性のために知られています.",
          chineese: "猫以敏捷而出名.",
          portuguese: "Os gatos são conhecidos por sua agilidade.",
          arabic: "القطط معروفة بعقولهم.",
          english: "Cats are known for their agility.",
        },
        audio: {
          spanish:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+spanish.wav",
          japaneese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+japaneese.wav",
          chineese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+chinese.wav",
          portuguese:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+portuguese.wav",
          arabic:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+arabic.wav",
          english:
            "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+english.wav",
        },
      },
    ],
    flashcards: [],
  },

  {
    type: "obstacle",
    obstacle_questions: [
      {
        que: "What is the color of the sky?",
        ans: "blue",
      },
      {
        que: "How many vowels are there in english language?",
        ans: "5",
      },
      {
        que: "Who is the Prime Minsiter of India?",
        ans: "Narendra Modi",
      },
    ],
    life_points: 20,
  },
];
const Question1Data = {
  text: {
    spanish: "El sol se levanta en el este.",
    japaneese: "太陽が東に上がります.",
    chineese: "日出东方.",
    portuguese: "O sol nasce no leste.",
    arabic: "الشمس تشرق في الشرق.",
    english: "The sun rises in the east.",
  },
  audio: {
    spanish:
      "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+spanish.wav",
    japaneese:
      "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+japaneese.wav",
    chineese:
      "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+chineese.wav",
    portuguese:
      "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+potuguese.wav",
    arabic:
      "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+arabic.wav",
    english:
      "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+english.wav",
  },
};
const Question2Data = {
  text: {
    spanish: "Los gatos son conocidos por su agilidad.",
    japaneese: "猫は自分の敏捷性のために知られています.",
    chineese: "猫以敏捷而出名.",
    portuguese: "Os gatos são conhecidos por sua agilidade.",
    arabic: "القطط معروفة بعقولهم.",
    english: "Cats are known for their agility.",
  },
  audio: {
    spanish:
      "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+spanish.wav",
    japaneese:
      "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+japaneese.wav",
    chineese:
      "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+chinese.wav",
    portuguese:
      "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+portuguese.wav",
    arabic:
      "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+arabic.wav",
    english:
      "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+english.wav",
  },
};
const ObstacleQuestionsData = [
  {
    que: "What is the color of the sky?",
    ans: "blue",
  },
  {
    que: "How many vowels are there in english language?",
    ans: "5",
  },
  {
    que: "Who is the Prime Minsiter of India?",
    ans: "Narendra Modi",
  },
];
const flashCardsData = [
  {
    type: "vocabulary-lesson",
    data: [
      {
        text: "School",
        image:
          "https://intrigo-flashcards-images.s3.ap-south-1.amazonaws.com/flash_image1.jpg",
      },
      {
        text: "Computer",
        image:
          "https://intrigo-flashcards-images.s3.ap-south-1.amazonaws.com/flash_image2.jpg",
      },
      {
        text: "Cycle",
        image:
          "https://intrigo-flashcards-images.s3.ap-south-1.amazonaws.com/flash_image3.jpg",
      },
      {
        text: "Umbrella",
        image:
          "https://intrigo-flashcards-images.s3.ap-south-1.amazonaws.com/flash_image4.jpg",
      },
      {
        text: "Fountain",
        image:
          "https://intrigo-flashcards-images.s3.ap-south-1.amazonaws.com/flash_image5.jpg",
      },
    ],
  },
  {
    type: "assessment",
    text_in_english: "He felt sick",
    image:
      "https://intrigo-flashcards-images.s3.ap-south-1.amazonaws.com/flash_image6.jpg",
    ans_audio:
      "https://intrigo-flashcards-audios.s3.ap-south-1.amazonaws.com/flash_audio1.wav",
  },
  {
    type: "assessment",
    text_in_english: "Cloud",
    audio:
      "https://intrigo-flashcards-audios.s3.ap-south-1.amazonaws.com/flash_audio2.wav",
    options_images: [
      "https://intrigo-flashcards-images.s3.ap-south-1.amazonaws.com/flash_image8.jpg",
      "https://intrigo-flashcards-images.s3.ap-south-1.amazonaws.com/flash_image7.jpg",
      "https://intrigo-flashcards-images.s3.ap-south-1.amazonaws.com/flash_image9.jpg",
      "https://intrigo-flashcards-images.s3.ap-south-1.amazonaws.com/flash_image10.jpg",
    ],
    ans_image:
      "https://intrigo-flashcards-images.s3.ap-south-1.amazonaws.com/flash_image7.jpg",
  },
  {
    type: "assessment",
    data: [
      {
        text_in_english: "Curtains",
        image:
          "https://intrigo-flashcards-images.s3.ap-south-1.amazonaws.com/flash_image11.jpg",
      },
      {
        text_in_english: "Almirah",
        image:
          "https://intrigo-flashcards-images.s3.ap-south-1.amazonaws.com/flash_image12.jpg",
      },
      {
        text_in_english: "Washing Machine",
        image:
          "https://intrigo-flashcards-images.s3.ap-south-1.amazonaws.com/flash_image13.jpg",
      },
      {
        text_in_english: "Fridge",
        image:
          "https://intrigo-flashcards-images.s3.ap-south-1.amazonaws.com/flash_image14.jpg",
      },
      {
        text_in_english: "House",
        image:
          "https://intrigo-flashcards-images.s3.ap-south-1.amazonaws.com/flash_image15.jpg",
      },
    ],
  },
  {
    type: "assessment",
    data: [
      {
        text_in_english: "He is my brother.",
        audio:
          "https://intrigo-flashcards-audios.s3.ap-south-1.amazonaws.com/flash_audio3.wav",
        text_in_arabic: "إنه أخي.",
        text_in_chinese: "琌и.",
        text_in_japanese: "兄です.",
        text_in_portuguese: "Ele é meu irmão.",
        text_in_spanish: "Es mi hermano.",
      },
    ],
  },
];

module.exports = {
  chaptersData,
  ParagraphsData,
  Question1Data,
  Question2Data,
  ObstacleQuestionsData,
  flashCardsData,
};
