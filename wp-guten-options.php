<?php
/**
 * Plugin Name:       Wp Guten Options
 * Description:       Example static block scaffolded with Create Block tool.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp-guten-options
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function wp_guten_options_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'wp_guten_options_block_init' );

function wp_guten_options_register_settings() {
	register_setting(
			'wp_guten_options_settings',
			'wp_guten_options_select',
			[
					'default'      => '',
					'show_in_rest' => true,
					'type'         => 'string',
			]
	);

	register_setting(
			'wp_guten_options_settings',
			'wp_guten_options_text',
			[
					'default'      => '',
					'show_in_rest' => true,
					'type'         => 'string',
			]
	);

	register_setting(
			'wp_guten_options_settings',
			'wp_guten_options_text_2',
			[
					'default'      => '',
					'show_in_rest' => true,
					'type'         => 'string',
			]
	);

	register_setting(
			'wp_guten_options_settings',
			'wp_guten_options_text_3',
			[
					'default'      => '',
					'show_in_rest' => true,
					'type'         => 'string',
			]
	);

	register_setting(
			'wp_guten_options_settings',
			'wp_guten_options_toggle',
			[
					'default'      => '',
					'show_in_rest' => true,
					'type'         => 'string',
			]
	);
}
add_action( 'init', 'wp_guten_options_register_settings', 10 );

function wp_guten_options_settings_page() {
	add_options_page(
			__( 'Guten Options Settings', 'wp-guten-options' ),
			__( 'Guten Options Settings', 'wp-guten-options' ),
			'manage_options',
			'wholesome_plugin_settings',
			function() {
					?>
					<div id="wp-guten-options-settings"></div>
					<?php
			},
	);
}
add_action( 'admin_menu', 'wp_guten_options_settings_page', 10 );
