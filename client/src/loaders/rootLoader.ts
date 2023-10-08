import { getCurrentUser } from '../apis';

export async function rootLoader() {
  return getCurrentUser();
}