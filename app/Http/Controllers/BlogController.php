<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'content' => 'required|json',
            'thumbnail' => 'nullable|image|max:2048',
            'homepage' => 'nullable|string|max:255',
            'zip' => 'required|string|max:10',
            'city' => 'required|string|max:255',
            'address' => 'required|string|max:255', // Validierung für Adresse hinzugefügt
            'custom_special' => 'nullable|json', // Validierung für custom_special hinzugefügt
        ]);
    
        $blog = new Blog();
        $blog->user_id = Auth::id(); // Setzt die ID des authentifizierten Benutzers
        $blog->title = $request->title;
        $blog->description = $request->description;
        $blog->content = $request->content;
        $blog->address = $request->address;
        $blog->zip = $request->zip;
        $blog->city = $request->city;
        $blog->homepage = $request->homepage; 
        $blog->custom_special = $request->custom_special; 
        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $blog->thumbnail = $path;
        }
        $blog->category_id = $request->category_id;
        $blog->save();
    
        return response()->json([
            'message' => 'Blog erfolgreich erstellt.',
            'id' => $blog->id // Fügen Sie die ID des neu erstellten Blogs zur Antwort hinzu
        ]);
    }
    
    public function show($id)
    {
        $blog = Blog::find($id);
    
        if (!$blog) {
            return response()->json(['message' => 'Blog not found'], 404);
        }
    
        return response()->json($blog);
    }

    public function index()
    {
    // Abrufen aller Blogs aus der Datenbank und Sortieren nach Erstellungsdatum
    $blogs = Blog::orderBy('created_at', 'desc')->get();

    // Rückgabe der Blogs als JSON
    return response()->json($blogs);
    }

    public function update(Request $request, $id)
    {
        $post = Blog::findOrFail($id);
        $post->title = $request->input('title');
        $post->description = $request->input('description');
        $post->content = $request->input('content');
        $post->address = $request->input('address');
        $post->zip = $request->input('zip');
        $post->city = $request->input('city');
        $post->homepage = $request->input('homepage');
        $post->category_id = $request->input('category_id');
        $post->custom_special = $request->input('custom_special');
        $post->additional_info = $request->input('additional_info');
        $post->sonstiges = $request->input('sonstiges');

        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $path = $file->store('thumbnails', 'public');
            $post->thumbnail = $path;
        }

        $post->save();

        return response()->json(['id' => $post->id]);
    }

    public function getCategories()
    {
        $categories = Category::all();
        return response()->json($categories);
    }
}