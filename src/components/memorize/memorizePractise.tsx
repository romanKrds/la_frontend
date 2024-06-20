/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Chip, Icon } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { difference } from 'lodash';
import React, { useEffect, useState } from "react";
import { useError } from "../../context/errorContext";
import { useUser } from "../../context/userContext";
import { VocabularyItem } from "../../interfaces/vocabularyItem.interface";
import { getVocabularyStudiedList, updateUserProgress } from "../../query/memorize.query";
import { randomNumber, shuffleArray } from "../../utils";

interface Answer {
  id: number;
  label: string;
  isSelected: boolean;
}

interface VocabularyStudiedItem extends VocabularyItem {
  challenge: string
}

const MESSAGE_SUCCESS = 'Correct!';
const MESSAGE_FAILURE = 'Wrong answer. You can retry or skip this sentence.';

const MemorizePractise = () => {
  const [vocabyList, setVocabyList] = useState<VocabularyStudiedItem[]>([])
  const [answerVariants, setAnswerVariants] = useState<string[]>([])
  const [answers, setAnswers] = useState<Answer[]>([])
  const [activeItem, setActiveItem] = useState<VocabularyStudiedItem>()
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [hasItemsForReview, setHasItemsForReview] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);
  const {showError} = useError();
  const {user} = useUser();

  useEffect(() => {
    setActive();
  }, [vocabyList]);

  useEffect(() => {
    setChipElements();
  }, [activeItem]);

  const getRandomAnswer = (exceptions: string[]): string => {
    const optionsArr = difference(answerVariants, exceptions);
    const randomPosition = randomNumber(optionsArr.length - 1);

    return optionsArr[randomPosition];
  }

  const setActive = () => {
    if (!vocabyList.length && hasItemsForReview) {
      loadVocabularyList();

      return;
    }

    setActiveItem(vocabyList[0]);
  }

  const setChipElements = () => {
    if (!activeItem) return

    const correctAnswers = [activeItem.word_1, activeItem.word_2];
    const answers: Answer[] = shuffleArray<string>([...correctAnswers, getRandomAnswer(correctAnswers), getRandomAnswer(correctAnswers)])
      .map((answer, index) => ({
        id: index,
        label: answer,
        isSelected: false,
      }));

    setAnswers(answers)
  }

  const loadVocabularyList = () => {
    getVocabularyStudiedList()
      .then(list => {
        setHasItemsForReview(!!list.length);

        const listForReview = list.map(item => {
          const transformedItem: VocabularyStudiedItem = {
            ...item,
            challenge: item.sentence.replace(item.word_1, '_____').replace(item.word_2, '_____')
          };

          return transformedItem;
        })

        setVocabyList(listForReview)
        setAnswerVariants(listForReview.map(item => ([item.word_1, item.word_2])).flat())
      })
      .catch(err => {
        if (typeof err === 'string') {
          showError(err);
        }
      })
  }

  const updateProgress = (vocabularyId: number, userId: number): void => {
    updateUserProgress(vocabularyId, userId, true)
      .catch(err => {
        showError(err.error)
      })
  }

  const truncateVocabyList = () => {
    setVocabyList(list => list.slice(1));
  }

  const checkAnswer = (): void => {
    const expectedAnswer = [activeItem?.word_1, activeItem?.word_2];

    const selectedAnswers = answers
      .filter(answer => answer.isSelected)
      .map(answer => answer.label);

    const sameSize = expectedAnswer.length === selectedAnswers.length;
    const allRequiredSelected = selectedAnswers.every(label => expectedAnswer.includes(label));
    const isValid = sameSize && allRequiredSelected;

    setMessage(isValid ? MESSAGE_SUCCESS : MESSAGE_FAILURE);
    setIsAnswerCorrect(isValid);

    if (isValid) {
      updateProgress(activeItem!.id, user!.id);
    }
  }


  const onSubmit = () => {
    if (!isAnswerCorrect) return

    truncateVocabyList();
    setMessage(null)
    setIsAnswerCorrect(false)
  }

  const onToggleAnswer = (id: number) => {
    setAnswers(answers =>
      answers.map(answer =>
        answer.id === id
          ? {
            ...answer,
            isSelected: !answer.isSelected
          }
          : answer
      )
    )
  };

  const Warning = () => <>
    <div css={warningCSS}>
      <p>No items for review, please memorize some words first.</p>
    </div>
  </>

  const Review = () => <>
    <div css={contentWrapperCSS}>

      <div css={contentCSS}>
        <p css={sentenceCSS}>
          {isAnswerCorrect ? activeItem?.sentence : activeItem?.challenge}
        </p>

        <div css={wordsWrapperCSS}>
          {
            answers.map(({id, label, isSelected}) =>
              <Chip variant={isSelected ? 'filled' : 'outlined'} key={id} label={label}
                    onClick={() => onToggleAnswer(id)}/>
            )
          }
        </div>

        <div css={messageWrapperCSS}>
          {
            message &&
              <>
                  <Icon
                      css={{...messageIconCSS.common, ...(isAnswerCorrect ? messageIconCSS.success : messageIconCSS.failure)}}
                      component={isAnswerCorrect ? CheckCircleOutlineIcon : ErrorOutlineIcon}></Icon>

                  <p>{message}</p>
              </>
          }
        </div>
      </div>

      <Grid container css={actionsWrapperCSS}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} container justifyContent="center">
          <Button
            type="button"
            variant="text"
            disabled={isAnswerCorrect}
            onClick={checkAnswer}
          >
            Check
          </Button>
        </Grid>
        <Grid item xs={4} container justifyContent="end">
          <Button
            type="button"
            variant="text"
            disabled={!isAnswerCorrect}
            endIcon={<ArrowForwardIcon/>}
            onClick={onSubmit}
          >Next</Button>
        </Grid>
      </Grid>
    </div>
  </>

  return <>
    {
      activeItem && hasItemsForReview
        ? <Review/>
        : <Warning/>
    }
  </>
}

export default MemorizePractise

const warningCSS = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  fontSize: '1.5rem',
  lineHeight: '2.5rem',
  color: 'grey',
  textAlign: 'center'
})

const contentWrapperCSS = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
})

const contentCSS = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly'
})

const wordsWrapperCSS = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '24px',
  div: {
    fontSize: '24px',
    padding: '0 12px',
    height: '40px'
  }
})

const sentenceCSS = css({
  fontSize: '1.5rem',
  lineHeight: '2.5rem',
  color: 'grey',
  textAlign: 'center',
})

const messageWrapperCSS = css({
  width: '100%',
  minHeight: '120px',
  display: 'flex',
  alignItems: "center",
  justifyContent: "center",
  gap: '8px',
  p: {
    fontSize: '1.5rem',
  }
})

const messageIconCSS = {
  common: {
    fontSize: '4rem',
  },
  success: {
    color: "#0080007a"
  },
  failure: {
    color: "#ff01017a"
  },
}

const actionsWrapperCSS = css({
  marginBottom: '24px'
})
