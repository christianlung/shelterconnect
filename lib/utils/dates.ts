import { isValid, type Interval } from 'date-fns';

/**
 * Function that checks that the timeslot's start and end are each valid with start < end
 */
export function validateTimeSlot(timeSlot: Interval): boolean {
  return (
    isValid(timeSlot.start) &&
    isValid(timeSlot.end) &&
    timeSlot.start < timeSlot.end
  );
}
