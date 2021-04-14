<?php

namespace App\Http\Controllers\API;

use App\Comment;
use App\Http\Controllers\Controller;
use App\Http\Requests\AddCommentRequest;
use App\Post;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    public function getAllPosts(Request $request)
    {
        return Post::with(['comments.children'])->latest()->get();
    }
}
