import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useTheme } from '../hooks/useTheme';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

const ReportProblemForm: React.FC = () => {
  const { theme } = useTheme();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_CHARS_SUBJECT = 70;
  const MAX_CHARS_DESCRIPTION = 700;

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length <= MAX_CHARS_SUBJECT) {
      setSubject(val);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= MAX_CHARS_DESCRIPTION) {
      setDescription(val);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubject('');
      setDescription('');
      toast.success('Your report has been submitted successfully. We will contact you soon! ✅');
    }, 1500);
  };

  return (
    <div className={`p-6 rounded-2xl shadow-sm border ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-gray-800'}`}>
      <div className="mb-6">
        <h2 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
          Report a Problem
        </h2>
        <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
          Describe the issue you are facing and our support team will get back to you as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className={`block text-sm font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
              Subject
            </label>
            <span className={`text-xs font-medium ${subject.length === MAX_CHARS_SUBJECT ? 'text-red-500' : theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              {subject.length} / {MAX_CHARS_SUBJECT} caractere
            </span>
          </div>
          <input
            type="text"
            value={subject}
            onChange={handleSubjectChange}
            placeholder="E.g., App crashes, Missing donation, etc."
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 transition-shadow ${
              theme === 'light'
                ? 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#16a34a]'
                : 'bg-[#222222] border-gray-700 text-gray-100 focus:border-[#16a34a]'
            }`}
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className={`block text-sm font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>
              Description
            </label>
            <span className={`text-xs font-medium ${description.length === MAX_CHARS_DESCRIPTION ? 'text-red-500' : theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              {description.length} / {MAX_CHARS_DESCRIPTION} caractere
            </span>
          </div>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Please provide as much detail as possible..."
            rows={5}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 transition-shadow resize-none ${
              theme === 'light'
                ? 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#16a34a]'
                : 'bg-[#222222] border-gray-700 text-gray-100 focus:border-[#16a34a]'
            }`}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-3 bg-[#16a34a] hover:bg-green-600 active:bg-green-700 text-white font-bold rounded-xl shadow-md shadow-green-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <PaperAirplaneIcon className="w-5 h-5" />
              Submit Report
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReportProblemForm;
