import { validateTimeSlot } from './dates';
import { addDays, subDays } from 'date-fns';

describe(validateTimeSlot, () => {
  const now = new Date();

  it('should return true when start is before end', () => {
    const timeSlot = {
      start: now,
      end: addDays(now, 1),
    };

    expect(validateTimeSlot(timeSlot)).toBe(true);
  });

  it('should return false when end is before start', () => {
    const timeSlot = {
      start: now,
      end: subDays(now, 1),
    };

    expect(validateTimeSlot(timeSlot)).toBe(false);
  });

  it('should return false when start is invalid', () => {
    const timeSlot = {
      start: new Date('invalid date'),
      end: now,
    };

    expect(validateTimeSlot(timeSlot)).toBe(false);
  });

  it('should return false when end is invalid', () => {
    const timeSlot = {
      start: now,
      end: new Date('invalid date'),
    };

    expect(validateTimeSlot(timeSlot)).toBe(false);
  });
});
