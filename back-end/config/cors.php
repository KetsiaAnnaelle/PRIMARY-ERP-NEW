<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'classes/*'],

    'allowed_methods' => ['*'],  // Allow all methods

    'allowed_origins' =>  ['http://localhost:3000'],  // Allow all origins, or specify your frontend URL e.g. ['http://localhost:3000']

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],  // Allow all headers

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
