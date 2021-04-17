<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('comments', 'API\CommentsController@addComment');
Route::get('comments', 'API\CommentsController@getComments');
Route::get('comments/{id}', 'API\CommentsController@getChildComments');
Route::get('comments/grandchild/{id}', 'API\CommentsController@getGrandChildComments');