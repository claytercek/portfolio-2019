<?php
/**
 * Description: General Styles Template. Default Page
 */
 $context = Timber::get_context();

 $context['post'] = new Timber\Post();
Timber::render('index.twig', $context);
