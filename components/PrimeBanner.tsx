"use client";

import { useState, useEffect } from "react";
import { Trophy, Clock } from "lucide-react";

export default function PrimeBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Date de fin : 28 février 2026 23:59:59
    const endDate = new Date("2026-02-28T23:59:59").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = endDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="bg-gradient-to-r from-gold/20 via-gold/30 to-gold/20 border-b-2 border-gold/50 py-4 px-4 animate-glow-pulse">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        <div className="flex items-center gap-3">
          <Trophy className="text-gold" size={24} />
          <div className="text-center md:text-left">
            <h3 className="text-text-primary font-bold text-lg uppercase tracking-wide">
              Primes Actives
            </h3>
            <p className="text-text-secondary text-sm">
              300€ premier RDV • 100€ tous les 3 RDV
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-l border-gold/30 pl-4 md:pl-8">
          <Clock className="text-gold" size={20} />
          <div className="flex items-center gap-2 md:gap-4">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-gold tabular-nums">
                {formatNumber(timeLeft.days)}
              </div>
              <div className="text-xs text-text-secondary uppercase tracking-widest">
                Jours
              </div>
            </div>
            <span className="text-gold text-xl">:</span>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-gold tabular-nums">
                {formatNumber(timeLeft.hours)}
              </div>
              <div className="text-xs text-text-secondary uppercase tracking-widest">
                Heures
              </div>
            </div>
            <span className="text-gold text-xl">:</span>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-gold tabular-nums">
                {formatNumber(timeLeft.minutes)}
              </div>
              <div className="text-xs text-text-secondary uppercase tracking-widest">
                Min
              </div>
            </div>
            <span className="text-gold text-xl">:</span>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-gold tabular-nums">
                {formatNumber(timeLeft.seconds)}
              </div>
              <div className="text-xs text-text-secondary uppercase tracking-widest">
                Sec
              </div>
            </div>
          </div>
          <div className="text-xs text-text-secondary ml-2 hidden md:block">
            (jusqu&apos;au 28/02/2026)
          </div>
        </div>
      </div>
    </div>
  );
}
