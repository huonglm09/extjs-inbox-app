<?php

/*
  |--------------------------------------------------------------------------
  | Module Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register all of the routes for the module.
  | It's a breeze. Simply tell Laravel the URIs it should respond to
  | and give it the Closure to execute when that URI is requested.
  |
 */

/*
 * Define Admin Routes
 */
Route::group(['prefix' => 'admin'], function() {
    Route::group(['prefix' => '{module-name}'], function() {
        //Index page
        Route::get('/', ['uses' => 'Admin{ModuleName}Controller@index']);
        //Update {module-name} information
        Route::match(['get', 'post'],'edit/{id}', ['uses' => 'Admin{ModuleName}Controller@edit'])->where('id', '[0-9]+'); 
        //Create {module-name} information
        Route::match(['get', 'post'],'create', ['uses' => 'Admin{ModuleName}Controller@create']);
        //Delete {module-name} information
        Route::get('delete/{id}', ['uses' => 'Admin{ModuleName}Controller@delete'])->where('id', '[0-9]+'); 
    });
});

/*
 * Define Frontend Routes
 */
Route::group(['prefix' => '{module-name}'], function() {
    //Index page
    Route::get('/', ['uses' => '{ModuleName}Controller@index']);
    //Detail page
    Route::get('/{slug}', ['uses' => '{ModuleName}Controller@detail']);
});
