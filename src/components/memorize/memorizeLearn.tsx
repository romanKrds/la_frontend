/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import {getVocabularyList, updateUserProgress} from '../../query/memorize.query'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {VocabularyItem} from "../../interfaces/vocabularyItem.interface";
import {getColorById} from "../../utils";

interface WordProps {
  word: string | undefined;
}
const MemorizeLearn = () => {
  const [list, setList] = useState<VocabularyItem[]>([])
  const [activeItem, setActiveItem] = useState<VocabularyItem>()

  useEffect(() => {
    loadVocabularyList();
  }, []);

  useEffect(() => {
    setActive();
  }, [list]);

  const loadVocabularyList = () => {
    getVocabularyList()
      .then(list => {
        setList(list)
      })
  }

  const setActive = () => {
    if (!list.length) {
      loadVocabularyList();

      return;
    }

    setActiveItem(list[0]);
  }

  const truncateList = () => {
    // TODO: remove hardcoded user id
    updateProgress(activeItem!.id, 1);
    // TODO: show error in toast message
    setList(list => list.slice(1));
  }

  const updateProgress = (vocabularyId: number, userId: number): void => {
    updateUserProgress(vocabularyId, userId)
  }

  const Word = ({word}: WordProps) => {
    const color = getColorById(Math.ceil(Math.random() * 100));

    return (
      <p css={wordCSS} style={{['--word-color' as any]: color}}>{word}</p>
    )
  }

  return <>
    <div css={contentWrapperCSS}>

      <div css={contentCSS}>
      <div css={wordsWrapperCSS}>
          <Word word={activeItem?.word_1}/>
          <Word word={activeItem?.word_2}/>
        </div>

        <p css={sentenceCSS}>{activeItem?.sentence}</p>
      </div>

      <div css={actionsWrapperCSS}>
        <Button
          type="button"
          variant="text"
          endIcon={<ArrowForwardIcon/>}
          onClick={truncateList}
        >Next</Button>
      </div>
    </div>
  </>
}

export default MemorizeLearn

const contentWrapperCSS = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
})

const contentCSS = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly'
})

const wordsWrapperCSS = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  gap: '12px',
  fontSize: '2rem',
})

const wordCSS = css({
  color: 'var(--word-color)'
})

const sentenceCSS = css({
  fontSize: '1.5rem',
  color: 'grey',
  paddingLeft: '2rem'
})

const actionsWrapperCSS = css({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
  marginBottom: '24px'
})
