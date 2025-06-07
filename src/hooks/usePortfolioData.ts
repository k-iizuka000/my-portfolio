"use client";

import { useState, useEffect } from 'react';
import { PortfolioData } from '../types';

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const basePath = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';
        const response = await fetch(`${basePath}/data/portfolio.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};