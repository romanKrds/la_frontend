import {VocabularyItem} from "../interfaces/vocabularyItem.interface";
import {patchedFetch} from './http-utils'


export const getVocabularyList = (): Promise<VocabularyItem[]> => patchedFetch(`${process.env.REACT_APP_API_URL}/vocabulary/list`)
  .then(resp => resp.result)

export const getVocabularyStudiedList = (): Promise<VocabularyItem[]> => patchedFetch(`${process.env.REACT_APP_API_URL}/vocabulary/studied-list`)
  .then(resp => resp.result)

export const updateUserProgress = (vocabularyId: number, userId: number, isReview?: boolean): Promise<void> => patchedFetch(`${process.env.REACT_APP_API_URL}/vocabulary/user-progress`, {
  method: 'POST',
  body: JSON.stringify({vocabulary_id: vocabularyId, user_id: userId, is_review: isReview})
})
