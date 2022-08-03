<?php
/*------------------------------------*\
    CUSTOM POST TYPES
\*------------------------------------*/

function create_post_type() {


    // RETAILERS
    register_post_type(
        'CPT Template',
        array(
            'labels' => array(
                'name' => 'CPT Template',
                'singular_name' => 'CPT Template',
                'add_new' => 'Ajouter',
                'add_new_item' => 'Ajouter',
                'edit' => 'Modifier',
                'edit_item' => 'Modifier',
                'new_item' => 'Ajouter',
                'view' => 'Voir',
                'view_item' => 'Voir',
                'search_items' => 'Chercher',
                'not_found' => 'Aucun résultat',
                'not_found_in_trash' => 'Aucun résultat dans la corbeille'
            ),
            'public' => true,
            'has_archive' => false,
            'menu_position' => 21,
            'menu_icon' => 'dashicons-admin-multisite',
            'supports' => array(
                'title',
                'editor'
            ),
            'rewrite' => array(
                'slug' => 'cpt-template'
            ),
            'can_export' => true,
            'taxonomies' => array('cpt-template', 'category'),
        )
    );
}

//
//
// ACTION HOOK
add_action('init', 'create_post_type');
