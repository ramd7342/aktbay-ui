export const TAGS = [ 
    {tagRegex: /\@(.*?)\@/gm, category: "country", displayName: "Place"},
    {tagRegex: /\#(.*?)\#/gm, category: "food", displayName: "Food"},
    {tagRegex: /\$(.*?)\$/gm, category: "hotel", displayName: "Hotel"}
];

export const MAX_TEXT_LENGTH: number = 28;

export const PERMISSION_ITEMS = ["Public","Private","Shared"];

export const OUTPUT_TEMPLATE_ITEMS = ["Default","Timeline","Quiz","Survey","Ad"];

export const DPR_ITEMS = ["Yes (public)","No (public)"];

export const MONETIZATION_ITEMS = ["Paid - Ad","Paid - Subscription","Public - Free"];

// public sampleDescription = `Test place with #place#, Test food with @food@, Test hotel with $hotel$`;
export const SAMPLE_DESCRIPTION = `Day 1:  
Breakfast :  
  Start your day with a traditional South Indian Breakfast at @MTR@ (Mavalli Tiffin Room) in LalBagh. Try thier Signature dish, Rava Idli, and filter coffee.
Lunch:  
  Head to Nagarjuna Inn Residency Road for some spicy #Andhra-style biryani# and chicken fry.
Dinner: 
  Indulge in some North Indian cuisine at Punjabi Grill in MG Road. Don't miss their butter chicken and garlic naan.

Day 2 : 
Breakfast :  
  Head to Brahmin's Coffee Bar in Basavangudi for theire delicious idlis, vadas and filter coffee.
Lunch:  
  Enjoy some authentic Karnataka-style meals at Vidayarthi Bhavan in Gandhi Bazaar. Their masala dosa is a must-try.
Dinner: 
  Try some delicious street food at Shivaji Military Hotel in Jayanagar. Their Donne Biryani and Mutton Chops are highly recommended.

Day 3 : 
Breakfast :  
  Start your day with some delicious kebabs and parathas at Empire Restaurant in Church Street.
Lunch:  
  Head to Taaza Thindi in Jayanagar for some mouth-warering chaat and pani puri
Dinner: 
  Enjoy some coastal cuisine at Fisherman's Wharf in Sarjapur. Their seafood platter and prawn curry are highly recommended.

Day 4 : 
Breakfast :  
  Visit CTR (Central Tiffin Room) in Malleshwaram for some delicious khara bath and kesari bath.
Lunch:  
  Head to Nagarjuna Restaurant in Mallesaram for some authentic Kannada meals.
Dinner: 
  Enjoy some global cuisine at Farzi Cafe in UB City. Don't miss their Molecular Chaat and Dal Chawal Arancini.
`;

