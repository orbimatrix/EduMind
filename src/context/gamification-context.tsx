
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const XP_PER_LEVEL = 100;

const LEVEL_DATA: { [key: number]: { title: string } } = {
  1: { title: 'Novice' },
  2: { title: 'Apprentice' },
  3: { title: 'Journeyman' },
  4: { title: 'Adept' },
  5: { title: 'Scholar' },
  6: { title: 'Guru' },
  10: { title: 'Master' },
};

const BADGE_DATA: { [key: string]: { requiredXp: number } } = {
    'upload-1': { requiredXp: 10 },
    'upload-5': { requiredXp: 50 },
    'verified': { requiredXp: 150 },
    'master': { requiredXp: 300 },
    'scholar': { requiredXp: 500 },
    'ai-enthusiast': { requiredXp: 1000 },
};

type GamificationContextType = {
  xp: number;
  level: number;
  badges: string[];
  addXp: (amount: number) => void;
  levelData: { title: string; nextLevelXp: number };
  getLevelProgress: () => number;
};

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    // Initial badge check
    const earnedBadges = Object.keys(BADGE_DATA).filter(
      badgeId => xp >= BADGE_DATA[badgeId].requiredXp
    );
    setBadges(earnedBadges);
  }, [xp]);

  const addXp = useCallback((amount: number) => {
    setXp(prevXp => {
      const newXp = prevXp + amount;
      const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;
      if (newLevel > level) {
        setLevel(newLevel > 50 ? 50 : newLevel);
      }
      
      // Check for new badges
      const newBadges = Object.keys(BADGE_DATA).filter(
        badgeId => newXp >= BADGE_DATA[badgeId].requiredXp
      );
      if (newBadges.length > badges.length) {
        setBadges(newBadges);
      }

      return newXp;
    });
  }, [level, badges.length]);

  const levelData = useMemo(() => {
    const currentLevelBaseXp = (level - 1) * XP_PER_LEVEL;
    const nextLevelXp = level * XP_PER_LEVEL;

    const getTitle = () => {
        let currentTitle = 'Novice';
        const sortedLevels = Object.keys(LEVEL_DATA).map(Number).sort((a,b) => a - b);
        for(const lvl of sortedLevels) {
            if(level >= lvl) {
                currentTitle = LEVEL_DATA[lvl].title;
            } else {
                break;
            }
        }
        return currentTitle;
    }

    return {
        title: getTitle(),
        nextLevelXp: nextLevelXp
    };
  }, [level]);

  const getLevelProgress = useCallback(() => {
    if (level === 0) return 0;
    const currentLevelBaseXp = (level - 1) * XP_PER_LEVEL;
    const xpIntoLevel = xp - currentLevelBaseXp;
    return (xpIntoLevel / XP_PER_LEVEL) * 100;
  }, [xp, level]);

  const value = {
    xp,
    level,
    badges,
    addXp,
    levelData,
    getLevelProgress,
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};
