"use client";

import { FiCalendar } from 'react-icons/fi';
import { useState } from 'react';

interface DateInputProps {
  disabled?: boolean;
  label?: string;
  value?: string;
  onChange: (date: string) => void;
}

export default function DateInput({ label, value = "", disabled = false, onChange }: DateInputProps) {
  const [date, setDate] = useState(value);

  const maskDate = (input: string) => {
    const cleaned = input.replace(/\D/g, '');

    let formatted = cleaned
      .replace(/^(\d{2})(\d)/, '$1-$2')
      .replace(/^(\d{2}-\d{2})(\d)/, '$1-$2');

    return formatted.slice(0, 10);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = maskDate(e.target.value);
    setDate(formattedDate);
    onChange(formattedDate);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-theme-primary mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          value={date}
          onChange={handleDateChange}
          maxLength={10}
          placeholder="DD-MM-YYYY"
          disabled={disabled}
          className={`w-full h-12 pl-3 pr-4 border border-gray-300 rounded-md placeholder-[#9BA5B7] text-theme-primary focus:outline-none focus:ring-0 focus:border-slate-gray ${disabled && 'opacity-50 cursor-not-allowed'}`}
        />
        <FiCalendar className="absolute right-3 top-3.5 text-[#9BA5B7]" />
      </div>
    </div>
  );
}
