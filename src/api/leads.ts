import { AdminLeadListResponse } from '@/types';
import { adminFetch } from './client';

export const listLeads = (query: string): Promise<AdminLeadListResponse> => {
  return adminFetch<AdminLeadListResponse>(`/api/admin/leads${query}`);
};

export const deleteLead = (id: string): Promise<{ ok: true }> => {
  return adminFetch<{ ok: true }>(`/api/admin/leads/${id}`, {
    method: 'DELETE',
  });
};
