<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        $query = Item::with(['user:id,name,avatar', 'comments.user:id,name,avatar']);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('city')) {
            $query->where('city', $request->input('city'));
        }

        if ($request->filled('category')) {
            $query->where('category', $request->input('category'));
        }

        if ($request->input('sort') === 'low_to_high') {
            $query->orderBy('price', 'asc');
        } elseif ($request->input('sort') === 'high_to_low') {
            $query->orderBy('price', 'desc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->input('user_id'));
        }

        $items = $query->paginate($request->input('per_page', 12));

        return response()->json($items);
    }

    public function show(Item $item)
    {
        $item->load(['user:id,name,avatar,email', 'comments.user:id,name,avatar']);

        return response()->json($item);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|integer|min:1',
            'city' => 'required|string|max:100',
            'category' => 'required|string|max:100',
            'image' => 'required|file|image|max:5120',
            'looking_for_image' => 'nullable|file|image|max:5120',
            'looking_for_desc' => 'nullable|string',
        ]);

        $imagePath = $request->file('image')->store('items', 'public');

        $lookingForImagePath = null;
        if ($request->hasFile('looking_for_image')) {
            $lookingForImagePath = $request->file('looking_for_image')->store('items', 'public');
        }

        $item = Item::create([
            'user_id' => $request->user()->id,
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'image' => '/storage/' . $imagePath,
            'price' => $request->input('price'),
            'city' => $request->input('city'),
            'category' => $request->input('category'),
            'looking_for_image' => $lookingForImagePath ? '/storage/' . $lookingForImagePath : null,
            'looking_for_desc' => $request->input('looking_for_desc'),
        ]);

        $item->load('user:id,name,avatar');

        return response()->json($item, 201);
    }

    public function destroy(Request $request, Item $item)
    {
        if ($item->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($item->image && str_starts_with($item->image, '/storage/')) {
            $path = str_replace('/storage/', '', $item->image);
            Storage::disk('public')->delete($path);
        }
        if ($item->looking_for_image && str_starts_with($item->looking_for_image, '/storage/')) {
            $path = str_replace('/storage/', '', $item->looking_for_image);
            Storage::disk('public')->delete($path);
        }

        $item->delete();

        return response()->json(['message' => 'Item deleted successfully']);
    }

    public function addComment(Request $request, Item $item)
    {
        $request->validate([
            'text' => 'required|string|max:1000',
        ]);

        $comment = Comment::create([
            'user_id' => $request->user()->id,
            'item_id' => $item->id,
            'text' => $request->input('text'),
        ]);

        $comment->load('user:id,name,avatar');

        return response()->json($comment, 201);
    }
}
