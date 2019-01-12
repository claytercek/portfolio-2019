<?php
/*
Template Name: Contact
 */

$context = Timber::get_context();
$context['post'] = new TimberPost();

Timber::render('contact.twig', $context);
