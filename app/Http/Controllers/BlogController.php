<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class BlogController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'content' => 'required|string',
            'thumbnail' => 'nullable|image|max:2048',
            'homepage' => 'nullable|string|max:255',
            'zip' => 'nullable|string|max:10',
            'city' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255', // Validierung für Adresse hinzugefügt
            'custom_special' => 'nullable|json', // Validierung für custom_special hinzugefügt
        ]);
    
        $blog = new Blog();
        $blog->user_id = Auth::id(); // Setzt die ID des authentifizierten Benutzers
        $blog->title = $request->title;
        $blog->description = $request->description;
        $blog->content = $request->content;
        $blog->address = $request->address ?? ''; // Setzt einen leeren String, wenn address nicht gesetzt ist
        $blog->zip = $request->zip ?? ''; // Setzt einen leeren String, wenn zip nicht gesetzt ist
        $blog->city = $request->city ?? ''; // Setzt einen leeren String, wenn city nicht gesetzt ist
        $blog->homepage = $request->homepage; 
        $blog->custom_special = $request->custom_special; 
        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $blog->thumbnail = $path;
        }
        $blog->category_id = $request->category_id;
        $blog->save();

        return response()->json(['message' => 'Blog created successfully'], 201);
    }
    
    // wurde geändert dismal mit user statt blog id
    public function show($id)
    {
        $blog = Blog::with('user')->findOrFail($id);
        return response()->json($blog);
    }

    public function index(Request $request)
    {
        $query = Blog::query();
    
        if ($request->has('category_id') && $request->category_id != '') {
            $query->where('category_id', $request->category_id);
        }
    
        if ($request->has('sort')) {
            $query->orderBy('created_at', $request->sort);
        } else {
            $query->orderBy('created_at', 'desc');
        }
    
        $blogs = $query->get();
    
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
        }
    
        // Speichern der Änderungen
        $blog->save();
    
        // Debugging-Informationen
        Log::info('Update Blog:', $validatedData);
        Log::info('Updated Blog:', $blog->toArray());
    
        return response()->json($blog);
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

    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
    
        // Überprüfen, ob der authentifizierte Benutzer der Verfasser des Blogs ist
        if ($blog->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    
        $blog->delete();
    
        return response()->json(['message' => 'Blog erfolgreich gelöscht.']);
    }

    // Neue Methode zum Abrufen der Blogadresse
    public function getBlogAddress()
    {
        $blog = Blog::first(); // Annahme: Es gibt nur einen Blogeintrag
        if (!$blog) {
            return response()->json(['message' => 'Blog nicht gefunden'], 404);
        }
        return response()->json([
            'address' => $blog->address,
            'zip' => $blog->zip,
            'city' => $blog->city,
        ]);
    }

    public function getBlogsByUserId($user_id)
    {
    $blogs = Blog::where('user_id', $user_id)->get();
    return response()->json($blogs);
    }
}