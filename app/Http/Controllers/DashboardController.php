<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        /***
         * Récupération de l'id du user puis de ses tâches
         */
        $user = auth()->user();
        //$tasks = Task::all();
        $tasks = Task::where('user_id', $user->id)->get();

        //$tasks = Task::latest('created_at')->paginate(3);

        return Inertia::render('Dashboard',[
            'user' => $user,
            'tasks' => $tasks,
            'apiKey' => env('API_KEY')
        ]);
    }
}
