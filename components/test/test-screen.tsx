'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { cn, getMediaUrl } from '@/lib/utils';
import { sortByOrder } from '@/lib/lesson-utils';
import type { ModuleTest, TestQuestion } from '@/hooks/use-module-test';
import api from '@/lib/api';
import { TestResultModal } from './test-result-modal';

interface TestScreenProps {
  test: ModuleTest;
  moduleId: string;
  onBack: () => void;
  onContinue: () => void;
  submitUrl?: string;
}

interface SubmitResult {
  isPassed: boolean;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  earnedPoints: number;
  maxPoints: number;
}

type Screen = 'start' | 'quiz';
type Answers = Map<number, number[]>;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function TestScreen({ test, moduleId, onBack, onContinue, submitUrl }: TestScreenProps) {
  const queryClient = useQueryClient();
  const [screen, setScreen] = useState<Screen>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(new Map());
  const [timeLeft, setTimeLeft] = useState(test.timeLimit * 60);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const questions = sortByOrder(test.questions ?? []);
  const currentQuestion: TestQuestion | undefined = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const selectedIds = answers.get(currentQuestion?.id ?? -1) ?? [];
  const hasAnswer = selectedIds.length > 0;
  const noQuestions = questions.length === 0;

  // Countdown timer
  useEffect(() => {
    if (screen !== 'quiz' || test.timeLimit === 0) return;
    if (timeLeft <= 0) { handleSubmit(); return; }
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [screen, timeLeft]);

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        answers: questions.map((q) => ({
          questionId: q.id,
          selectedOptionIds: answers.get(q.id) ?? [],
        })),
      };
      const res = await api.post(submitUrl ?? `/test/module/${moduleId}/submit`, payload);
      const data = res.data?.data ?? res.data;
      setResult({
        isPassed: data.isPassed,
        correctAnswers: data.correctAnswers ?? 0,
        totalQuestions: data.questionsCount ?? questions.length,
        percentage: data.percentage ?? 0,
        earnedPoints: data.earnedPoints ?? 0,
        maxPoints: data.maxPoints ?? questions.length,
      });
      // Invalidate modules so module.test.isPassed reflects new state
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    } catch {
      setSubmitError("Testni yuborishda xatolik yuz berdi. Qayta urinib ko'ring.");
    } finally {
      setSubmitting(false);
    }
  }, [answers, questions, moduleId, submitUrl, queryClient]);

  const toggleOption = (questionId: number, optionId: number, type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE') => {
    setAnswers((prev) => {
      const next = new Map(prev);
      if (type === 'SINGLE_CHOICE') {
        next.set(questionId, [optionId]);
      } else {
        const cur = next.get(questionId) ?? [];
        next.set(questionId, cur.includes(optionId) ? cur.filter((id) => id !== optionId) : [...cur, optionId]);
      }
      return next;
    });
  };

  // ─── START ──────────────────────────────────────────────────────
  if (screen === 'start') {
    return (
      <div className="bg-white rounded-2xl p-10 lg:p-16 w-full text-center shadow-sm min-h-[480px] flex flex-col items-center justify-center">
          {/* Icon */}
          <div className="flex justify-center mb-5">
            <Image src="/icons/file.svg" alt="" width={56} height={56} />
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-2">{test.name}</h1>
          <p className="text-sm text-gray-500 mb-8">
            {noQuestions
              ? "Bu testda hali savollar yo'q. Iltimos keyinroq urinib ko'ring."
              : <>Materialni mustahkamlash<br />va modulni yakunlash uchun test.</>}
          </p>

          {noQuestions ? (
            <button
              onClick={onBack}
              className="w-64 h-12 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm transition-colors"
            >
              Orqaga
            </button>
          ) : (
            <button
              onClick={() => {
                setAnswers(new Map());
                setCurrentIndex(0);
                setTimeLeft(test.timeLimit * 60);
                setScreen('quiz');
              }}
              className="w-64 h-12 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm transition-colors"
            >
              Boshlash
            </button>
          )}
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center text-gray-500">
        Savollar topilmadi.
      </div>
    );
  }

  // ─── QUIZ (+ result modal overlay) ─────────────────────────────
  return (
    <>
    {/* Result modal overlay */}
    {result && (
      <TestResultModal
        correctAnswers={result.correctAnswers}
        totalQuestions={result.totalQuestions}
        percentage={result.percentage}
        isPassed={result.isPassed}
        onContinue={onContinue}
        onRetry={() => {
          setResult(null);
          setAnswers(new Map());
          setCurrentIndex(0);
          setTimeLeft(test.timeLimit * 60);
          setScreen('start');
        }}
      />
    )}

    <div className="bg-white rounded-2xl p-8 lg:p-10">
      {/* Back link */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Orqaga
      </button>

      <div>
        {/* Question badge + timer */}
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
            Savollar {currentIndex + 1}/{questions.length}
          </span>
          {test.timeLimit > 0 && (
            <span className={cn(
              'text-sm font-medium tabular-nums',
              timeLeft < 60 ? 'text-red-500' : 'text-gray-500',
            )}>
              {formatTime(timeLeft)}
            </span>
          )}
        </div>

        {/* Question image */}
        {currentQuestion.image && (
          <div className="relative w-full max-h-56 rounded-xl mb-5 bg-gray-50 overflow-hidden">
            <Image
              src={getMediaUrl(currentQuestion.image)}
              alt=""
              width={800}
              height={224}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Question text */}
        <h2
          className="text-lg font-semibold text-gray-900 mb-6"
          dangerouslySetInnerHTML={{ __html: `${currentIndex + 1}. ${currentQuestion.text}` }}
        />

        {/* Options */}
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option, optIdx) => {
            const isSelected = selectedIds.includes(option.id);
            const isSingle = currentQuestion.type === 'SINGLE_CHOICE';

            if (isSingle) {
              // SINGLE_CHOICE — radio style
              return (
                <label
                  key={option.id}
                  onClick={() => toggleOption(currentQuestion.id, option.id, currentQuestion.type)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className={cn(
                    'flex-shrink-0 w-5 h-5 rounded-full border-2 grid place-items-center transition-all',
                    isSelected ? 'border-blue-600' : 'border-gray-300 group-hover:border-gray-400',
                  )}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                  </div>
                  <span
                    className="text-sm text-gray-800 select-none"
                    dangerouslySetInnerHTML={{ __html: option.text }}
                  />
                  {option.image && (
                    <Image src={getMediaUrl(option.image)} alt="" width={200} height={96} className="mt-1 max-h-24 object-contain rounded-lg" />
                  )}
                </label>
              );
            }

            // MULTIPLE_CHOICE — numbered badge + outlined row
            return (
              <div
                key={option.id}
                onClick={() => toggleOption(currentQuestion.id, option.id, currentQuestion.type)}
                className="flex items-center gap-3 cursor-pointer"
              >
                {/* Numbered badge */}
                <div className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors',
                  isSelected ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white',
                )}>
                  {optIdx + 1}
                </div>
                {/* Text input-like box */}
                <div className={cn(
                  'flex-1 h-10 px-4 rounded-lg border flex items-center text-sm transition-colors',
                  isSelected ? 'border-blue-600 bg-blue-50 text-gray-900' : 'border-gray-200 bg-white text-gray-800',
                )}>
                  <span dangerouslySetInnerHTML={{ __html: option.text }} />
                </div>
                {option.image && (
                  <Image src={getMediaUrl(option.image)} alt="" width={200} height={96} className="max-h-24 object-contain rounded-lg" />
                )}
              </div>
            );
          })}
        </div>

        {/* Error */}
        {submitError && (
          <p className="text-red-500 text-sm mb-4">{submitError}</p>
        )}

        {/* Nav buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setCurrentIndex((i) => i - 1)}
            disabled={currentIndex === 0}
            className={cn(
              'flex-1 h-11 rounded-xl border font-medium text-sm transition-colors',
              currentIndex > 0
                ? 'border-gray-200 text-gray-700 hover:bg-gray-50'
                : 'border-gray-100 text-gray-300 cursor-not-allowed',
            )}
          >
            Orqaga
          </button>

          {isLast ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 h-11 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm transition-colors disabled:opacity-60"
            >
              {submitting ? 'Yuborilmoqda...' : 'Yakunlash'}
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex((i) => i + 1)}
              disabled={!hasAnswer}
              className={cn(
                'flex-1 h-11 rounded-xl font-medium text-sm transition-colors',
                hasAnswer
                  ? 'bg-gray-900 hover:bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed',
              )}
            >
              Davom etish
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

