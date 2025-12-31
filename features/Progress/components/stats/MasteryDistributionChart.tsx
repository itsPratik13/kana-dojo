'use client';

import { cn } from '@/shared/lib/utils';
import type { MasteryDistribution } from '../../types/stats';

/**
 * Props for the MasteryDistributionChart component
 */
export interface MasteryDistributionChartProps {
  /** Mastery distribution data */
  distribution: MasteryDistribution;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Configuration for mastery level display
 */
const MASTERY_CONFIG = {
  mastered: {
    label: 'Mastered',
    color: 'bg-green-500',
    textColor: 'text-green-600',
    description: '90%+ accuracy, 10+ attempts'
  },
  learning: {
    label: 'Learning',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-600',
    description: 'In progress'
  },
  needsPractice: {
    label: 'Needs Practice',
    color: 'bg-red-500',
    textColor: 'text-red-600',
    description: '<70% accuracy, 5+ attempts'
  }
} as const;

/**
 * Calculates percentage for a value
 */
function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * MasteryDistributionChart Component
 *
 * Displays a visual breakdown of character mastery distribution
 * with color coding for performance levels.
 *
 * @requirements 5.1-5.3
 */
export default function MasteryDistributionChart({
  distribution,
  className
}: MasteryDistributionChartProps) {
  const { mastered, learning, needsPractice, total } = distribution;

  const masteredPercent = calculatePercentage(mastered, total);
  const learningPercent = calculatePercentage(learning, total);
  const needsPracticePercent = calculatePercentage(needsPractice, total);

  const hasData = total > 0;

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
          Mastery Distribution
        </h3>

        {!hasData ? (
          <p className='py-4 text-center text-[var(--secondary-color)]'>
            No characters practiced yet.
          </p>
        ) : (
          <>
            {/* Progress Bar */}
            <div className='flex h-6 overflow-hidden rounded-full bg-[var(--background-color)]'>
              {masteredPercent > 0 && (
                <div
                  className={cn(
                    'h-full transition-all duration-300',
                    MASTERY_CONFIG.mastered.color
                  )}
                  style={{ width: `${masteredPercent}%` }}
                  title={`Mastered: ${mastered} (${masteredPercent.toFixed(1)}%)`}
                />
              )}
              {learningPercent > 0 && (
                <div
                  className={cn(
                    'h-full transition-all duration-300',
                    MASTERY_CONFIG.learning.color
                  )}
                  style={{ width: `${learningPercent}%` }}
                  title={`Learning: ${learning} (${learningPercent.toFixed(1)}%)`}
                />
              )}
              {needsPracticePercent > 0 && (
                <div
                  className={cn(
                    'h-full transition-all duration-300',
                    MASTERY_CONFIG.needsPractice.color
                  )}
                  style={{ width: `${needsPracticePercent}%` }}
                  title={`Needs Practice: ${needsPractice} (${needsPracticePercent.toFixed(1)}%)`}
                />
              )}
            </div>

            {/* Legend */}
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
              {/* Mastered */}
              <div className='flex items-center gap-2'>
                <div
                  className={cn(
                    'h-3 w-3 rounded-full',
                    MASTERY_CONFIG.mastered.color
                  )}
                />
                <div className='flex-1'>
                  <div className='flex items-center justify-between'>
                    <span
                      className={cn(
                        'text-sm font-medium',
                        MASTERY_CONFIG.mastered.textColor
                      )}
                    >
                      {MASTERY_CONFIG.mastered.label}
                    </span>
                    <span className='text-sm text-[var(--main-color)]'>
                      {mastered}
                    </span>
                  </div>
                  <span className='text-xs text-[var(--secondary-color)]'>
                    {masteredPercent.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Learning */}
              <div className='flex items-center gap-2'>
                <div
                  className={cn(
                    'h-3 w-3 rounded-full',
                    MASTERY_CONFIG.learning.color
                  )}
                />
                <div className='flex-1'>
                  <div className='flex items-center justify-between'>
                    <span
                      className={cn(
                        'text-sm font-medium',
                        MASTERY_CONFIG.learning.textColor
                      )}
                    >
                      {MASTERY_CONFIG.learning.label}
                    </span>
                    <span className='text-sm text-[var(--main-color)]'>
                      {learning}
                    </span>
                  </div>
                  <span className='text-xs text-[var(--secondary-color)]'>
                    {learningPercent.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Needs Practice */}
              <div className='flex items-center gap-2'>
                <div
                  className={cn(
                    'h-3 w-3 rounded-full',
                    MASTERY_CONFIG.needsPractice.color
                  )}
                />
                <div className='flex-1'>
                  <div className='flex items-center justify-between'>
                    <span
                      className={cn(
                        'text-sm font-medium',
                        MASTERY_CONFIG.needsPractice.textColor
                      )}
                    >
                      {MASTERY_CONFIG.needsPractice.label}
                    </span>
                    <span className='text-sm text-[var(--main-color)]'>
                      {needsPractice}
                    </span>
                  </div>
                  <span className='text-xs text-[var(--secondary-color)]'>
                    {needsPracticePercent.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className='border-t border-[var(--border-color)] pt-2 text-center text-sm text-[var(--secondary-color)]'>
              Total Characters:{' '}
              <span className='font-medium text-[var(--main-color)]'>
                {total}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Helper function to get mastery distribution display values for testing
 */
export function getMasteryDistributionDisplayValues(
  distribution: MasteryDistribution
): {
  mastered: number;
  learning: number;
  needsPractice: number;
  total: number;
  masteredPercent: string;
  learningPercent: string;
  needsPracticePercent: string;
  percentageSum: number;
} {
  const { mastered, learning, needsPractice, total } = distribution;

  const masteredPercent = calculatePercentage(mastered, total);
  const learningPercent = calculatePercentage(learning, total);
  const needsPracticePercent = calculatePercentage(needsPractice, total);

  return {
    mastered,
    learning,
    needsPractice,
    total,
    masteredPercent: `${masteredPercent.toFixed(1)}%`,
    learningPercent: `${learningPercent.toFixed(1)}%`,
    needsPracticePercent: `${needsPracticePercent.toFixed(1)}%`,
    percentageSum: masteredPercent + learningPercent + needsPracticePercent
  };
}
