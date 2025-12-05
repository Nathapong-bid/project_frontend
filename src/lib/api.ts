const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface Word {
  word: string;
  meaning?: string;
  level?: string;
  example?: string;
  word_level?: string; // backend may send word_level
}

export interface ValidateResponse {
  score: number;
  suggestion: string;
  feedback: string;
}

export async function getRandomWord(): Promise<Word> {
  try {
    const response = await fetch(`${API_BASE_URL}/word`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    // Support both raw word objects and wrapped payloads like { data: { ...word } }
    const word = (data && data.data) ? data.data : data;
    // Normalize level key to match UI
    const level = word.level || word.word_level || word.difficulty_level;
    return { ...word, level };
  } catch (error) {
    console.error("Error fetching word:", error);
    // Fallback mock data
    return {
      word: "Runway",
      meaning: "a strip of hard ground along which aircraft take off and land",
      level: "Beginner",
      example: "The jet braked hard as its wheels touched the runway.",
    };
  }
}

export async function validateSentence(
  sentence: string,
  word: string
): Promise<ValidateResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/validate-sentence`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sentence,
        word,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error validating sentence:", error);
    // Fallback mock response
    return {
      score: 8.5,
      suggestion:
        "The airport's runway is undergoing extensive reconstruction to enhance safety measures.",
      feedback:
        "The word 'runway' is used correctly in the sentence to refer to the strip of land where planes take off and land. The suggestion sentence provides a more advanced structure and vocabulary.",
    };
  }
}
