import React, { useState, useEffect } from "react";

export interface Props { year: number; month: number }
export interface Date { dayWord: string; dayNumber: number; showDate: number }


const Calendar: React.FC<Props> = props => {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const initialMonthData: { weeks: any[]; month: number; year: number; } = {
        weeks: [],
        month: 1,
        year: 2020
    };

    const [monthData, setMonthData] = useState(initialMonthData);

    useEffect(() => {
        const newMonthData = getMonthData(props.year, props.month);
        setMonthData(newMonthData)
    }, []);


    const getMonthData = (year: number, month: number) => {

        let styleCls = '';

        const weeks = [];
        const todaysDate = new Date().getDate();
        const firstDay = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0);
        const lastDate = lastDay.getDate();
        let firstDayWeekDay = firstDay.getDay();
        const preMonthDayCount = firstDayWeekDay - 1;
        const numberOfWeeks = weekCount(firstDay, lastDay, firstDay.getDay())

        let tempWeek = [];

        for (let i = 0; i < 7 * numberOfWeeks; i++) {

            const date = i - preMonthDayCount;

            let showDate = 0;
            let thisMonth = month;

            if (date <= 0) {
                thisMonth = month - 1;
                styleCls = 'hidden-cell';

            } else if (date > lastDate) {
                thisMonth = month + 1;
                styleCls = 'hidden-cell';
            } else {

                showDate = date;
                if (showDate === todaysDate) {
                    styleCls = 'selected-date';
                } else {
                    styleCls = 'normal-date';
                }
            }

            tempWeek.push({
                month: thisMonth,
                date,
                showDate: date,
                year,
                styleCls
            });

            if ((((i + 1) % 7 == 0) && i !== 0) || (i === (7 * numberOfWeeks) - 1)) {
                weeks.push(tempWeek);
                tempWeek = [];
            }
        }

        return {
            year,
            month,
            weeks: weeks
        };
    }

    const weekCount = (firstDay: any, lastDay: any, startDayOfWeek: number) => {
        var firstDayOfWeek = startDayOfWeek || 0;
        var numberOfDaysInMonth = lastDay.getDate();
        var firstWeekDay = (firstDay.getDay() - firstDayOfWeek + 7) % 7;
        var used = firstWeekDay + numberOfDaysInMonth;

        return Math.ceil(used / 7);
    }


    return (
        <div>
            <div className="calendar-heading">
                {months[props.month - 1]} {props.year}
            </div>
            <table className="">
                <thead>
                    <tr>
                        <th>Su</th>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                    </tr>
                </thead>
                <tbody>
                    {monthData.weeks.map((week, index) => {
                        return <tr key={index}>
                            {week.map((day: any, index: number) => {
                                return <th key={index} className={day.styleCls}> {day.showDate} </th>
                            })}
                        </tr>
                    })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default Calendar;