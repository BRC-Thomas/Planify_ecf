<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\TaskFormRequest;
use Carbon\Carbon;
use Dflydev\DotAccessData\Data;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Task;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $category = $request->input('category');

        $tasks = ($category)
            ? $user->tasks()->where('category', $category)->get()
            : $user->tasks;
            //dd($user);
            return Inertia::render('Task/Task', [
            'user' => $user,
            'tasks' => $tasks,
            'flash' => session('success'),
            'selectedCategory' => $category,
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
        $validatedData = $request->validated();

        $task = new Task();
        $task->title = $validatedData['title'];
        $task->description = optional($validatedData)['description'];
        $task->category = $validatedData['category'] ?? 'Sans catégorie';
        $task->user_id = auth()->id();

        if (isset($validatedData['due_date'])) {
            $task->due_date = Carbon::createFromTimestamp($validatedData['due_date'] / 1000);
        } else {
            $task->due_date = null;
        }


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
        $user = auth()->user();
        $task = $user->tasks()->findOrFail($id);

        return Inertia::render('Task/EditTask', [
            'user' => $user,
            'task' => $task,
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(TaskFormRequest $request, string $id, User $user)
    {
        $validatedData = $request->validated();

        $user = auth()->user();
        $task = $user->tasks()->findOrFail($id);

        $task->title = $validatedData['title'];
        $task->description = ($validatedData)['description'];
        $task->category = optional($validatedData)['category'];

        if (!(isset($validatedData['due_date']))) {
            $task->due_date = null;
        }

        $task->save();

        return redirect()->route('task.index');
    }


    /**
     * Met à jour "isDone"
     */
    public function updateIsDone(string $id)
    {

        $user = auth()->user();
        $task = $user->tasks()->findOrFail($id);
        $task->isDone = !$task->isDone;
        $task->save();

        return redirect()->route('task.update', ['task' => $task->id]);

    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::findOrFail($id);

        $task->delete();

        session()->flash('success', 'Tâche supprimée avec succès');

        return redirect()->back();
    }
}
