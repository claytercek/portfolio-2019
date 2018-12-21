<?php
/*
Template Name: Archives
 */

$args = array(
	'numberposts' => -1,
	'post_type'   => 'post'
);

$context = Timber::get_context();
$context['projects'] = Timber::get_posts($args);

Timber::render('projects.twig', $context);
