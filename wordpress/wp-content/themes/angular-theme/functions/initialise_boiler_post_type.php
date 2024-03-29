<?php require_once('post_type_functions.php');

/**
 * This file sets up the "Types of boiler" post type in WP.
 * This is separate to the boiler model catalogue
 */

add_action( 'init', 'create_boiler_post_type' );
add_action( 'init', 'setup_boiler_acf_group');

// Disable the quick-edit link to prevent users editing the slug for a recommendation
add_filter( 'post_row_actions', disable_quick_edit_for('boiler'), 10, 2 );

// Add slug to returned ACF fields
add_filter('acf/rest_api/boiler/get_items', 'add_slug');

function create_boiler_post_type() {

    register_post_type('boiler',
        array(
            'labels'                => array(
                'name' => __( 'Boilers' ),
                'singular_name' => __( 'Boiler' )
            ),
            'description'           => 'Types of boiler',
            'exclude_from_search'   => true,
            'publicly_queryable'    => false,
            'show_in_nav_menus'     => false,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'show_in_rest'          => true,
            'menu_icon'             => 'dashicons-palmtree',
            'menu_position'         => 5,
            'supports'              => array('title', 'revisions')
        ));
}

function setup_boiler_acf_group() {

    if(function_exists("acf_add_local_field_group"))
    {
        acf_add_local_field_group(array (
            'id' => 'acf_boiler-type',
            'title' => 'Boiler type',
            'fields' => array (
                array (
                    'key' => 'field_5a0c7d8f0f488',
                    'label' => 'Name',
                    'name' => 'name',
                    'type' => 'text',
                    'instructions' => 'A name for this type of boiler',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_5a0c7da80f489',
                    'label' => 'Description',
                    'name' => 'description',
                    'type' => 'text',
                    'instructions' => 'A short (1-2 sentences) description of this boiler type',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_5a13f38041082',
                    'label' => 'Space requirement',
                    'name' => 'space_requirement',
                    'type' => 'text',
                    'instructions' => 'A short (1 or 2 sentences) description of the space requirements for this boiler.',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_5a0c7db90f48a',
                    'label' => 'Installation cost lower bound',
                    'name' => 'installation_cost_lower_bound',
                    'type' => 'number',
                    'instructions' => 'A lower bound (in pounds) for the average installation cost of this boiler type',
                    'required' => 0,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => '',
                ),
                array (
                    'key' => 'field_5a0c7dd30f48b',
                    'label' => 'Installation cost upper bound',
                    'name' => 'installation_cost_upper_bound',
                    'type' => 'number',
                    'instructions' => 'An upper bound (in pounds) for the average installation cost of this boiler type',
                    'required' => 0,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => '',
                ),
                array (
                    'key' => 'field_5a0c7deb0f48c',
                    'label' => 'Lifetime',
                    'name' => 'lifetime',
                    'type' => 'number',
                    'instructions' => 'The average lifetime (in years) of this boiler type',
                    'required' => 0,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => '',
                ),
                array (
                    'key' => 'field_5a0c7e020f48d',
                    'label' => 'Running cost',
                    'name' => 'running_cost',
                    'type' => 'number',
                    'instructions' => 'The average running cost per year (in pounds) of this boiler type',
                    'required' => 0,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => '',
                ),
                array(
                    'key' => 'field_5a1e9200d6359',
                    'label' => 'Pros',
                    'name' => 'pros',
                    'type' => 'repeater',
                    'instructions' => 'Upsides of this type of boiler',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'collapsed' => '',
                    'min' => 0,
                    'max' => 0,
                    'layout' => 'table',
                    'button_label' => '',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_5a1e9233d635a',
                            'label' => 'Heading',
                            'name' => 'heading',
                            'type' => 'text',
                            'instructions' => 'A short heading summarising this pro',
                            'required' => 1,
                            'conditional_logic' => 0,
                            'wrapper' => array(
                                'width' => '',
                                'class' => '',
                                'id' => '',
                            ),
                            'default_value' => '',
                            'placeholder' => '',
                            'prepend' => '',
                            'append' => '',
                            'maxlength' => '',
                        ),
                        array(
                            'key' => 'field_5a1e924ed635b',
                            'label' => 'Body',
                            'name' => 'body',
                            'type' => 'textarea',
                            'instructions' => 'Details of this pro',
                            'required' => 1,
                            'conditional_logic' => 0,
                            'wrapper' => array(
                                'width' => '',
                                'class' => '',
                                'id' => '',
                            ),
                            'default_value' => '',
                            'placeholder' => '',
                            'maxlength' => '',
                            'rows' => '',
                            'new_lines' => '',
                        ),
                    ),
                ),
                array(
                    'key' => 'field_5a1e9262d635c',
                    'label' => 'Cons',
                    'name' => 'cons',
                    'type' => 'repeater',
                    'instructions' => 'Downsides of this type of boiler',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'collapsed' => '',
                    'min' => 0,
                    'max' => 0,
                    'layout' => 'table',
                    'button_label' => '',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_5a1e927bd635d',
                            'label' => 'Heading',
                            'name' => 'heading',
                            'type' => 'text',
                            'instructions' => 'A short heading summarising this con',
                            'required' => 1,
                            'conditional_logic' => 0,
                            'wrapper' => array(
                                'width' => '',
                                'class' => '',
                                'id' => '',
                            ),
                            'default_value' => '',
                            'placeholder' => '',
                            'prepend' => '',
                            'append' => '',
                            'maxlength' => '',
                        ),
                        array(
                            'key' => 'field_5a1e9291d635e',
                            'label' => 'Body',
                            'name' => 'body',
                            'type' => 'textarea',
                            'instructions' => 'Details of this con',
                            'required' => 0,
                            'conditional_logic' => 0,
                            'wrapper' => array(
                                'width' => '',
                                'class' => '',
                                'id' => '',
                            ),
                            'default_value' => '',
                            'placeholder' => '',
                            'maxlength' => '',
                            'rows' => '',
                            'new_lines' => '',
                        ),
                    ),
                ),
            ),
            'location' => array (
                array (
                    array (
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'boiler',
                        'order_no' => 0,
                        'group_no' => 0,
                    ),
                ),
            ),
            'options' => array (
                'position' => 'normal',
                'layout' => 'no_box',
                'hide_on_screen' => array (
                ),
            ),
            'menu_order' => 0,
        ));
    }
}