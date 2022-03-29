<?php
/**
 * Plugin Name:       WP Guten Options
 * Description:       Example of option page and customizer with Gutenberg block
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            voboghure
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

/**
 * Register settings field for gutenberg api, so that it should be show_in_rest true
 */
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

	register_setting(
    'wp_guten_options_settings',
    'wp_guten_options_logo',
    [
      'default'      => '',
      'show_in_rest' => true,
      'type'         => 'string',
    ]
  );

  register_setting(
    'wp_guten_customizer_settings',
    'wp_guten_customizer_text_2',
    [
      'default'      => '',
      'show_in_rest' => true,
      'type'         => 'string',
    ]
  );

  register_setting(
    'wp_guten_customizer_settings',
    'wp_guten_customizer_toggle',
    [
      'default'      => '',
      'show_in_rest' => true,
      'type'         => 'string',
    ]
  );
}

add_action( 'init', 'wp_guten_options_register_settings', 10 );

/**
 * Add admin menu page under Settings menu
 */
function wp_guten_options_settings_page() {
  add_options_page(
    __( 'Guten Options Settings', 'wp-guten-options' ),
    __( 'Guten Options Settings', 'wp-guten-options' ),
    'manage_options',
    'wp_guten_options_settings',
    function () {
      echo '<div id="wp-guten-options-settings"></div>';
    },
  );
}

add_action( 'admin_menu', 'wp_guten_options_settings_page', 10 );

/**
 * Enqueue js, css and generated php file
 * (which will automatically add all of the WordPress block
 * editor i.e. Gutenberg dependancies for our admin script)
 */
function wp_guten_options_admin_scripts() {
  $dir = __DIR__;

  $script_asset_path = "$dir/build/admin.asset.php";
  if ( ! file_exists( $script_asset_path ) ) {
    throw new Error(
      'You need to run `npm start` or `npm run build` for the "create-block/wp-guten-options" block first.'
    );
  }
  $admin_js     = 'build/admin.js';
  $script_asset = require $script_asset_path;
  wp_enqueue_script(
    'wp-guten-options-admin-editor',
    plugins_url( $admin_js, __FILE__ ),
    $script_asset['dependencies'],
    $script_asset['version']
  );
  wp_set_script_translations( 'wp-guten-options-admin-editor', 'wp-guten-options' );

  $admin_css = 'build/admin.css';
  wp_enqueue_style(
    'wp-guten-options-admin',
    plugins_url( $admin_css, __FILE__ ),
    ['wp-components'],
    filemtime( "$dir/$admin_css" )
  );
}

add_action( 'admin_enqueue_scripts', 'wp_guten_options_admin_scripts', 10 );

/**
 * Extend customizer and place root div for gutenberg
 */
function wp_guten_customizer_register( $wp_customize ) {

  class WP_Guten_Customizer_Control extends WP_Customize_Control {

    public $type = 'wp-guten-customizer-control';

    public function render_content() {}

    public function content_template() {
      echo '<div id="wp-guten-customizer"></div>';
    }

  }

  $wp_customize->register_control_type( 'WP_Guten_Customizer_Control' );

  // Register customizer settings
  // We can get this with get_theme_mod
  $wp_customize->add_setting( 'wp_guten_customizer_select' );
  $wp_customize->add_setting( 'wp_guten_customizer_text' );
  // We can get this with get_option (We need to register with
  // register_settings and show_in_rest need to keep true so we can access this via gutenberg)
  $wp_customize->add_setting( 'wp_guten_customizer_text_2', ['type' => 'option'] );
  $wp_customize->add_setting( 'wp_guten_customizer_toggle', ['type' => 'option'] );

}

add_action( 'customize_register', 'wp_guten_customizer_register', 10 );

/**
 * Enqueue js, css and generated php file
 * (which will automatically add all of the WordPress block
 * editor i.e. Gutenberg dependancies for our customizer)
 */
function wp_guten_customizer_scripts() {
  $dir = __DIR__;

  $script_asset_path = "$dir/build/customizer.asset.php";
  if ( ! file_exists( $script_asset_path ) ) {
    throw new Error(
      'You need to run `npm start` or `npm run build` for the "create-block/wp-guten-options" block first.'
    );
  }
  $customizer_js = 'build/customizer.js';
  $script_asset  = require $script_asset_path;
  wp_enqueue_script(
    'wp-guten-customizer-editor',
    plugins_url( $customizer_js, __FILE__ ),
    $script_asset['dependencies'],
    $script_asset['version']
  );
  wp_set_script_translations( 'wp-guten-customizer-editor', 'wp-guten-options' );

  wp_localize_script(
    'wp-guten-customizer-editor',
    'WPGutenCustomizer',
    [
      'wp_guten_customizer_select' => get_theme_mod( 'wp_guten_customizer_select', '' ),
      'wp_guten_customizer_text'   => get_theme_mod( 'wp_guten_customizer_text', '' ),
    ]
  );

  $customizer_css = 'build/customizer.css';
  wp_enqueue_style(
    'wp-guten-customizer',
    plugins_url( $customizer_css, __FILE__ ),
    ['wp-components'],
    filemtime( "$dir/$customizer_css" )
  );
}

add_action( 'customize_controls_enqueue_scripts', 'wp_guten_customizer_scripts', 10 );

/**
 * Add settings link to plugin page
 */
function wp_guten_options_settings_link( $links ): array{
  $label = esc_html__( 'Settings', 'wp-guten-options' );
  $slug  = 'wp_guten_options_settings';

  array_unshift( $links, "<a href='options-general.php?page=$slug'>$label</a>" );

  return $links;
}

add_action( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'wp_guten_options_settings_link', 10 );
