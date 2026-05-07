import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// For dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// To read
export const useAppSelector = useSelector.withTypes<RootState>()