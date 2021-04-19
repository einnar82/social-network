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
        $params = [
            'comment_text' => $request->get('comment_text'),
            'parent_id' => $request->get('parent_id'),
            'name' => $request->get('name'),
        ];

        if ($params['parent_id']) {
            $parent = Comment::findOrFail($params['parent_id']);
            $params['level'] = $parent->level == Comment::MAX_LEVEL ? Comment::MAX_LEVEL : $parent->level + 1;
            $params['parent_id'] = $parent->level == Comment::MAX_LEVEL ? $parent->parent_id : $parent->id;
        } else {
            $params['level'] = 1;
        }
        return new CommentResource(Comment::create($params));
    }

    public function getComments(Request $request)
    {
        return CommentResource::collection(Comment::whereNull('parent_id')->latest()->paginate(3));
    }

    public function getChildComments($id)
    {
        return CommentResource::collection(Comment::findOrFail($id)->children);
    }

    public function getGrandChildComments($id)
    {
        return CommentResource::collection(Comment::findOrFail($id)->grand_children);
    }
}
