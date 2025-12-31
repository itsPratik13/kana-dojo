'use client';

import { type ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

/**
 * Props for the OverviewStatsCard component
 */
export interface OverviewStatsCardProps {
  /** Title of the stat card */
  title: string;
  /** Main value to display */
  value: string | number;
  /** Optional subtitle or additional context */
  subtitle?: string;
  /** Icon to display in the card header */
  icon: ReactNode;
  /** Optional trend indicator */
  trend?: 'up' | 'down' | 'neutral';
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * OverviewStatsCard Component
 *
 * Displays a single statistic in a card format with an icon, value, and optional subtitle.
 * Uses theme variables for consistent styling across the application.
 *
 * @requirements 1.1-1.5, 7.4
 */
export default function OverviewStatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className
}: OverviewStatsCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[var(--border-color)] bg-[var(--card-color)] p-4',
        className
      )}
    >
      <div className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <h3 className='text-sm font-medium text-[var(--main-color)]'>
          {title}
        </h3>
        <div className='h-4 w-4 text-[var(--secondary-color)]'>{icon}</div>
      </div>
      <div className='pt-2'>
        <div className='flex items-center gap-2'>
          <span className='text-2xl font-bold text-[var(--main-color)]'>
            {value}
          </span>
          {trend && trend !== 'neutral' && (
            <span
              className={cn(
                'text-xs font-medium',
                trend === 'up' && 'text-green-500',
                trend === 'down' && 'text-red-500'
              )}
            >
              {trend === 'up' ? '↑' : '↓'}
            </span>
          )}
        </div>
        {subtitle && (
          <p className='mt-1 text-xs text-[var(--secondary-color)]'>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
