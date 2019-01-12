<?php
$timber = new \Timber\Timber();

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = ['templates/views', 'templates/components', 'templates/objects'];

function add_menus_to_context($context)
{
    // Loop through all of the register_my_menus and add it to the timber
    foreach (get_registered_nav_menus() as $k => $v) {
        $context[$k] = new TimberMenu($k);
    }
    return $context;
}

    /** This is where you add some context
     *
     * @param string $context context['this'] Being the Twig's {{ this }}.
     */
     function add_to_context($context)
     {
         $context['menuPrimary'] = new \Timber\Menu('primary-menu');
         $context['menuSecondary'] = new \Timber\Menu('secondary-menu');
         $context['menuSocial'] = new \Timber\Menu('social-menu');
         $context['is_front_page'] = is_front_page();

         return $context;
     }

add_filter('timber/context', 'add_to_context');
