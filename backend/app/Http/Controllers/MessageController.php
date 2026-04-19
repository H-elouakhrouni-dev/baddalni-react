<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $messages = Message::where('to_user_id', $request->user()->id)
            ->with(['sender:id,name,avatar', 'item:id,title'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $request->validate([
            'to_user_id' => 'required|exists:users,id',
            'text' => 'required|string|max:2000',
            'item_id' => 'nullable|exists:items,id',
            'item_title' => 'nullable|string|max:255',
        ]);

        if ($request->input('to_user_id') == $request->user()->id) {
            return response()->json(['message' => 'Cannot send messages to yourself'], 422);
        }

        $message = Message::create([
            'from_user_id' => $request->user()->id,
            'to_user_id' => $request->input('to_user_id'),
            'item_id' => $request->input('item_id'),
            'text' => $request->input('text'),
            'item_title' => $request->input('item_title'),
        ]);

        $message->load('sender:id,name,avatar');

        return response()->json($message, 201);
    }
}
