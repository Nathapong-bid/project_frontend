export interface Word {
    word: string;
    meaning: string;
    level: string; // เปลี่ยนจาก word_level เป็น level
    example: string;
}

// 🎯 ข้อมูล Mock Data ใหม่ (Fallback Data)
const FALLBACK_WORDS: Word[] = [
    {
        word: "Advertisement",
        meaning: "a notice or announcement in a public medium promoting a product, service, or event or publicizing a job vacancy.",
        level: "Intermediate", // ใช้ level แทน word_level
        example: "Example : He learned about the job from an advertisement in the newspaper.",
    },
    {
        word: "Candidate",
        meaning: "a person who applies for a job or other position or is nominated for election.",
        level: "Advanced",
        example: "Example : The Democratic candidate is leading in the polls.",
    },
    {
        word: "Elevator",
        meaning: "a platform or compartment housed in a shaft for raising and lowering people or things to different floors or levels.",
        level: "Beginner",
        example: "Example : We took the elevator to the 10th floor.",
    },
    {
        word: "Generation",
        meaning: "all of the people born and living at about the same time, regarded collectively.",
        level: "Advanced",
        example: "Example : This new phone is the latest generation of smartphones.",
    },
    {
        word: "Rain",
        meaning: "moisture condensed from the atmosphere that falls visibly in separate drops.",
        level: "Beginner",
        example: "Example : We're expecting a lot of rain this weekend.",
    },
    {
        word: "Vacation",
        meaning: "an extended period of leisure and recreation, especially one spent away from home or in traveling.",
        level: "Intermediate",
        example: "Example : We are planning a vacation to Italy next summer.",
    },
];


export async function getRandomWord(): Promise<Word> {
    // ... (โค้ด try block เดิม) ...
    
    try {
        // ... (โค้ด fetch API เดิม) ...
        const response = await fetch("https://unflagrant-lois-dosimetric.ngrok-free.dev/api/webhook/worddee", { method: "GET", headers: { "Content-Type": "application/json" } });

        if (!response.ok) {
            // โค้ดจะตกมาที่นี่เมื่อ n8n คืนค่า 404/400
            throw new Error(`Failed to fetch word. Status: ${response.status}`);
        }
        
        const wordData = await response.json() as Word;
        
        if (!wordData || !wordData.word) {
            throw new Error("Received invalid word data from API.");
        }
        
        return wordData;

    } catch (error) {
        console.error("Error in getRandomWord, using fallback data:", error);
        
        // 🎯 สุ่มเลือก 1 คำศัพท์จาก Array ใหม่
        const randomIndex = Math.floor(Math.random() * FALLBACK_WORDS.length);
        return FALLBACK_WORDS[randomIndex];
    }
}