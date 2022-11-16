import moment, { Moment } from 'moment';
import { Button, Calendar as AntdCalendar, Select } from 'antd';
import { useRecoilState } from 'recoil';
import { selectedDateState } from '../../recoil/workouts.recoil';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

  const handleSelect = (date: Moment) => {
    setSelectedDate(date);
  };
  return (
    <>
      <time
        className="text-lg font-bold"
        dateTime={selectedDate.format('YYYY-MM-DD')}
      >
        {selectedDate.format('YYYY.MM.DD')}
      </time>
      <AntdCalendar
        fullscreen={false}
        value={selectedDate}
        onSelect={handleSelect}
        headerRender={({ value, onChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];

          const current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current.month(i);
            months.push(localeData.monthsShort(current));
          }

          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>
            );
          }

          const year = value.year();
          const month = value.month();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>
            );
          }
          return (
            <div className="flex justify-between items-center p-2">
              <div>
                <Select
                  size="small"
                  dropdownMatchSelectWidth={false}
                  className="my-year-select"
                  value={year}
                  onChange={(newYear) => {
                    const now = value.clone().year(newYear);
                    onChange(now);
                  }}
                >
                  {options}
                </Select>
                <span className="px-1"></span>
                <Select
                  size="small"
                  dropdownMatchSelectWidth={false}
                  value={month}
                  onChange={(newMonth) => {
                    const now = value.clone().month(newMonth);
                    onChange(now);
                  }}
                >
                  {monthOptions}
                </Select>
              </div>
              <Button type="link" onClick={() => setSelectedDate(moment())}>
                Today
              </Button>
            </div>
          );
        }}
      />
    </>
  );
};

export default Calendar;
