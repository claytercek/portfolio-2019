<?php
/**
 * Description: Projects page. Displays all projects.
 */
$context = Timber::get_context();

$context['projects'] = new Timber\Post();
Timber::render('single-project.twig', $context);
