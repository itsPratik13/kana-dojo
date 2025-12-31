'use client';

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Clock, Target, Zap, Trophy } from 'lucide-react';
import type { TimedModeStats, ContentType } from '../../types/stats';

/**
 * Props for the TimedModeStatsPanel component
 */
export interface TimedModeStatsPanelProps {
  /** Kana timed mode stats */
  kanaStats: TimedModeStats;
  /** Kanji timed mode stats */
  kanjiStats: TimedModeStats;
  /** Vocabulary timed mode stats */
  vocabularyStats: TimedModeStats;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Content type tabs configuration
 */
const CONTENT_TABS: { value: ContentType; label: string }[] = [
  { value: 'kana', label: 'Kana' },
  { value: 'kanji', label: 'Kanji' },
  { value: 'vocabulary', label: 'Vocabulary' }
];

/**
 * Individual stat item component
 */
function StatItem({
  icon: Icon,
  label,
  value,
  subValue
}: {
  icon: typeof Clock;
  label: string;
  value: string | number;
  subValue?: string;
}) {
  return (
    <div className='flex items-center gap-3 rounded-lg bg-[var(--background-color)] p-3'>
      <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--card-color)]'>
        <Icon className='h-5 w-5 text-[var(--main-color)]' />
      </div>
      <div className='min-w-0 flex-1'>
        <p className='text-xs text-[var(--secondary-color)]'>{label}</p>
        <p className='text-lg font-semibold text-[var(--main-color)]'>
          {value}
        </p>
        {subValue && (
          <p className='text-xs text-[var(--secondary-color)]'>{subValue}</p>
        )}
      </div>
    </div>
  );
}

/**
 * Stats display for a single content type
 */
function ContentTypeStats({ stats }: { stats: TimedModeStats }) {
  const hasData = stats.correct > 0 || stats.wrong > 0;

  if (!hasData) {
    return (
      <div className='py-8 text-center text-[var(--secondary-color)]'>
        <p>No timed mode data yet.</p>
        <p className='mt-1 text-sm'>
          Start a timed challenge to see your stats!
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
      <StatItem icon={Target} label='Correct Answers' value={stats.correct} />
      <StatItem icon={Clock} label='Wrong Answers' value={stats.wrong} />
      <StatItem icon={Zap} label='Current Streak' value={stats.streak} />
      <StatItem icon={Trophy} label='Best Streak' value={stats.bestStreak} />
      <div className='sm:col-span-2'>
        <StatItem
          icon={Target}
          label='Accuracy'
          value={`${stats.accuracy.toFixed(1)}%`}
          subValue={`${stats.correct} / ${stats.correct + stats.wrong} correct`}
        />
      </div>
    </div>
  );
}

/**
 * TimedModeStatsPanel Component
 *
 * Displays timed mode statistics for Kana, Kanji, and Vocabulary
 * with tabs to switch between content types.
 *
 * @requirements 3.1-3.5
 */
export default function TimedModeStatsPanel({
  kanaStats,
  kanjiStats,
  vocabularyStats,
  className
}: TimedModeStatsPanelProps) {
  const [activeTab, setActiveTab] = useState<ContentType>('kana');

  const statsMap: Record<ContentType, TimedModeStats> = {
    kana: kanaStats,
    kanji: kanjiStats,
    vocabulary: vocabularyStats
  };

  const currentStats = statsMap[activeTab];

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
            Timed Mode Stats
          </h3>

          {/* Content Type Tabs */}
          <div className='flex gap-1 rounded-lg bg-[var(--background-color)] p-1'>
            {CONTENT_TABS.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm transition-colors',
                  activeTab === tab.value
                    ? 'bg-[var(--card-color)] font-medium text-[var(--main-color)] shadow-sm'
                    : 'text-[var(--secondary-color)] hover:text-[var(--main-color)]'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Content */}
        <ContentTypeStats stats={currentStats} />
      </div>
    </div>
  );
}

/**
 * Helper function to render timed mode stats for testing
 * Returns an object with all the values that should be displayed
 */
export function getTimedModeDisplayValues(stats: TimedModeStats): {
  correct: number;
  wrong: number;
  streak: number;
  bestStreak: number;
  accuracy: string;
  total: number;
} {
  return {
    correct: stats.correct,
    wrong: stats.wrong,
    streak: stats.streak,
    bestStreak: stats.bestStreak,
    accuracy: `${stats.accuracy.toFixed(1)}%`,
    total: stats.correct + stats.wrong
  };
}
