'use client';
import React, { useState } from 'react';
import { Sparkles, Dices, Trophy, RefreshCw } from 'lucide-react';
import { showToast } from "nextjs-toast-notify";

export default function DecisionMaker() {
  const [screen, setScreen] = useState('input'); // input, battle, result
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [rounds, setRounds] = useState<{ pointsA: number; pointsB: number }[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [totalA, setTotalA] = useState(0);
  const [totalB, setTotalB] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

const startDecision = () => {
  if (!optionA.trim() || !optionB.trim()) {
    showToast.warning("Please fill both options!", {
      position: "top-center",
      transition: "bounceIn",
      sound: true,
      progress: true,
    });
    return;
  }

  setScreen("battle");
  runBattle();
};

  const generatePoints = () => {
    return Math.floor(Math.random() * 11); // 0 to 10
  };

  const runBattle = () => {
    const allRounds = [];
    let sumA = 0;
    let sumB = 0;

    for (let i = 0; i < 3; i++) {
      const pointsA = generatePoints();
      const pointsB = generatePoints();
      allRounds.push({ pointsA, pointsB });
      sumA += pointsA;
      sumB += pointsB;
    }

    setRounds(allRounds);
    setTotalA(sumA);
    setTotalB(sumB);
    animateRounds();
  };

  const animateRounds = () => {
    setIsAnimating(true);
    let round = 0;
    
    const interval = setInterval(() => {
      setCurrentRound(round);
      round++;
      
      if (round > 3) {
        clearInterval(interval);
        setTimeout(() => {
          setScreen('result');
          setIsAnimating(false);
        }, 1000);
      }
    }, 1500);
  };

  const reset = () => {
    setScreen('input');
    setOptionA('');
    setOptionB('');
    setRounds([]);
    setCurrentRound(0);
    setTotalA(0);
    setTotalB(0);
  };

  const winner = totalA > totalB ? 'A' : totalB > totalA ? 'B' : 'tie';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        
        {/* INPUT SCREEN */}
        {screen === 'input' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Sparkles className="w-16 h-16 text-yellow-400 animate-pulse" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Let Fate Decide
              </h1>
              <p className="text-purple-200">
                Can't make a decision? Leave it to luck! 🎰
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white mb-2 font-semibold">
                  Option A 🔵
                </label>
                <input
                  type="text"
                  value={optionA}
                  onChange={(e) => setOptionA(e.target.value)}
                  placeholder="Enter your first option..."
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-semibold">
                  Option B 🔴
                </label>
                <input
                  type="text"
                  value={optionB}
                  onChange={(e) => setOptionB(e.target.value)}
                  placeholder="Enter your second option..."
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-red-400 transition"
                />
              </div>

              <button
                onClick={startDecision}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2"
              >
                <Dices className="w-6 h-6" />
                Let Luck Decide!
              </button>
            </div>
          </div>
        )}

        {/* BATTLE SCREEN */}
        {screen === 'battle' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                The Battle Begins! 🎲
              </h2>
              <p className="text-purple-200">Round {currentRound} of 3</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-500/20 rounded-2xl p-6 border-2 border-blue-400">
                <h3 className="text-white font-bold mb-4 text-center truncate">
                  {optionA}
                </h3>
                <div className="space-y-2">
                  {rounds.slice(0, currentRound).map((round, i) => (
                    <div key={i} className="bg-white/10 rounded-lg p-3 text-center animate-pulse">
                      <span className="text-3xl font-bold text-white">
                        {round.pointsA}
                      </span>
                      <p className="text-xs text-blue-200">Round {i + 1}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/20 rounded-2xl p-6 border-2 border-red-400">
                <h3 className="text-white font-bold mb-4 text-center truncate">
                  {optionB}
                </h3>
                <div className="space-y-2">
                  {rounds.slice(0, currentRound).map((round, i) => (
                    <div key={i} className="bg-white/10 rounded-lg p-3 text-center animate-pulse">
                      <span className="text-3xl font-bold text-white">
                        {round.pointsB}
                      </span>
                      <p className="text-xs text-red-200">Round {i + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Dices className="w-12 h-12 text-yellow-400 animate-spin" />
            </div>
          </div>
        )}

        {/* RESULT SCREEN */}
        {screen === 'result' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4 animate-bounce" />
              <h2 className="text-4xl font-bold text-white mb-2">
                Fate Has Spoken! 🎉
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className={`${winner === 'A' ? 'bg-green-500/30 border-green-400 scale-105' : 'bg-blue-500/20 border-blue-400'} rounded-2xl p-6 border-2 transition-all`}>
                <h3 className="text-white font-bold mb-2 text-center truncate">
                  {optionA}
                </h3>
                <div className="text-5xl font-bold text-white text-center">
                  {totalA}
                </div>
                <p className="text-center text-white/70 text-sm mt-2">
                  Total Points
                </p>
              </div>

              <div className={`${winner === 'B' ? 'bg-green-500/30 border-green-400 scale-105' : 'bg-red-500/20 border-red-400'} rounded-2xl p-6 border-2 transition-all`}>
                <h3 className="text-white font-bold mb-2 text-center truncate">
                  {optionB}
                </h3>
                <div className="text-5xl font-bold text-white text-center">
                  {totalB}
                </div>
                <p className="text-center text-white/70 text-sm mt-2">
                  Total Points
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl p-6 mb-6 border-2 border-yellow-400">
              <p className="text-center text-white text-lg">
                {winner === 'tie' ? (
                  <>
                    <span className="text-2xl font-bold">It's a Tie! 🤝</span>
                    <br />
                    <span className="text-sm">Both options scored equally!</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl font-bold">Winner: {winner === 'A' ? optionA : optionB} ✨</span>
                    <br />
                    <span className="text-sm">Fate has chosen this path for you!</span>
                  </>
                )}
              </p>
            </div>

            <button
              onClick={reset}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              New Decision
            </button>
          </div>
        )}
      </div>
    </div>
  );
}