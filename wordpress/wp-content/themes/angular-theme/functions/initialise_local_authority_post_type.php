<?php

add_action( 'init', 'create_local_authority_post_type' );
add_action( 'init', 'setup_local_authority_acf_group');

function create_local_authority_post_type() {

    register_post_type('local_authority',
        array(
            'labels'                => array(
                'name' => __( 'Local Authorities' ),
                'singular_name' => __( 'Local Authority' )
            ),
            'capability_type'       => array('local_authority', 'local_authorities'),
            'capabilities'          => array(
                'create_posts' => 'create_local_authorities'
            ),
            'map_meta_cap'          => true,
            'description'           => 'Local Authority codes and grants',
            'exclude_from_search'   => true,
            'publicly_queryable'    => false,
            'show_in_nav_menus'     => false,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'show_in_rest'          => true,
            'menu_icon'             => 'dashicons-location',
            'menu_position'         => 5,
            'supports'              => array('title', 'revisions')
        ));
}

function setup_local_authority_acf_group() {

    if(function_exists("acf_add_local_field_group"))
    {
        acf_add_local_field_group(array (
            'id' => 'acf_local-authority',
            'title' => 'Local Authority',
            'fields' => array (
                array (
                    'key' => 'field_5a0b225fd70a1',
                    'label' => 'Grants',
                    'name' => 'grants_tab',
                    'type' => 'tab',
                ),
                array (
                    'key' => 'field_59f0c4fe301b6',
                    'label' => 'Grants',
                    'name' => 'grants',
                    'type' => 'relationship',
                    'instructions' => 'The grants which are available in the local authority',
                    'required' => 0,
                    'return_format' => 'id',
                    'post_type' => array (
                        0 => 'local_grant',
                    ),
                    'taxonomy' => array (
                        0 => 'all',
                    ),
                    'filters' => array (
                        0 => 'search',
                    ),
                    'result_elements' => array (
                        0 => 'post_type',
                        1 => 'post_title',
                    ),
                    'max' => '',
                ),
                array (
                    'key' => 'field_59f05fb38853b',
                    'label' => 'Basic Details',
                    'name' => 'basic_details_tab',
                    'type' => 'tab',
                ),
                array (
                    'key' => 'field_59ef61ef48e99',
                    'label' => 'Local Authority Code',
                    'name' => 'local_authority_code',
                    'type' => 'text',
                    'instructions' => 'ONS (GSS) code for the Local Authority, e.g. E09000033',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_59f05f32da262',
                    'label' => 'Display Name',
                    'name' => 'display_name',
                    'type' => 'text',
                    'instructions' => 'Name to be displayed in the web app, e.g. Westminster',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_5da46f5d40d63',
                    'label' => 'Example Postcode',
                    'name' => 'example_postcode',
                    'type' => 'text',
                    'instructions' => 'Example postcode within the local authority, used to periodically test if postcode search is up to date, e.g. SW1H 0ET',
                    'required' => 0,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                )
            ),
            'location' => array (
                array (
                    array (
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'local_authority',
                        'order_no' => 0,
                        'group_no' => 0,
                    ),
                ),
            ),
            'options' => array (
                'position' => 'normal',
                'layout' => 'no_box',
                'hide_on_screen' => array (
                    0 => 'slug',
                ),
            ),
            'menu_order' => 0,
        ));
    }
}