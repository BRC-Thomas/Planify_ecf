<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\TaskFormRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Task;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

/*       $task = new Task();
        $task->title = 'Ma tâche eeeeeeeeeee ';
        $task->description = 'Description de ma tâche';
        $task->isDone = false;
        $task->save();*/

       $tasks = Task::all();
        return Inertia::render('Task/Task',[
            'user' => auth()->user(),
            'tasks' => $tasks,
            'flash' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Task/CreateTask',[
            'user' => auth()->user(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskFormRequest $request)
    {
        // Valide les données du formulaire
        $validatedData = $request->validated();

        // Créer une nouvelle instance de la tâche
        $task = new Task();
        $task->title = $validatedData['title'];
        $task->description = optional($validatedData)['description'];
       // $task->category = optional($validatedData)['category'];
        // Vérifier si la catégorie est définie, sinon la définir sur "Sans catégorie"
         $task->category = isset($validatedData['category']) ? $validatedData['category'] : 'Sans catégorie';

        $task->save();

        return redirect()->route('task.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $task = Task::findOrFail($id);

        return Inertia::render('Task/EditTask',[
            'user' => auth()->user(),
            'task' => $task,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(TaskFormRequest $request, string $id)
    {
        // Valide les données du formulaire
        $validatedData = $request->validated();

        // Trouve la tâche à mettre à jour
        $task = Task::findOrFail($id);

        // Met à jour les attributs de la tâche
        $task->title = $validatedData['title'];
        $task->description = ($validatedData)['description'];
        $task->category = optional($validatedData)['category'];

        $task->save();

        return redirect()->route('task.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Trouve la tâche à mettre à supprimer
        $task = Task::findOrFail($id);

        $task->delete();

        session()->flash('success', 'Tâche supprimée avec succès');

        return redirect()->back();
    }
}
