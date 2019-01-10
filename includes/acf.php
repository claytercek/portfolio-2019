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

function my_acf_json_save_point( $path ) {
    // update path
    $path = get_stylesheet_directory() . '/plugins/acf-json';
    // return
    return $path;
    
}
function my_acf_json_load_point( $paths ) {
    
    // remove original path (optional)
    unset($paths[0]);
    // append path
    $paths[] = get_stylesheet_directory() . '/plugins/acf-json';
    // return
    return $paths;
    
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

add_filter( 'acf/settings/save_json', 'my_acf_json_save_point');
add_filter( 'acf/settings/load_json', 'my_acf_json_load_point');

add_filter('acf/settings/show_admin', 'acf_show_tab');
add_filter('acf/settings/path', 'acf_settings_path');
add_filter('acf/settings/dir', 'acf_settings_dir');

 
add_filter('acf/settings/save_json', 'my_acf_json_save_point');
 




// Include ACF Plugin
include_once get_stylesheet_directory() . '/plugins/acf/acf.php';

// Include ACF Options Plugin
include_once get_stylesheet_directory() . '/plugins/acf-options-page/acf-options-page.php';
