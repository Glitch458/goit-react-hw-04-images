import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Oval
      wrapperStyle={{ justifyContent: 'center' }}
      height="80"
      width="80"
      radius="2"
      color="green"
      ariaLabel="tail-spin-loading"
    />
  );
};

export default Loader;
