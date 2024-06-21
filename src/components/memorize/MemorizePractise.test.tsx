import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MemorizePractise from "./memorizePractise";
// import { VocabularyStudiedItem, Answer } from './memorizePractise';

describe('MemorizePractise', () => {

  test('should render component without crashing', () => {
    render(<MemorizePractise/>);

    expect(screen.getByText('Check')).toBeDefined();
    expect(screen.getByText('Next')).toBeDefined();
  });

  test('should update progress when answer is correct', () => {
    const mockUpdateUserProgress = jest.fn();
    // Assuming updateUserProgress is an import, you can mock it like this
    jest.mock('./api', () => ({
      updateUserProgress: mockUpdateUserProgress,
    }));

    const { getByText } = render(<MemorizePractise />);

    const checkButton = getByText('Check');

    expect(mockUpdateUserProgress).not.toHaveBeenCalled();

    fireEvent.click(checkButton); // or whatever event triggers the updateProgress function

    expect(mockUpdateUserProgress).toHaveBeenCalled();
  });

  test('should not invoke update progress function when answer is incorrect', () => {
    // Set up the app state so that the answer is incorrect.
    // This will depend on your Redux state handling, which is not provided in the initial code.
    
    const mockUpdateUserProgress = jest.fn();
    jest.mock('./api', () => ({
      updateUserProgress: mockUpdateUserProgress,
    }));

    const { getByText } = render(<MemorizePractise />);

    const checkButton = getByText('Check');

    expect(mockUpdateUserProgress).not.toHaveBeenCalled();

    fireEvent.click(checkButton); // or whatever event triggers the updateProgress function

    expect(mockUpdateUserProgress).not.toHaveBeenCalled();
  });

  // similar tests can be written for other functionalities like 
  // checkAnswer, onToggleAnswer, truncateVocabyList and so on
});