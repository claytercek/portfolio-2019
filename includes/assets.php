<?php
/**
 *
 * wp_enqueue_scripts is the proper hook to use when
 * enqueuing items that are meant to appear on
 * the front end. Despite the name, it is used for
 * enqueuing both scripts and styles.
 * @method enqueue_assets
 *
 */

function enqueue_assets()
{
    wp_enqueue_style('custom_css', get_template_directory_uri() . '/dist/css/main.css', [], null, false);
    wp_enqueue_script('custom_js', get_template_directory_uri() . '/dist/js/script.js', array('jquery'), null, true);
    wp_localize_script( 'custom_js', 'my_ajax_object',
            array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
}
add_action('wp_enqueue_scripts', 'enqueue_assets');
