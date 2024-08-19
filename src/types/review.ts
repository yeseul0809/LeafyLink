import { Tables, TablesInsert } from './supabase';

export type Review = Tables<'Review'>;
export type ReviewInput = TablesInsert<'Review'>;
