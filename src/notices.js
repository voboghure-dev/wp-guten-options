import { SnackbarList } from "@wordpress/components";

import { useDispatch, useSelect } from "@wordpress/data";

import { store as noticesStore } from "@wordpress/notices";

export default function Notices() {
	const notices = useSelect(
		(select) =>
			select(noticesStore)
				.getNotices()
				.filter((notice) => notice.type === "snackbar"),
		[]
	);
	const { removeNotice } = useDispatch(noticesStore);
	return (
		<SnackbarList
			className="edit-site-notices"
			notices={notices}
			onRemove={removeNotice}
		/>
	);
}
