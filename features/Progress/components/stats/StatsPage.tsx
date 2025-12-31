'use client';

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import {
  TrendingUp,
  Target,
  Trophy,
  Users,
  CheckCircle,
  XCircle,
  Trash,
  AlertTriangle
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/shared/components/ui/alert-dialog';
import { ActionButton } from '@/shared/components/ui/ActionButton';
import { useClick } from '@/shared/hooks/useAudio';
import useStatsStore from '../../store/useStatsStore';
import { useStatsAggregator } from '../../hooks/useStatsAggregator';
import OverviewStatsCard from './OverviewStatsCard';
import CharacterMasteryPanel from './CharacterMasteryPanel';
import TimedModeStatsPanel from './TimedModeStatsPanel';
import GauntletStatsPanel from './GauntletStatsPanel';
import MasteryDistributionChart from './MasteryDistributionChart';
import AchievementSummaryBar from './AchievementSummaryBar';

/**
 * Props for the StatsPage component
 */
export interface StatsPageProps {
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Empty state component for when there's no data
 */
function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center'>
      <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--card-color)]'>
        <TrendingUp className='h-8 w-8 text-[var(--secondary-color)]' />
      </div>
      <h2 className='mb-2 text-xl font-semibold text-[var(--main-color)]'>
        No Progress Yet
      </h2>
      <p className='max-w-md text-[var(--secondary-color)]'>
        Start practicing to see your statistics here! Complete training sessions
        to track your progress and character mastery.
      </p>
    </div>
  );
}

/**
 * StatsPage Component
 *
 * Main container component that orchestrates all stats sub-components.
 * Displays a comprehensive dashboard with overview stats, character mastery,
 * timed mode stats, gauntlet stats, mastery distribution, and achievements.
 *
 * Features:
 * - Responsive grid layout (single column on mobile, multi-column on larger screens)
 * - Reset functionality with confirmation dialog
 * - Empty state handling
 * - Loading states for async data
 *
 * @requirements 1.1-1.6, 6.1-6.5, 7.1-7.4
 */
export default function StatsPage({ className }: StatsPageProps) {
  const { playClick } = useClick();
  const { clearAllProgress } = useStatsStore();
  const { stats, isLoading } = useStatsAggregator();
  const [showResetModal, setShowResetModal] = useState(false);

  const hasData = stats.totalSessions > 0 || stats.uniqueCharactersLearned > 0;

  const handleResetClick = () => {
    playClick();
    setShowResetModal(true);
  };

  const handleConfirmReset = () => {
    clearAllProgress();
    setShowResetModal(false);
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <h1 className='text-3xl font-medium text-[var(--main-color)]'>
          Your Progress
        </h1>
        <ActionButton
          onClick={handleResetClick}
          colorScheme='secondary'
          borderColorScheme='secondary'
          borderBottomThickness={8}
          className='w-auto px-4 py-2 text-sm'
        >
          <Trash className='h-4 w-4' />
          Reset Progress
        </ActionButton>
      </div>

      {/* Reset Confirmation Dialog */}
      <AlertDialog open={showResetModal} onOpenChange={setShowResetModal}>
        <AlertDialogContent className='border-[var(--border-color)] bg-[var(--card-color)]'>
          <AlertDialogHeader>
            <div className='mb-2 flex items-center gap-3'>
              <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100'>
                <AlertTriangle className='h-6 w-6 text-red-600' />
              </div>
              <AlertDialogTitle className='text-xl text-[var(--main-color)]'>
                Reset All Progress?
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className='leading-relaxed text-[var(--secondary-color)]'>
              This will permanently delete all your progress data, including
              sessions, accuracy stats, and character mastery. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='border-[var(--border-color)] text-[var(--main-color)] hover:bg-[var(--background-color)]'>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmReset}
              className='bg-red-600 text-white hover:bg-red-700'
            >
              Reset Progress
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {!hasData ? (
        <EmptyState />
      ) : (
        <>
          {/* Overview Stats Grid */}
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
            <OverviewStatsCard
              title='Total Sessions'
              value={stats.totalSessions}
              icon={<TrendingUp className='h-4 w-4' />}
            />
            <OverviewStatsCard
              title='Overall Accuracy'
              value={`${stats.overallAccuracy.toFixed(1)}%`}
              subtitle={`${stats.totalCorrect} / ${stats.totalCorrect + stats.totalIncorrect} correct`}
              icon={<Target className='h-4 w-4' />}
            />
            <OverviewStatsCard
              title='Best Streak'
              value={stats.bestStreak}
              icon={<Trophy className='h-4 w-4' />}
            />
            <OverviewStatsCard
              title='Characters Learned'
              value={stats.uniqueCharactersLearned}
              icon={<Users className='h-4 w-4' />}
            />
            <OverviewStatsCard
              title='Total Correct'
              value={stats.totalCorrect}
              icon={<CheckCircle className='h-4 w-4' />}
            />
            <OverviewStatsCard
              title='Total Incorrect'
              value={stats.totalIncorrect}
              icon={<XCircle className='h-4 w-4' />}
            />
          </div>

          {/* Achievement Summary */}
          <AchievementSummaryBar summary={stats.achievements} />

          {/* Main Content Grid */}
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {/* Character Mastery Panel */}
            <CharacterMasteryPanel
              characterMastery={Object.fromEntries(
                stats.characterMastery.map(item => [
                  item.character,
                  { correct: item.correct, incorrect: item.incorrect }
                ])
              )}
            />

            {/* Mastery Distribution Chart */}
            <MasteryDistributionChart
              distribution={stats.masteryDistribution}
            />
          </div>

          {/* Timed Mode and Gauntlet Stats */}
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            <TimedModeStatsPanel
              kanaStats={stats.timedKana}
              kanjiStats={stats.timedKanji}
              vocabularyStats={stats.timedVocabulary}
            />
            <GauntletStatsPanel stats={stats.gauntlet} isLoading={isLoading} />
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Helper function to get stats overview display values for testing
 * Returns an object with all the key metrics that should be displayed
 */
export function getStatsOverviewDisplayValues(stats: {
  totalSessions: number;
  totalCorrect: number;
  totalIncorrect: number;
  overallAccuracy: number;
  bestStreak: number;
  uniqueCharactersLearned: number;
}): {
  totalSessions: number;
  overallAccuracy: string;
  bestStreak: number;
  uniqueCharactersLearned: number;
  totalCorrect: number;
  totalIncorrect: number;
  hasAllMetrics: boolean;
} {
  return {
    totalSessions: stats.totalSessions,
    overallAccuracy: `${stats.overallAccuracy.toFixed(1)}%`,
    bestStreak: stats.bestStreak,
    uniqueCharactersLearned: stats.uniqueCharactersLearned,
    totalCorrect: stats.totalCorrect,
    totalIncorrect: stats.totalIncorrect,
    hasAllMetrics: true
  };
}
