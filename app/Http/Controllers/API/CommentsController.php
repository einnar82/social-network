<?php

namespace App\Http\Controllers\API;

use App\Comment;
use App\Http\Controllers\Controller;
use App\Http\Requests\AddCommentRequest;
use App\Post;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function addComment(AddCommentRequest $request)
    {
        return Comment::create($request->all());
    }

    public function getComments(Request $request)
    {
        return Post::with(['comments.children'])->latest()->get();
    }
}
