const chaptersData = {
  "name": "Chapter 1",
  "paragraphs": []
}
const ParagraphsData = [
  {
    "type": "para",
    "para": "Once upon a time, in the small town of Meadowville, there lived a curious little girl named Emma. Emma loved to explore the world around her, and every day after school, she would embark on a new adventure."
  },
  {
    "type": "para",
    "para": "One sunny afternoon, Emma decided to visit the magical Forest of Whispers. Legend had it that the forest was home to talking animals and hidden treasures. Emma, armed with her backpack and a sense of excitement, set off on the winding path that led to the heart of the forest."
  },
  {
    "type": "assesment",
    "para": "As she entered the enchanted woods, the trees seemed to whisper secrets to her, and the leaves crunched beneath her feet like a sweet melody. Suddenly, Emma spotted a colorful bird perched on a branch. To her surprise, the bird spoke!",
    "pronounciationLessonAudio": "https://intrigoxchapterassesmentaudios.s3.ap-south-1.amazonaws.com/Play.ht+-+_Hello+and+welcome+to+our+English....wav",
    "questions": []
  },
  {
    "type": "para",
    "para": "'Hello, young adventurer! I am Rainbow, the talking parrot. What brings you to our magical forest?' chirped Rainbow."
  },
  {
    "type": "obstacle",
    "obstacle_questions": [],
    "life_points": 30
  },
  {
    "type": "para",
    "data": "Rainbow hopped onto Emma's shoulder, eager to be her guide. Together, they encountered a wise old owl named Oliver, a playful squirrel named Nutmeg, and a friendly rabbit named Cotton. Each creature shared stories and wisdom with Emma, teaching her about the importance of kindness, curiosity, and friendship."
  },
  {
    "type": "assesment",
    "para": "As the sun began to set, casting a warm glow on the forest, Emma realized it was time to head home. Rainbow, Oliver, Nutmeg, and Cotton bid her farewell, promising to welcome her back anytime.",
    "pronounciationLessonAudio": "https://intrigoxchapterassesmentaudios.s3.ap-south-1.amazonaws.com/Play.ht+-+_Hello+and+welcome+to+our+English....wav",
    "questions": []
  },
  
    {
      "type": "obstacle",
      "obstacle_questions": [],
      "life_points": 20
    },
  
]
const Question1Data = {
  "text": {
    "spanish": "El sol se levanta en el este.",
    "japaneese": "太陽が東に上がります.",
    "chineese": "日出东方.",
    "portuguese": "O sol nasce no leste.",
    "arabic": "الشمس تشرق في الشرق.",
    "english": "The sun rises in the east."
  },
  "audio":{
    "spanish": "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+spanish.wav",
    "japaneese": "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+japaneese.wav",
    "chineese": "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+chineese.wav",
    "portuguese": "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+potuguese.wav",
    "arabic": "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+arabic.wav",
    "english": "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que1+english.wav"
  }
}
const Question2Data= {
  "text": {
    "spanish": "Los gatos son conocidos por su agilidad.",
    "japaneese": "猫は自分の敏捷性のために知られています.",
    "chineese": "猫以敏捷而出名.",
    "portuguese": "Os gatos são conhecidos por sua agilidade.",
    "arabic": "القطط معروفة بعقولهم.",
    "english": "Cats are known for their agility."
  },
  "audio":{
    "spanish": "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+spanish.wav",
    "japaneese": "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+japaneese.wav",
    "chineese": "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+chinese.wav",
    "portuguese": "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+portuguese.wav",
    "arabic": "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+arabic.wav",
    "english": "https://intrigoxquestionsaudios.s3.ap-south-1.amazonaws.com/que2+english.wav"
  }
}
const ObstacleQuestionsData = [
  {
    "que": "What is the color of the sky?",
    "ans": "blue"
  },
  {
    "que": "How many vowels are there in english language?",
    "ans": "5"
  },
  {
    "que": "Who is the Prime Minsiter of India?",
    "ans": "Narendra Modi"
  }
]
module.exports = {chaptersData , ParagraphsData, Question1Data, Question2Data ,ObstacleQuestionsData};
