'use client';

import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { Trophy, Star, Award, ChevronRight } from 'lucide-react';
import type { AchievementSummary } from '../../types/stats';

/**
 * Props for the AchievementSummaryBar component
 */
export interface AchievementSummaryBarProps {
  /** Achievement summary data */
  summary: AchievementSummary;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Individual stat item component
 */
function StatItem({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Trophy;
  label: string;
  value: string | number;
}) {
  return (
    <div className='flex items-center gap-2'>
      <Icon className='h-4 w-4 text-[var(--secondary-color)]' />
      <div className='flex flex-col'>
        <span className='text-xs text-[var(--secondary-color)]'>{label}</span>
        <span className='text-sm font-semibold text-[var(--main-color)]'>
          {value}
        </span>
      </div>
    </div>
  );
}

/**
 * AchievementSummaryBar Component
 *
 * Displays a compact summary of achievement progress including
 * points, level, and unlocked achievements count.
 * Includes a link to the full achievements view.
 *
 * @requirements 8.1-8.4
 */
export default function AchievementSummaryBar({
  summary,
  className
}: AchievementSummaryBarProps) {
  const { totalPoints, level, unlockedCount, totalAchievements } = summary;
  const progressPercent =
    totalAchievements > 0 ? (unlockedCount / totalAchievements) * 100 : 0;

  return (
    <div
      className={cn(
        'rounded-2xl border border-[var(--border-color)] bg-[var(--card-color)] p-4',
        className
      )}
    >
      <div className='flex flex-col gap-4'>
        {/* Header with link */}
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-[var(--main-color)]'>
            Achievements
          </h3>
          <Link
            href='/progress'
            className='flex items-center gap-1 text-sm text-[var(--secondary-color)] transition-colors hover:text-[var(--main-color)]'
          >
            View All
            <ChevronRight className='h-4 w-4' />
          </Link>
        </div>

        {/* Stats Row */}
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <StatItem
            icon={Star}
            label='Points'
            value={totalPoints.toLocaleString()}
          />
          <StatItem icon={Trophy} label='Level' value={level} />
          <StatItem
            icon={Award}
            label='Unlocked'
            value={`${unlockedCount} / ${totalAchievements}`}
          />
        </div>

        {/* Progress Bar */}
        <div className='space-y-1'>
          <div className='h-2 overflow-hidden rounded-full bg-[var(--background-color)]'>
            <div
              className='h-full bg-[var(--main-color)] transition-all duration-300'
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className='text-right text-xs text-[var(--secondary-color)]'>
            {progressPercent.toFixed(0)}% Complete
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Helper function to get achievement summary display values for testing
 */
export function getAchievementDisplayValues(summary: AchievementSummary): {
  totalPoints: number;
  level: number;
  unlockedCount: number;
  totalAchievements: number;
  progressPercent: string;
} {
  const progressPercent =
    summary.totalAchievements > 0
      ? (summary.unlockedCount / summary.totalAchievements) * 100
      : 0;

  return {
    totalPoints: summary.totalPoints,
    level: summary.level,
    unlockedCount: summary.unlockedCount,
    totalAchievements: summary.totalAchievements,
    progressPercent: `${progressPercent.toFixed(0)}%`
  };
}
