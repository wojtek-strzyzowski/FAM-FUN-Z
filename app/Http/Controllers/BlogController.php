<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
    
    // wurde geändert dismal mit user statt blog id
    public function show($id)
    {
        $blog = Blog::with('user')->findOrFail($id);
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
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'address' => 'required|string',
            'zip' => 'required|string|max:10',
            'city' => 'required|string|max:100',
            'homepage' => 'nullable|url',
            'category_id' => 'required|integer|exists:categories,id',
            'custom_special' => 'nullable|json',
            'additional_info' => 'nullable|string',
            'content' => 'required|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    
        $blog = Blog::findOrFail($id);
        $blog->update($validatedData);
    
        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $blog->thumbnail = $path;
            $blog->save();
        }
    
        return response()->json($blog);
        Log::info('Update Blog:', $validatedData);
    }

    public function getCategories()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function updateCategory(Request $request, $id)
    {
        // Validierung der Eingabedaten
        $validatedData = $request->validate([
            'category_id' => 'required|integer|exists:categories,id',
        ]);

        // Finde den Blog-Post anhand der ID
        $blog = Blog::findOrFail($id);

        // Aktualisiere die Kategorie-ID des Blog-Posts
        $blog->category_id = $validatedData['category_id'];

        // Speichere die Änderungen
        $blog->save();

        // Gib eine Antwort zurück
        return response()->json([
            'message' => 'Category updated successfully!',
            'blog' => $blog
        ]);
    }
}