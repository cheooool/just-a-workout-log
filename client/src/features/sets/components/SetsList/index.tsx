import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { getSetsByDateFn } from '../../../../api/setsApi';
import { selectFormattedDate } from '../../../workout/recoil/workouts.recoil';
import SetsItem from '../SetsItem';

const SetsList = () => {
  const formattedDate = useRecoilValue(selectFormattedDate);
  const { isLoading, data: sets } = useQuery(
    ['sets', formattedDate],
    () => getSetsByDateFn({ workoutDate: formattedDate }),
    {
      select: (data) => data.data,
      onSuccess: () => {
        console.log('Success sets query');
      },
      onError: () => {
        console.log('Error sets query');
      },
    }
  );

  if (isLoading) {
    return <div>운동 목록 불러오는 중...</div>;
  }

  if (!sets?.length) {
    return <div>운동 목록이 없습니다.</div>;
  }

  return (
    <>
      {sets.map((setsItem, index) => {
        return <SetsItem key={index} data={setsItem} />;
      })}
    </>
  );
};

export default SetsList;
