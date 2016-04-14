<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
 */
Route::get('/', 'IndexController@index');
Route::get('/home', 'IndexController@index');
/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
 */
// Authentication routes...
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

// Registration routes...
Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::post('auth/register', 'Auth\AuthController@postRegister');
Route::post('auth/register', 'Auth\AuthController@postRegister');
Route::any('auth/forgot-password', 'Auth\PasswordController@forgot');
Route::any('auth/new-password/{token}', 'Auth\PasswordController@newPassword');
/*
|--------------------------------------------------------------------------
| Backend
|--------------------------------------------------------------------------
 */
Route::group(['prefix' => 'admin'], function () {
    //Admin User
    Route::get('users', 'User\Backend\UserController@index');
    Route::any('users/create', 'User\Backend\UserController@create');
    Route::get('users/profile/{id}', 'User\Backend\UserController@profile', ['middleware' => 'auth'])->where('id', '[0-9]+');
    Route::any('users/edit/{id}', 'User\Backend\UserController@edit', ['middleware' => 'auth'])->where('id', '[0-9]+');
    Route::any('users/delete/{id}', 'User\Backend\UserController@delete', ['middleware' => 'auth'])->where('id', '[0-9]+');

    //Admin dashboard
    Route::get('/', 'Dashboard\Admin\DashboardController@index');
    Route::get('dashboard', 'Dashboard\Admin\DashboardController@index');
});

/*
 * API Inbox Management
 *
 * */

Route::group(['prefix' => 'api'], function () {
    Route::get('email-inbox/{user_email}', 'Email\EmailController@getEmailsInbox');
    Route::get('email/{id}', 'Email\EmailController@show');
    Route::get('email-detail/{user_email}/{id}', 'Email\EmailController@getEmailsDetail');
    Route::get('email-sent/{user_email}', 'Email\EmailController@getEmailSent');
    Route::any('write-email', 'Email\EmailController@sentMailToOther');

    // chart email inbox-send
    Route::any('pie-charts/{user_email}', 'Email\EmailController@pieChart');

    Route::any('emails/delete', 'Email\EmailController@deleteEmail');

    /*User*/
    Route::any('users', 'User\Backend\UserController@getUsers');
    Route::any('users/update/{user_email}', 'User\Backend\UserController@updateUser');

    /*Auth*/
    Route::any('auth/login', '\App\Http\Controllers\Auth\AuthController@login');
    Route::any('auth/loggedin', '\App\Http\Controllers\Auth\AuthController@loggedin');
    Route::any('auth/logout', '\App\Http\Controllers\Auth\AuthController@logout');
    Route::any('auth/register', '\App\Http\Controllers\Auth\AuthController@register');
    Route::any('auth/profile', '\App\Http\Controllers\Auth\AuthController@profile');

    Route::group(['namespace' => 'Auth', 'prefix' => 'auth'], function () {
        Route::post('facebook', 'FacebookController@store');
    });
});

/*
|--------------------------------------------------------------------------
| Frontend
|--------------------------------------------------------------------------
 */
Route::group(['prefix' => 'user'], function () {
    Route::get('/', 'User\Frontend\UserController@index');
    Route::get('/profile/{id}', 'User\Frontend\UserController@profile')->where('id', '[0-9]+');
});
