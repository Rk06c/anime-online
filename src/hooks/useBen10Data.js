import { useQuery } from '@tanstack/react-query';
import ben10Data from '../data/ben10.json';

export const useBen10Data = () => {
  return useQuery({
    queryKey: ['ben10Data'],
    queryFn: () => ben10Data,
    staleTime: Infinity,
  });
};

