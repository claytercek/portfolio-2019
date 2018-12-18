<?php

function acf_settings_path($path)
{
    $path = get_stylesheet_directory() . '/plugins/acf/';
    return $path;
}

function acf_settings_dir($dir)
{
    $dir = get_stylesheet_directory_uri() . '/plugins/acf/';
    return $dir;
}

/**
 * Show/Hide ACF fields on dashboard
 *
 * @return bool
 */
function acf_show_tab()
{
    if (getenv('WP_ENV') == 'production') {
        return false;
    } else {
        return true;
    }
}

add_filter('acf/settings/show_admin', 'acf_show_tab');
add_filter('acf/settings/path', 'acf_settings_path');
add_filter('acf/settings/dir', 'acf_settings_dir');

// Include ACF Plugin
include_once get_stylesheet_directory() . '/plugins/acf/acf.php';

// Include ACF Options Plugin
include_once get_stylesheet_directory() . '/plugins/acf-options-page/acf-options-page.php';
include_once get_stylesheet_directory() . '/plugins/acf-gallery/acf-gallery.php';


function my_acf_init() {
$api_key = get_field('google_api_key', 'options');
	acf_update_setting('google_api_key', $api_key);
}

add_action('acf/init', 'my_acf_init');

