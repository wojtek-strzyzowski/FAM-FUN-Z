<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    public function index(Request $request)
    {
        $blogId = $request->query('blog_id');
        $comments = Comment::where('blog_id', $blogId)->get();
        return response()->json($comments);
    }

    public function store(Request $request)
    {
        $comment = new Comment();
        $comment->blog_id = $request->input('blog_id');
        $comment->content = $request->input('content');
        $comment->save();

        return response()->json($comment);
    }
}