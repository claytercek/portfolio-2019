<?php
/**
 * Description: Project page. Displays single project.
 */
$context = Timber::get_context();
$context['project'] = new Timber\Post();

Timber::render('404.twig', $context);
