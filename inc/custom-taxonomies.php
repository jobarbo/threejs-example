<?php
/*------------------------------------*\
    CUSTOM TAXONOMIES
\*------------------------------------*/

function create_custom_taxonomy() {
    // Services
    $rewrite = array(
        'slug'                       => 'custom-taxonomy-name/?',
        'with_front'                 => false,
        'hierarchical'               => true,
    );
    $args = array(
        'labels' => array(
            'name' => 'Finitions',
            'singular_name' => 'Finition',
            'add_new' => 'Ajouter une finition',
            'add_new_item' => 'Ajouter une finition',
            'edit' => 'Modifier une finition',
            'edit_item' => 'Modifier une finition',
            'new_item' => 'Ajouter une finition',
            'view' => 'Voir la collection',
            'view_item' => 'Voir la collection',
            'search_items' => 'Chercher une finition',
            'not_found' => 'Aucun résultat',
            'not_found_in_trash' => 'Aucun résultat dans la corbeille'
        ),
        'hierarchical'               => true,
        'public'                     => true,
        'show_ui'                    => true,
        'show_admin_column'          => true,
        'show_in_nav_menus'          => true,
        'show_tagcloud'              => true,
        'rewrite'                    => $rewrite,
        'show_in_rest'               => false,
        'has_archive'                => false,
        'publicly_queryable' => false
    );
    register_taxonomy('custom-taxonomy-name', 'cpt-template', $args);
}



//
//
// ACTION HOOK
add_action('init', 'create_kitchen_finish_taxonomy');
