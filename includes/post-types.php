<?php
/** This is where you can register custom post types. */
function register_post_types()
{
    register_post_type(
        'videos',
        [
            'labels' => [
                'name' => _x('Videos', 'post type general name'),
                'singular_name' => _x('Video', 'post type singular name'),
                'add_new' => _x('Add New', 'video'),
                'add_new_item' => __('Add New video'),
                'edit_item' => __('Edit video'),
                'new_item' => __('New video'),
                'all_items' => __('All videos'),
                'view_item' => __('View video'),
                'search_items' => __('Search videos'),
                'not_found' => __('No videos found'),
                'not_found_in_trash' => __('No videos found in the Trash'),
                'menu_name' => 'Videos',
            ],
            'description' => 'Holds our videos and video specific data',
            'public' => true,
            'menu_position' => 6,
            'menu_icon' => 'dashicons-video-alt',
            'supports' => array('title', 'editor'),
            'has_archive' => true,
            'show_in_nav_menus' => true,
            'show_in_menu' => true,
        ]
    );
}

add_action('init', 'register_post_types');

// Change dashboard Posts to News
function cp_change_post_object()
{
    $get_post_type = get_post_type_object('post');
    $labels = $get_post_type->labels;
    $labels->name = 'Projects';
    $labels->singular_name = 'Project';
    $labels->add_new = 'Add Projects';
    $labels->add_new_item = 'Add Projects';
    $labels->edit_item = 'Edit Projects';
    $labels->new_item = 'Projects';
    $labels->view_item = 'View Projects';
    $labels->search_items = 'Search Projects';
    $labels->not_found = 'No Projects found';
    $labels->not_found_in_trash = 'No Projects found in Trash';
    $labels->all_items = 'All Projects';
    $labels->menu_name = 'Projects';
    $labels->name_admin_bar = 'Projects';
    $get_post_type->menu_icon = 'dashicons-art';
}

add_action('init', 'cp_change_post_object');
