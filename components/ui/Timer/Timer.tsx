'use client';

import { useState, useEffect, useCallback } from 'react';
import Button from '../Button';
import { formatDuration } from '../../../lib/utils';

interface TimerProps {
  onSave?: (data: {
    description: string;
    billable_seconds: number;
    start_time: string;
    end_time: string;
  }) => void;
}

export default function Timer({ onSave }: TimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      // Update timer every second
      intervalId = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startTimer = useCallback(() => {
    const now = new Date();
    setStartTime(now);
    setIsRunning(true);
    setSeconds(0);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setSeconds(0);
    setStartTime(null);
    setDescription('');
  }, []);

  const saveTimeEntry = useCallback(() => {
    if (!startTime || !description.trim()) {
      alert('Please add a description for this time entry');
      return;
    }

    const endTime = new Date();
    
    if (onSave) {
      onSave({
        description: description.trim(),
        billable_seconds: seconds,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString()
      });
    }

    resetTimer();
  }, [startTime, description, seconds, onSave, resetTimer]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h3 className="text-lg font-semibold mb-4">Time Tracker</h3>
      
      {/* Timer Display */}
      <div className="text-center mb-6">
        <div className="text-4xl font-mono font-bold text-gray-800 mb-2">
          {formatTime(seconds)}
        </div>
        {startTime && (
          <div className="text-sm text-gray-500">
            Started at {startTime.toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Description Input */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          What are you working on?
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your work..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          disabled={isRunning}
        />
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {!isRunning ? (
          <Button
            onClick={startTimer}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
          >
            Start Timer
          </Button>
        ) : (
          <Button
            onClick={stopTimer}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
          >
            Stop Timer
          </Button>
        )}

        {seconds > 0 && !isRunning && (
          <>
            <Button
              onClick={saveTimeEntry}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            >
              Save Entry
            </Button>
            <Button
              onClick={resetTimer}
              variant="slim"
              className="px-6 py-2"
            >
              Reset
            </Button>
          </>
        )}
      </div>
    </div>
  );
} 