<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/login', 'Api\AuthController@login')->name('login');
Route::post('/register', 'Api\AuthController@register')->name('register');

Route::get('/public_posts', 'Api\PublicController@getPosts');
Route::get('/public_post/{id}', 'Api\PublicController@getPost');

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/user', 'Api\AuthController@user');
    Route::get('/logout', 'Api\AuthController@logout');

    Route::put('/profile/profile-update', 'Api\ProfileController@profileUpdate');
    Route::put('/profile/profile-upload', 'Api\ProfileController@profileUpload');
    Route::put('/profile/change-password', 'Api\ProfileController@changePassword');

    Route::get('/dashboard/statistics', 'Api\DashboardController@getStatistics');

    Route::apiResource('category', 'Api\CategoryController');

    Route::get('post/status', 'Api\PostController@getPostStatus');
    Route::apiResource('post', 'Api\PostController');
});
