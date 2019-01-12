<?php

// WordPress Version Check
if (version_compare($GLOBALS['wp_version'], '4.8.2', '<')) {
    die('This theme only works in WordPress 4.8.2 or later. Please upgrade your WordPress');
}

require_once get_parent_theme_file_path('/vendor/autoload.php');

// Plugins
require get_parent_theme_file_path('includes/timber.php');
require get_parent_theme_file_path('includes/acf.php');

// Theme
require get_parent_theme_file_path('includes/assets.php');
require get_parent_theme_file_path('includes/post-types.php');
require get_parent_theme_file_path('includes/forms.php');

function register_menus()
{
    register_nav_menu('primary-menu', __('Main Menu'));
    register_nav_menu('secondary-menu', __('Secondary Menu'));
    register_nav_menu('social-menu', __('Social Links'));
}
add_action('init', 'register_menus');

add_theme_support('post-thumbnails');
