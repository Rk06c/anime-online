import { useQuery } from '@tanstack/react-query';
import ben10Data from '../data/ben10.json';
import comingSoonData from '../data/useComingUp.json';
import movie1 from '../data/movie1.json'

export const useBen10Data = () => {
  return useQuery({
    queryKey: ['ben10Data'],
    queryFn: () => ben10Data,
    staleTime: Infinity,
  });
};

export const useComingSoonData = () => {
  return useQuery({
    queryKey: ['comingSoonData'],
    queryFn: () => comingSoonData,
    staleTime: Infinity,
  });
};

export const useMovie1Data = () => {
  return useQuery({
    queryKey: ['movie1Data'],
    queryFn: () => movie1,
    staleTime: Infinity,
  });
}