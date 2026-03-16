import { Remedy } from './types';

export const SAMPLE_REMEDIES: Omit<Remedy, 'id' | 'createdAt'>[] = [
  {
    remedyName: "Turmeric Milk (Haldi Doodh)",
    symptoms: ["cold", "cough", "immunity", "sore throat"],
    ingredients: ["1 cup milk", "1/2 tsp turmeric powder", "Pinch of black pepper", "Honey (optional)"],
    preparationSteps: "Heat the milk in a pan. Add turmeric and black pepper. Stir well and bring to a boil. Pour into a cup, add honey if desired, and drink warm.",
    benefits: "Turmeric contains curcumin which has anti-inflammatory and antioxidant properties. Black pepper enhances curcumin absorption. It boosts immunity and relieves respiratory issues.",
    precautions: "Avoid if lactose intolerant. Use plant-based milk as an alternative.",
    category: "Cold & Cough",
    difficulty: "Easy",
    timeToTake: "Before bedtime"
  },
  {
    remedyName: "Ginger Honey Tea",
    symptoms: ["sore throat", "nausea", "indigestion", "cold", "headache"],
    ingredients: ["1 inch fresh ginger", "1 cup water", "1 tsp honey", "Few drops of lemon juice"],
    preparationSteps: "Grate ginger and boil it in water for 5 minutes. Strain into a cup. Add honey and lemon juice once it cools slightly.",
    benefits: "Ginger is a natural decongestant and anti-inflammatory agent. Honey soothes the throat and lemon provides Vitamin C.",
    precautions: "Do not give honey to infants under 1 year old.",
    category: "Cold & Cough",
    difficulty: "Easy",
    timeToTake: "2-3 times a day"
  },
  {
    remedyName: "Ajwain Water (Carom Seeds)",
    symptoms: ["acidity", "gas", "bloating", "stomach pain"],
    ingredients: ["1 tsp Ajwain seeds", "1 cup water"],
    preparationSteps: "Boil ajwain seeds in water until the water turns slightly brown. Strain and drink warm.",
    benefits: "Ajwain contains thymol which helps in releasing gastric juices and improves digestion instantly.",
    precautions: "Avoid excessive consumption as it can cause heat in the body.",
    category: "Digestion Problems",
    difficulty: "Easy",
    timeToTake: "After meals"
  },
  {
    remedyName: "Cumin-Coriander-Fennel (CCF) Tea",
    symptoms: ["bloating", "detox", "indigestion", "metabolism"],
    ingredients: ["1/2 tsp Cumin seeds", "1/2 tsp Coriander seeds", "1/2 tsp Fennel seeds", "2 cups water"],
    preparationSteps: "Boil all seeds in water for 10 minutes. Strain and sip throughout the day.",
    benefits: "This classic Ayurvedic blend balances all three doshas and gently cleanses the digestive system.",
    precautions: "Safe for most people.",
    category: "Digestion Problems",
    difficulty: "Easy",
    timeToTake: "Throughout the day"
  },
  {
    remedyName: "Ashwagandha Moon Milk",
    symptoms: ["stress", "insomnia", "anxiety", "fatigue"],
    ingredients: ["1 cup milk", "1/2 tsp Ashwagandha powder", "Pinch of cinnamon", "1/2 tsp honey"],
    preparationSteps: "Warm the milk. Whisk in ashwagandha and cinnamon. Simmer for 2 minutes. Add honey and drink warm.",
    benefits: "Ashwagandha is an adaptogen that helps the body manage stress and promotes restful sleep.",
    precautions: "Consult a doctor if pregnant or on medication.",
    category: "Stress & Sleep",
    difficulty: "Medium",
    timeToTake: "30 minutes before sleep"
  },
  {
    remedyName: "Aloe Vera Gel with Turmeric",
    symptoms: ["acne", "sunburn", "skin irritation", "inflammation"],
    ingredients: ["2 tbsp fresh Aloe Vera gel", "Pinch of turmeric"],
    preparationSteps: "Mix fresh aloe vera gel with a pinch of turmeric until smooth. Apply to affected area.",
    benefits: "Aloe vera cools and heals the skin, while turmeric acts as an antibacterial agent.",
    precautions: "Patch test first to ensure no allergic reaction.",
    category: "Skin Problems",
    difficulty: "Easy",
    timeToTake: "Anytime"
  },
  {
    remedyName: "Triphala Powder with Warm Water",
    symptoms: ["constipation", "detox", "eye health", "digestion"],
    ingredients: ["1 tsp Triphala powder", "1 cup warm water"],
    preparationSteps: "Mix Triphala powder in warm water and drink before bed.",
    benefits: "Triphala is a combination of three fruits (Amalaki, Bibhitaki, Haritaki) that acts as a gentle laxative and detoxifier.",
    precautions: "May cause loose stools if taken in excess.",
    category: "Digestion Problems",
    difficulty: "Easy",
    timeToTake: "Before bedtime"
  },
  {
    remedyName: "Tulsi (Holy Basil) Water",
    symptoms: ["immunity", "stress", "fever", "respiratory issues"],
    ingredients: ["5-7 Tulsi leaves", "1 cup water"],
    preparationSteps: "Boil Tulsi leaves in water for 5 minutes. Strain and drink.",
    benefits: "Tulsi is known as the 'Queen of Herbs' and is a powerful adaptogen and immunity booster.",
    precautions: "Safe for daily use.",
    category: "Immunity Boosters",
    difficulty: "Easy",
    timeToTake: "Morning on empty stomach"
  },
  {
    remedyName: "Fennel Seeds (Saunf) after meal",
    symptoms: ["bad breath", "digestion", "gas"],
    ingredients: ["1 tsp Fennel seeds"],
    preparationSteps: "Simply chew the seeds thoroughly after a meal.",
    benefits: "Fennel seeds freshen the breath and stimulate digestive enzymes.",
    precautions: "None.",
    category: "Digestion Problems",
    difficulty: "Easy",
    timeToTake: "After every meal"
  },
  {
    remedyName: "Brahmi Tea",
    symptoms: ["memory", "concentration", "anxiety", "brain health", "headache"],
    ingredients: ["1/2 tsp Brahmi powder or fresh leaves", "1 cup water", "Honey to taste"],
    preparationSteps: "Boil brahmi in water for 5 minutes. Strain and add honey.",
    benefits: "Brahmi is a renowned brain tonic that improves cognitive function and reduces mental stress.",
    precautions: "Avoid if you have a very low heart rate.",
    category: "Stress & Sleep",
    difficulty: "Easy",
    timeToTake: "Morning"
  },
  {
    remedyName: "Peppermint & Eucalyptus Steam",
    symptoms: ["headache", "sinusitis", "congestion", "cold"],
    ingredients: ["2 drops Peppermint oil", "2 drops Eucalyptus oil", "Bowl of hot water"],
    preparationSteps: "Add oils to hot water. Cover your head with a towel and inhale the steam for 5-10 minutes.",
    benefits: "Peppermint oil contains menthol which helps relax muscles and ease pain. Eucalyptus clears the sinuses.",
    precautions: "Keep eyes closed during steam inhalation.",
    category: "Cold & Cough",
    difficulty: "Easy",
    timeToTake: "When needed"
  }
];
