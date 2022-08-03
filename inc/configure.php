<?php
// Disable WordPress Admin Bar for all users but admins. //
show_admin_bar(false);

// Removing unecessary admin menu tabs
function custom_menu_page_removing() {
	remove_menu_page('edit-comments.php');
}

// Showing Menus in Appearance
function register_my_menus() {
	register_nav_menus(
		array(
			'navigation' => __('Navigation'),
			'navigation-footer' => __('Navigation Footer')
		)
	);
}

function remove_editor() {
	remove_post_type_support('page', 'editor');
	remove_post_type_support('post', 'editor');
}


// add SVG to allowed file uploads
function add_file_types_to_uploads($mime_types) {
	$mime_types['svg'] = 'image/svg+xml';

	return $mime_types;
}

function dequeue_jquery_migrate(&$scripts) {
	if (!is_admin()) {
		$scripts->remove('jquery');
		$scripts->add('jquery', false, array('jquery-core'), '1.12.4', true);
		$scripts->add('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js', null, null, true);
	}
}
add_filter('wp_default_scripts', 'dequeue_jquery_migrate');
add_action('upload_mimes', 'add_file_types_to_uploads', 1, 1);
add_action('admin_init', 'remove_editor');
add_filter('use_block_editor_for_post_type', '__return_false');
add_action('admin_menu', 'custom_menu_page_removing');
add_action('init', 'register_my_menus');
add_action('login_enqueue_scripts', 'custom_login_demarrage');
