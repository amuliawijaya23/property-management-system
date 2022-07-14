import { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { setDefault, setTableRows } from '../../../state/reducers/tableReducer';

import { updateContactsData } from '../../../state/reducers/app';

import axios from 'axios';

const columns = [
	{
		id: 'id',
		numeric: false,
		disablePadding: false,
		label: 'ID'
	},
	{
		id: 'agent',
		numeric: true,
		disablePadding: false,
		label: 'Agent'
	},
	{
		id: 'name',
		numeric: true,
		disablePadding: false,
		label: 'Name'
	},
	{
		id: 'email',
		numeric: true,
		disablePadding: false,
		label: 'Email'
	},
	{
		id: 'mobile',
		numeric: true,
		disablePadding: false,
		label: 'Mobile'
	}
];

export default function usePropertiesData() {
	const app = useSelector((state) => state.app.value);
	const table = useSelector((state) => state.table.value);

	const dispatch = useDispatch();

	const rows = useMemo(() => {
		return app.contacts?.map((contact) => {
			const agent = app.agents?.find((agent) => agent?.user_id === contact?.agent_id);
			return {
				id: contact?.id,
				name: `${contact.first_name} ${contact.last_name}`,
				email: contact?.email,
				mobile: contact?.mobile,
				agent: agent?.picture
			};
		});
	}, [app.contacts, app.agents]);

	const edit = useMemo(
		() => ({
			seller_id: app.agents.map((agent) => agent?.name)
		}),
		[app.agents]
	);

	const initialize = useCallback(async () => {
		await dispatch(
			setDefault({
				columns: columns,
				rows: rows,
				selected: [],
				edit: edit,
				type: 'contacts'
			})
		);
	}, [edit, rows, dispatch]);

	useEffect(() => {
		initialize();
	}, [initialize]);
}
