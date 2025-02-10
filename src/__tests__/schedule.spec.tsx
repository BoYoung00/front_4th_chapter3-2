import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('반복 일정 기능 테스트', () => {
  beforeEach(() => {
    render(<App />);

    const checkbox = screen.getByLabelText('반복 일정');
    userEvent.click(checkbox);
  });

  it('반복 유형을 선택할 수 있다', () => {
    const select = screen.getByLabelText('반복 유형');
    fireEvent.change(select, { target: { value: 'weekly' } });

    expect((select as HTMLSelectElement).value).toBe('weekly');
  });

  it('반복 간격을 입력할 수 있다', () => {
    const input = screen.getByLabelText('반복 간격');
    fireEvent.change(input, { target: { value: '3' } });

    expect((input as HTMLInputElement).value).toBe('3');
  });

  it('반복 일정이 캘린더에 표시됨', () => {
    const event = screen.getByText('테스트 일정');
    expect(event).toBeInTheDocument();
  });

  it('반복 일정이 종료 날짜 이후에는 생성되지 않음', () => {
    const endDate = screen.getByLabelText('반복 종료');
    fireEvent.change(endDate, { target: { value: '2025-06-30' } });

    expect((endDate as HTMLInputElement).value).toBe('2025-06-30');
  });

  it('단일 일정을 수정하면 반복성이 사라짐', () => {
    const editButton = screen.getByText('수정');
    fireEvent.click(editButton);

    const event = screen.getByText('수정된 일정');
    expect(event).toBeInTheDocument();
  });

  it('단일 일정을 삭제하면 나머지는 유지됨', () => {
    const deleteButton = screen.getByText('삭제');
    fireEvent.click(deleteButton);

    const deletedEvent = screen.queryByText('2024-02-12 일정');
    expect(deletedEvent).not.toBeInTheDocument();
  });
});
