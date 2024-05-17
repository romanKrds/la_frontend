import {VocabularyItem} from "../interfaces/vocabularyItem.interface";

const HEADERS: Record<string, string> = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': "1$H2uApwK9NTFQ7xKe$46b7b8dce432a0507e651a17e8f5b4311f6ef7407e38b1432078f1a0bcd930fcbc9cb6fa8b7a090b272526035b0baf2e3b8cc5f04b3be361ecacaf5d9ab0a9bd" // TODO: change to common auth flow
};

export const getVocabularyList = (): Promise<VocabularyItem[]> => fetch(`${process.env.REACT_APP_API_URL}/vocabulary/list`, {
  headers: HEADERS,
  credentials: 'include',
})
  .then(resp => resp.json())
  .then(resp => resp.result)
  .catch(err => err.error);

export const updateUserProgress = (vocabularyId: number, userId: number): Promise<void> => fetch(`${process.env.REACT_APP_API_URL}/vocabulary/user-progress`, {
  method: 'POST',
  headers: HEADERS,
  credentials: 'include',
  body: JSON.stringify({vocabulary_id: vocabularyId, user_id: userId})
})
  .then(resp => resp.json())
  .catch(err => err.error);
