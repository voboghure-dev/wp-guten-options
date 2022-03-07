import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<p {...useBlockProps.save()}>
			{__(
				'Wp Guten Options – hello from the saved content!',
				'wp-guten-options'
			)}
		</p>
	);
}
