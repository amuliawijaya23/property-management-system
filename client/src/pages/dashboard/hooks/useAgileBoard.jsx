import axios from 'axios';
import { useState, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setBoardProperties } from '../../../state/reducers/dashboardReducer';

export const useAgileBoard = () => {
	const user = useSelector((state) => state.dashboard.value.user);
	const dispatch = useDispatch();

	const getBoardProperties = useCallback(() => {}, []);
};
