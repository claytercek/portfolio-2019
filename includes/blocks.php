<?php

function hero_block()
{
    wp_register_script(
        'hero-block',
        get_template_directory_uri() . '/dist/blocks/hero/heroBlock.js',
        array('wp-blocks', 'wp-element')
    );

    register_block_type('claytercek/hero', array(
        'editor_script' => 'hero-block',
    ));
}
add_action('init', 'hero_block');
