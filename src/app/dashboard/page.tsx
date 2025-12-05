"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Mock Data for the graph
const chartData = [
  { name: 'Task 1', score: 6.5 },
  { name: 'Task 2', score: 7.0 },
  { name: 'Task 3', score: 6.0 },
  { name: 'Task 4', score: 7.5 },
  { name: 'Task 5', score: 8.0 },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1F2937] mb-8">
        Prayut’s learner dashboard
      </h1>

      {/* Mission Section */}
      <div className="mb-10">
        <h2 className="font-serif text-2xl font-bold text-[#374151] mb-4">Your missions today</h2>
        <div className="bg-[#F3F4F6] px-6 py-4 rounded-lg text-[#1F2937] font-medium text-sm md:text-base">
          Well done! You’ve completed all your missions.
        </div>
      </div>

      {/* Overview Section */}
      <h2 className="font-serif text-2xl font-bold text-[#374151] mb-6">Overview</h2>

      {/* Learning Consistency Card - Unified Card based on screenshot */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
        <h3 className="font-serif text-xl font-bold text-[#374151] mb-8">Learning consistency</h3>

        <div className="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-0">
          {/* Streak */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl text-green-400">🔥</span>
              <span className="font-serif text-4xl font-bold text-[#1F2937]">1</span>
            </div>
            <p className="text-gray-500 text-sm font-light">Day streak</p>
          </div>

          {/* Divider for desktop */}
          <div className="hidden md:block w-px h-16 bg-gray-200"></div>

          {/* Time */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl text-blue-400">⏱</span>
              <span className="font-serif text-4xl font-bold text-[#1F2937]">10</span>
            </div>
            <p className="text-gray-500 text-sm font-light">[Hours / Minutes] learned</p>
          </div>
        </div>
      </div>

      {/* IELTS Graph Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 min-h-[500px] flex flex-col relative">
        <div className="flex justify-between items-center mb-6">
          <button className="font-serif text-[#374151] text-lg flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded-md transition-colors">
            IELTS speaking test
            <span className="text-gray-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
          </button>
          <div className="flex items-center gap-4">
            <span className="font-serif text-[#374151] flex items-center gap-2 cursor-pointer">
              All parts
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
            <a href="#" className="text-xs text-blue-400 hover:text-blue-600 hover:underline">View scoring criteria</a>
          </div>
        </div>

        <div className="font-serif flex justify-between text-xs font-bold text-[#374151] mb-12 px-2">
          <span>Latest band scores</span>
          <span className="text-center block w-full">Progress</span>
        </div>

        {/* Placeholder text mimicking screenshot if chart is empty, but we show chart */}
        {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <span className="text-2xl font-serif text-gray-400">&lt;Create your own data visualization graph or table&gt;</span>
        </div> */}

        {/* Recharts Implementation */}
        <div className="w-full h-[350px] min-h-[350px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                domain={[0, 9]}
                dx={-10}
              />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#1F2937',
                  color: '#fff'
                }}
              />
              {/* Using a darker green/black for the bars to match the "Take the test" button vibe or stick to Green/Blue theme? Screenshot shows empty state mostly. */}
              <Bar dataKey="score" radius={[4, 4, 4, 4]} barSize={20} fill="#1F2937">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#1F2937' : '#374151'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push('/word-of-the-day')}
            className="font-serif bg-[#1F2937] text-white px-12 py-3 rounded-full hover:bg-[#111827] transition font-medium text-sm shadow-md"
          >
            Take the test
          </button>
        </div>
      </div>
    </div>
  );
}