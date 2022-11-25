import { createPortal } from 'react-dom';

export type PortalProps = {
  children: React.ReactNode;
};
const Portal: React.FC<PortalProps> = ({ children }) => {
  return createPortal(
    children,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Portal;
