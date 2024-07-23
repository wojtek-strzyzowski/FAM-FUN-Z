<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

use App\Http\Resources\UserResource;

class UserController extends Controller
{

    // Methode für den authentifizierten Benutzer
    public function show()
    {
        $user = new UserResource(User::findOrFail(auth()->id()));
        return response()->json($user);
    }

    // Methode für den Benutzer basierend auf der user_id
    public function getUserById($id)
    {
        $user = new UserResource(User::findOrFail($id));
        return response()->json($user);
    }

}
