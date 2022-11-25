import { useEffect, useState } from 'react';

function useModal(isShow = false) {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  useEffect(() => {
    if (isShow) {
      setIsShowing(isShow);
    }
  }, [isShow]);

  useEffect(() => {
    const html = document.querySelector('html');
    if (isShowing) {
      if (html) {
        html.style.top = `${-window.scrollY}px`;
        html?.classList.add('scroll-fixed');
      }
    } else {
      if (html?.classList.contains('scroll-fixed')) {
        const scrollTop = Math.abs(parseInt(html.style.top));
        html?.classList.remove('scroll-fixed');
        html.removeAttribute('style');
        window.scrollTo(0, scrollTop);
      }
    }
  }, [isShowing]);

  const handleShowModal = () => {
    setIsShowing(true);
  };

  const handleHideModal = () => {
    setIsShowing(false);
  };

  return {
    isShowing,
    showModal: handleShowModal,
    hideModal: handleHideModal,
  };
}

export default useModal;
