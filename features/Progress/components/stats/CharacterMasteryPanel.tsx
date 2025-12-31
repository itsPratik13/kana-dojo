'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/shared/lib/utils';
import type {
  CharacterMasteryItem,
  ContentFilter,
  MasteryLevel
} from '../../types/stats';
import { classifyCharacter } from '../../lib/classifyCharacter';
import { detectContentType } from '../../lib/detectContentType';
import { calculateAccuracy } from '../../lib/calculateAccuracy';

/**
 * Props for the CharacterMasteryPanel component
 */
export interface CharacterMasteryPanelProps {
  /** Raw character mastery data from the stats store */
  characterMastery: Record<string, { correct: number; incorrect: number }>;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Content type filter tabs configuration
 */
const CONTENT_FILTERS: { value: ContentFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'kana', label: 'Kana' },
  { value: 'kanji', label: 'Kanji' },
  { value: 'vocabulary', label: 'Vocabulary' }
];

/**
 * Mastery level configuration for display
 */
const MASTERY_CONFIG: Record<
  MasteryLevel,
  { label: string; color: string; bgColor: string }
> = {
  mastered: {
    label: 'Mastered',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  learning: {
    label: 'Learning',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  'needs-practice': {
    label: 'Needs Practice',
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  }
};

/**
 * Transforms raw character mastery data into CharacterMasteryItem array
 */
function transformCharacterData(
  characterMastery: Record<string, { correct: number; incorrect: number }>
): CharacterMasteryItem[] {
  return Object.entries(characterMastery).map(([character, stats]) => {
    const total = stats.correct + stats.incorrect;
    const accuracy = calculateAccuracy(stats.correct, stats.incorrect);
    const masteryLevel = classifyCharacter(stats.correct, stats.incorrect);
    const contentType = detectContentType(character);

    return {
      character,
      correct: stats.correct,
      incorrect: stats.incorrect,
      total,
      accuracy,
      masteryLevel,
      contentType
    };
  });
}

/**
 * Gets the top N characters by a sorting criteria
 */
export function getTopCharacters(
  characters: CharacterMasteryItem[],
  count: number,
  sortBy: 'difficult' | 'mastered'
): CharacterMasteryItem[] {
  const filtered = characters.filter(char => {
    if (sortBy === 'difficult') {
      // Need at least 5 attempts to be considered difficult
      return char.total >= 5;
    }
    // For mastered, need to meet mastery criteria
    return char.masteryLevel === 'mastered';
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'difficult') {
      // Lowest accuracy first
      return a.accuracy - b.accuracy;
    }
    // Highest accuracy first for mastered
    return b.accuracy - a.accuracy;
  });

  return sorted.slice(0, count);
}

/**
 * CharacterMasteryPanel Component
 *
 * Displays characters grouped by mastery level with filtering by content type.
 * Shows top 5 difficult and top 5 mastered characters prominently.
 *
 * @requirements 2.1-2.7
 */
export default function CharacterMasteryPanel({
  characterMastery,
  className
}: CharacterMasteryPanelProps) {
  const [contentFilter, setContentFilter] = useState<ContentFilter>('all');

  // Transform and filter character data
  const { filteredCharacters, topDifficult, topMastered, groupedByMastery } =
    useMemo(() => {
      const allCharacters = transformCharacterData(characterMastery);

      // Filter by content type
      const filtered =
        contentFilter === 'all'
          ? allCharacters
          : allCharacters.filter(char => char.contentType === contentFilter);

      // Get top characters
      const difficult = getTopCharacters(filtered, 5, 'difficult');
      const mastered = getTopCharacters(filtered, 5, 'mastered');

      // Group by mastery level
      const grouped: Record<MasteryLevel, CharacterMasteryItem[]> = {
        mastered: [],
        learning: [],
        'needs-practice': []
      };

      filtered.forEach(char => {
        grouped[char.masteryLevel].push(char);
      });

      return {
        filteredCharacters: filtered,
        topDifficult: difficult,
        topMastered: mastered,
        groupedByMastery: grouped
      };
    }, [characterMastery, contentFilter]);

  const hasCharacters = filteredCharacters.length > 0;

  return (
    <div
      className={cn(
        'rounded-2xl border border-[var(--border-color)] bg-[var(--card-color)] p-4',
        className
      )}
    >
      <div className='flex flex-col gap-4'>
        {/* Header */}
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <h3 className='text-lg font-semibold text-[var(--main-color)]'>
            Character Mastery
          </h3>

          {/* Content Type Filter Tabs */}
          <div className='flex gap-1 rounded-lg bg-[var(--background-color)] p-1'>
            {CONTENT_FILTERS.map(filter => (
              <button
                key={filter.value}
                onClick={() => setContentFilter(filter.value)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm transition-colors',
                  contentFilter === filter.value
                    ? 'bg-[var(--card-color)] font-medium text-[var(--main-color)] shadow-sm'
                    : 'text-[var(--secondary-color)] hover:text-[var(--main-color)]'
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {!hasCharacters ? (
          <p className='py-8 text-center text-[var(--secondary-color)]'>
            No characters practiced yet. Start training to see your mastery
            progress!
          </p>
        ) : (
          <>
            {/* Top Characters Section */}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {/* Top Difficult */}
              <div className='space-y-2'>
                <h4 className='text-sm font-medium text-[var(--secondary-color)]'>
                  Need More Practice
                </h4>
                {topDifficult.length > 0 ? (
                  <div className='space-y-2'>
                    {topDifficult.map(char => (
                      <CharacterRow key={char.character} item={char} />
                    ))}
                  </div>
                ) : (
                  <p className='text-xs text-[var(--secondary-color)]'>
                    Keep practicing to see analysis!
                  </p>
                )}
              </div>

              {/* Top Mastered */}
              <div className='space-y-2'>
                <h4 className='text-sm font-medium text-[var(--secondary-color)]'>
                  Top Mastered
                </h4>
                {topMastered.length > 0 ? (
                  <div className='space-y-2'>
                    {topMastered.map(char => (
                      <CharacterRow key={char.character} item={char} />
                    ))}
                  </div>
                ) : (
                  <p className='text-xs text-[var(--secondary-color)]'>
                    Master characters to see them here!
                  </p>
                )}
              </div>
            </div>

            {/* Mastery Distribution Summary */}
            <div className='flex flex-wrap gap-3 border-t border-[var(--border-color)] pt-2'>
              {(
                Object.entries(groupedByMastery) as [
                  MasteryLevel,
                  CharacterMasteryItem[]
                ][]
              ).map(([level, chars]) => (
                <div
                  key={level}
                  className={cn(
                    'flex items-center gap-2 rounded-full px-3 py-1.5 text-sm',
                    MASTERY_CONFIG[level].bgColor
                  )}
                >
                  <span
                    className={cn('font-medium', MASTERY_CONFIG[level].color)}
                  >
                    {chars.length}
                  </span>
                  <span className={MASTERY_CONFIG[level].color}>
                    {MASTERY_CONFIG[level].label}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Individual character row component
 */
function CharacterRow({ item }: { item: CharacterMasteryItem }) {
  return (
    <div className='flex items-center justify-between rounded-lg bg-[var(--background-color)] p-2'>
      <span className='text-xl font-medium text-[var(--main-color)]'>
        {item.character}
      </span>
      <div className='text-right'>
        <div className='text-sm font-medium text-[var(--secondary-color)]'>
          {item.accuracy.toFixed(1)}%
        </div>
        <div className='text-xs text-[var(--secondary-color)]'>
          {item.total} attempts
        </div>
      </div>
    </div>
  );
}
