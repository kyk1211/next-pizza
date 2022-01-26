import ReactLoading from 'react-loading';

export default function Loading() {
  return (
    <ReactLoading
      type={'spin'}
      color={'blue'}
      height={300}
      width={300}
      delay={100}
    />
  );
}
