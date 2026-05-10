import { useState, useEffect, useCallback, useRef } from 'react';
import type { DonationRecord, Partner, ReportFilters } from '../types/reports.ts';
import {
  fetchDonationHistory,
  fetchTopPartners,
  generateImpactSummary,
} from '../services/reportsService.ts';

interface UseFetchState<T> {
  data: T[] | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export const useFetchDonationHistory = (
  filters: ReportFilters,
  page: number = 1,
  pageSize: number = 10
): UseFetchState<DonationRecord> => {
  const [data, setData] = useState<DonationRecord[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const retryCountRef = useRef(0);

  const retry = useCallback(() => {
    retryCountRef.current += 1;
    setError(null);
    setLoading(true);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchDonationHistory(filters, page, pageSize);
        setData(result);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch donation history';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters, page, pageSize, retryCountRef]);

  return { data: data || [], loading, error, retry };
};

export const useFetchTopPartners = (
  filters: ReportFilters
): UseFetchState<Partner> => {
  const [data, setData] = useState<Partner[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const retryCountRef = useRef(0);

  const retry = useCallback(() => {
    retryCountRef.current += 1;
    setError(null);
    setLoading(true);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchTopPartners(filters);
        setData(result);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch top partners';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters, retryCountRef]);

  return { data: data || [], loading, error, retry };
};

interface ImpactSummary {
  totalKg: number;
  totalDonations: number;
  topPartner: string;
}

export const useImpactSummary = (
  filters: ReportFilters,
  history: DonationRecord[]
): {
  summary: ImpactSummary | null;
  loading: boolean;
  error: string | null;
} => {
  const [summary, setSummary] = useState<ImpactSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generate = async () => {
      if (history.length === 0) {
        setSummary(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await generateImpactSummary(filters, history);
        setSummary(result);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to generate summary';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    generate();
  }, [filters, history]);

  return { summary, loading, error };
};