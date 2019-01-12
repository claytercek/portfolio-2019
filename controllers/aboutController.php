<?php
/*
Template Name: About
 */

$context = Timber::get_context();
$context['post'] = new TimberPost();

Timber::render('about.twig', $context);
