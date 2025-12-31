'use client';

import { cn } from '@/shared/lib/utils';
import {
  Trophy,
  Target,
  Clock,
  Zap,
  CheckCircle,
  Activity
} from 'lucide-react';
import type { GauntletOverallStats } from '../../types/stats';

/**
 * Props for the GauntletStatsPanel component
 */
export interface GauntletStatsPanelProps {
  /** Gauntlet stats data, null if not available */
  stats: GauntletOverallStats | null;
  /** Whether the stats are currently loading */
  isLoading: boolean;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Formats time in milliseconds to a readable string
 */
function formatTime(ms: number | null): string {
  if (ms === null) return '--';

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${seconds}s`;
}

/**
 * Individual stat item component
 */
function StatItem({
  icon: Icon,
  label,
  value,
  subValue
}: {
  icon: typeof Trophy;
  label: string;
  value: string | number;
  subValue?: string;
}) {
  return (
    <div className='flex items-center gap-3 rounded-lg bg-[var(--background-color)] p-3'>
      <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--card-color)]'>
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
 * Loading skeleton component
 */
function LoadingSkeleton() {
  return (
    <div className='grid animate-pulse grid-cols-1 gap-3 sm:grid-cols-2'>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className='flex items-center gap-3 rounded-lg bg-[var(--background-color)] p-3'
        >
          <div className='h-10 w-10 shrink-0 rounded-full bg-[var(--border-color)]' />
          <div className='flex-1 space-y-2'>
            <div className='h-3 w-20 rounded bg-[var(--border-color)]' />
            <div className='h-5 w-16 rounded bg-[var(--border-color)]' />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Empty state component
 */
function EmptyState() {
  return (
    <div className='py-8 text-center text-[var(--secondary-color)]'>
      <p>No gauntlet data yet.</p>
      <p className='mt-1 text-sm'>
        Complete a gauntlet challenge to see your stats!
      </p>
    </div>
  );
}

/**
 * GauntletStatsPanel Component
 *
 * Displays gauntlet mode performance statistics including total sessions,
 * completion rate, best time, accuracy, and best streak.
 * Handles loading state for async data.
 *
 * @requirements 4.1-4.6
 */
export default function GauntletStatsPanel({
  stats,
  isLoading,
  className
}: GauntletStatsPanelProps) {
  const hasData = stats && stats.totalSessions > 0;

  return (
    <div
      className={cn(
        'rounded-2xl border border-[var(--border-color)] bg-[var(--card-color)] p-4',
        className
      )}
    >
      <div className='flex flex-col gap-4'>
        {/* Header */}
        <h3 className='text-lg font-semibold text-[var(--main-color)]'>
          Gauntlet Stats
        </h3>

        {/* Content */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : !hasData ? (
          <EmptyState />
        ) : (
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <StatItem
              icon={Activity}
              label='Total Sessions'
              value={stats.totalSessions}
            />
            <StatItem
              icon={CheckCircle}
              label='Completion Rate'
              value={`${stats.completionRate.toFixed(1)}%`}
              subValue={`${stats.completedSessions} / ${stats.totalSessions} completed`}
            />
            <StatItem
              icon={Clock}
              label='Best Time'
              value={formatTime(stats.fastestTime)}
            />
            <StatItem
              icon={Target}
              label='Accuracy'
              value={`${stats.accuracy.toFixed(1)}%`}
              subValue={`${stats.totalCorrect} / ${stats.totalCorrect + stats.totalWrong} correct`}
            />
            <StatItem icon={Zap} label='Best Streak' value={stats.bestStreak} />
            <StatItem
              icon={Trophy}
              label='Total Correct'
              value={stats.totalCorrect}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Helper function to get gauntlet stats display values for testing
 * Returns an object with all the values that should be displayed
 */
export function getGauntletDisplayValues(stats: GauntletOverallStats): {
  totalSessions: number;
  completedSessions: number;
  completionRate: string;
  totalCorrect: number;
  totalWrong: number;
  bestStreak: number;
  fastestTime: string;
  accuracy: string;
} {
  return {
    totalSessions: stats.totalSessions,
    completedSessions: stats.completedSessions,
    completionRate: `${stats.completionRate.toFixed(1)}%`,
    totalCorrect: stats.totalCorrect,
    totalWrong: stats.totalWrong,
    bestStreak: stats.bestStreak,
    fastestTime: formatTime(stats.fastestTime),
    accuracy: `${stats.accuracy.toFixed(1)}%`
  };
}
