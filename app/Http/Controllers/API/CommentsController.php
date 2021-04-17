<?php

namespace App\Http\Controllers\API;

use App\Comment;
use App\Http\Controllers\Controller;
use App\Http\Requests\AddCommentRequest;
use App\Http\Resources\CommentResource;
use App\Post;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function addComment(AddCommentRequest $request)
    {
        return new CommentResource(Comment::create($request->all()));
    }

    public function getComments(Request $request)
    {
        return CommentResource::collection(Comment::whereNull('parent_id')->latest()->paginate(3));
    }

    public function getChildComments($id)
    {
        return CommentResource::collection(Comment::findOrFail($id)->children()->get());
    }
}
