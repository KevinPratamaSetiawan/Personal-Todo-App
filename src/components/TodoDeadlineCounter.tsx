type TodoDeadlineCounterProps = {
    scheduleType: string;
    deadlineStartDate: string;
    deadlineEndDate: string;
    deadlineStartTime: string;
    deadlineEndTime: string;
    isToday: boolean;
};

export default function TodoDeadlineCounter({ scheduleType, deadlineStartDate, deadlineEndDate, deadlineStartTime, deadlineEndTime, isToday }: TodoDeadlineCounterProps) {
    const now = Date.now();
    const today = new Date().toISOString().split('T')[0]; // "2025-01-15"

    let deadlineStart, deadlineEnd;

    switch (scheduleType) {
        case '[D]': // Daily - repeats every day
            deadlineStart = new Date(`${today}T${deadlineStartTime}:00`).getTime();
            deadlineEnd = new Date(`${today}T${deadlineEndTime}:00`).getTime();
            break;

        case '[W]': // Weekly - repeats every week (same day)
            deadlineStart = new Date(`${today}T${deadlineStartTime}:00`).getTime();
            deadlineEnd = new Date(`${today}T${deadlineEndTime}:00`).getTime();
            break;

        case '[Y]': // Yearly - repeats every year (same date)
            // Use stored date but replace year with current year
            const storedDate = new Date(deadlineStartDate);
            const currentYear = new Date().getFullYear();
            const yearlyDate = `${currentYear}-${String(storedDate.getMonth() + 1).padStart(2, '0')}-${String(storedDate.getDate()).padStart(2, '0')}`;
            deadlineStart = new Date(`${yearlyDate}T${deadlineStartTime}:00`).getTime();
            deadlineEnd = new Date(`${yearlyDate}T${deadlineEndTime}:00`).getTime();
            break;

        case '[S]': // Scheduled - specific date range
        case 'custom': // Custom - same as scheduled but custom label
            deadlineStart = new Date(`${deadlineStartDate}T${deadlineStartTime}:00`).getTime();
            deadlineEnd = new Date(`${deadlineEndDate}T${deadlineEndTime}:00`).getTime();
            break;

        case '[A]': // Assignment - single deadline
            deadlineStart = new Date(`${deadlineStartDate}T${deadlineStartTime}:00`).getTime();
            deadlineEnd = deadlineStart; // No end time
            break;

        default: // None or unknown
            deadlineStart = new Date(`${deadlineStartDate}T${deadlineStartTime}:00`).getTime();
            deadlineEnd = new Date(`${deadlineEndDate}T${deadlineEndTime}:00`).getTime();
    }

    let msGap = 0, secondsLeft = 0, daysLeft = 0, hoursLeft = 0, minutesLeft = 0, secondsLeftRemaining = 0;
    let opening = '';
    let closing = '';

    if (isToday || scheduleType === '[A]') {
        if (now < deadlineStart) {
            // Before start time
            msGap = deadlineStart - now;
            opening = scheduleType === '[A]' ? 'due in ' : 'starts in ';
        } else if (now > deadlineEnd) {
            // After end time
            msGap = now - deadlineEnd;
            if (scheduleType === '[A]') {
                opening = 'overdue by ';
                closing = '';
            } else {
                opening = 'finished ';
                closing = ' ago';
            }
        } else {
            // Between start and end (in progress)
            msGap = deadlineEnd - now;
            opening = 'ends in ';
        }

        secondsLeft = Math.floor(msGap / 1000);
        daysLeft = Math.floor(secondsLeft / 86400);
        hoursLeft = Math.floor((secondsLeft % 86400) / 3600);
        minutesLeft = Math.floor((secondsLeft % 3600) / 60);
        secondsLeftRemaining = secondsLeft % 60;
    }

    return (
        <p className='todo-deadline-counter'>
            {opening}
            {daysLeft > 0 && <><span className="display-number">{daysLeft.toString().padStart(2, '0')}</span><span>d : </span></>}
            <span className="display-number">{hoursLeft.toString().padStart(2, '0')}</span><span>h : </span>
            <span className="display-number">{minutesLeft.toString().padStart(2, '0')}</span><span>m : </span>
            <span className="display-number">{secondsLeftRemaining.toString().padStart(2, '0')}</span><span>s</span>
            {closing}
        </p>
    );
};