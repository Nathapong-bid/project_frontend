"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRandomWord, Word } from '@/lib/api';

export default function WordOfTheDayPage() {
    const buildImageUrl = (word: string) =>
        word?.toLowerCase() === "advertisement"
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsg0RNrXvENE7KZufyFShLisR0_CV0wIaTVA&s"
            : word?.toLowerCase() === "candidate"
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4kSnndKFbrsS36bmzm49EAI9e5M_97YvBZQ&s"
            : word?.toLowerCase() === "elevator"
                ? "https://seacoastconstruction.net/wp-content/uploads/2022/06/derrick-treadwell-m01bajOe8E0-unsplash-min-scaled.jpg"
            : word?.toLowerCase() === "rain"
                ? "https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=lNvbIw1wReb-owe7_rMgW8lZz1zElqs5BOY1AZhyRXs="
            : word?.toLowerCase() === "generation"
                ? "https://images.squarespace-cdn.com/content/v1/5e19698d9383f8245b75341c/1582095676166-H4C8B82GTND8ZAZ4X1OJ/FourGenerations_Judith-Hill-Photography"
            : word?.toLowerCase() === "vacation"
                ? "https://thumbs.dreamstime.com/b/beach-background-beautiful-beach-landscape-tropical-nature-scene-palm-trees-blue-sky-summer-holiday-vacation-concept-93725477.jpg"
            : `https://source.unsplash.com/featured/?${encodeURIComponent(word || "english word")}`;

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [randomScore, setRandomScore] = useState(0);
    const [wordData, setWordData] = useState<Word>({
        word: "",
        meaning: "",
        level: "",
        example: "",
    });
    const router = useRouter();

    useEffect(() => {
        const fetchWord = async () => {
            try {
                const word = await getRandomWord();
                setWordData(word);
            } catch (error) {
                console.error("Failed to fetch word:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWord();
    }, []);

    const handleSubmit = () => {
        // ในสถานการณ์จริง ตรงนี้จะยิง API ไปตรวจประโยค
        const words = inputValue.trim().split(/\s+/).filter(Boolean).length;
        const lengthScore = Math.min(words, 20) / 20 * 10;
        const variance = Math.random() * 2 - 1;
        const score = Math.max(0, Math.min(10, parseFloat((lengthScore + variance).toFixed(1))));
        setRandomScore(score);
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-[#94A3A5] flex items-center justify-center p-4">
            {/* Main Card Container */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8 min-h-[500px] flex flex-col justify-center relative">

                {!isSubmitted ? (
                    // ================= STATE 1: CHALLENGE FORM (ภาพ 3) =================
                    <>
                        <h1 className="font-serif text-3xl font-bold text-gray-800 mb-2">Word of the day</h1>
                        <p className="text-gray-500 mb-6">Practice writing a meaningful sentence using today's word.</p>

                        {/* Word Content Area */}
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                            {/* Image */}
                            <div className="w-full md:w-1/3 h-48 bg-gray-200 rounded-lg overflow-hidden">
                                {isLoading ? (
                                    <div className="w-full h-full bg-gray-200 animate-pulse" />
                                ) : (
                                    <img
                                        src={buildImageUrl(wordData.word)}
                                        alt={`${wordData.word || "word"} context`}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            {/* Definition */}
                            <div className="flex-1 border border-gray-200 rounded-lg p-5 relative">
                                <span className="font-serif absolute top-[-12px] right-4 bg-[#FEF3C7] text-[#92400E] text-xs font-bold px-3 py-1 rounded-full">
                                    Level {wordData.level || (isLoading ? "Loading..." : "Beginner")}
                                </span>

                                <div className="flex items-center gap-2 mb-2">
                                    <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">▶</button>
                                    <h2 className="font-serif text-2xl font-bold text-gray-800">
                                        {wordData.word || (isLoading ? "Loading..." : "Word")}
                                    </h2>
                                </div>

                                <p className="text-gray-400 italic text-sm mb-3">Noun</p>
                                <p className="text-gray-700 text-sm mb-3">
                                    <span className="font-bold">Meaning:</span>{" "}
                                    {wordData.meaning || (isLoading ? "Loading meaning..." : "No meaning available")}
                                </p>
                                <p className="text-gray-500 text-sm italic">
                                    "{wordData.example || (isLoading ? "Loading example..." : "Example not available")}"
                                </p>
                            </div>
                        </div>

                        {/* Input Field */}
                        <textarea
                            className="w-full border border-gray-300 rounded-lg p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 mb-6 resize-none"
                            rows={3}
                            placeholder={
                                wordData.word
                                    ? `Write a meaningful sentence using the word "${wordData.word}"...`
                                    : "Waiting for today's word..."
                            }
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />

                        {/* Buttons */}
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="font-serif px-6 py-2 rounded-full border border-gray-300 text-gray-600 font-medium hover:bg-gray-50"
                            >
                                Do it later
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="font-serif px-8 py-2 rounded-full bg-[#2C3E38] text-white font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Loading..." : "Submit"}
                            </button>
                        </div>
                    </>
                ) : (
                    // ================= STATE 2: COMPLETED (ภาพ 4) =================
                    <div className="text-center">
                        <h1 className="font-serif text-3xl font-bold text-gray-800 mb-4">Challenge completed</h1>

                        <div className="flex justify-center gap-3 mb-8">
                            <span className="font-serif bg-[#FEF3C7] text-[#92400E] text-sm font-bold px-4 py-1 ">
                                Level {wordData.level || "Beginner"}
                            </span>
                            <span className="font-serif bg-[#F3E8FF] text-[#6B21A8] text-sm font-bold px-4 py-1 rounded">
                                Score {randomScore.toFixed(1)} / 10
                            </span>
                        </div>

                        {/* User Sentence */}
                        <div className="text-left bg-white border border-gray-100 p-4 rounded-lg mb-4 shadow-sm">
                            <p className="text-gray-700">
                                <span className="font-bold text-gray-900">Your sentence: </span>
                                {inputValue || "No sentence provided"}
                            </p>
                        </div>

                        {/* Suggestion Box */}
                        <div className="text-left bg-[#ECFDF5] border border-green-100 p-6 rounded-lg mb-8">
                            <p className="text-[#065F46] font-bold text-sm mb-2">
                                Suggestion: Try using "{wordData.word}" in a sentence that gives more context or detail.
                            </p>
                            <p className="text-[#047857] text-sm leading-relaxed">
                                {wordData.example
                                    ? `Example: ${wordData.example}`
                                    : "Add descriptive details so the reader understands how the word fits into the scenario."}
                            </p>
                        </div>

                        {/* Result Buttons */}
                        <div className="flex justify-between items-center px-4">
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="font-serif px-8 py-2 rounded-full border border-gray-300 text-gray-600 font-medium hover:bg-gray-50"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="font-serif px-6 py-2 rounded-full bg-[#2C3E38] text-white font-medium hover:bg-opacity-90 transition-colors"
                            >
                                View my progress
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
