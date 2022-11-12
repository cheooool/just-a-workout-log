import { useRecoilState } from 'recoil';
import { exerciseModalState } from '../recoil/exercise.recoil';

function useExerciseModalWithRecoil() {
  const [showing, setShowing] = useRecoilState(exerciseModalState);

  // 모달 열기
  const showModal = (modalName: typeof showing) => {
    setShowing(modalName);
  };

  // 모달 닫기
  const hideModal = () => {
    setShowing(null);
  };

  return {
    showing,
    showModal,
    hideModal,
  };
}

export default useExerciseModalWithRecoil;
