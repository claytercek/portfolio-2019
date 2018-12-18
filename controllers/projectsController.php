<?php
/*
Template Name: Archives
 */
$context = Timber::get_context();

$context['projects'] = new Timber\Post();
Timber::render('archive-projects.twig', $context);
