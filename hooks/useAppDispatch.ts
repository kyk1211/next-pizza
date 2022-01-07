import { useDispatch } from 'react-redux';
import { AppDispatch } from 'slice/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
