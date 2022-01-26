import ReactLoading from 'react-loading';

export default function Loading() {
  return (
    <ReactLoading
      type={'spin'}
      color={'blue'}
      height={50}
      width={50}
      delay={100}
    />
  );
}
