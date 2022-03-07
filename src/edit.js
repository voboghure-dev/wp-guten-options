import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
	return (
		<p {...useBlockProps()}>
			{__(
				'Wp Guten Options – hello from the editor!',
				'wp-guten-options'
			)}
		</p>
	);
}
