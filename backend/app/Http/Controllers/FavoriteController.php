<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $favoriteItems = $request->user()
            ->favorites()
            ->with('user:id,name,avatar')
            ->orderByPivot('created_at', 'desc')
            ->get();

        return response()->json($favoriteItems);
    }

    public function toggle(Request $request, $itemId)
    {
        $user = $request->user();
        $existing = Favorite::where('user_id', $user->id)
            ->where('item_id', $itemId)
            ->first();

        if ($existing) {
            $existing->delete();
            return response()->json(['favorited' => false, 'message' => 'Removed from favorites']);
        }

        Favorite::create([
            'user_id' => $user->id,
            'item_id' => $itemId,
        ]);

        return response()->json(['favorited' => true, 'message' => 'Added to favorites']);
    }

    public function check(Request $request)
    {
        $itemIds = $request->input('item_ids', []);

        $favoritedIds = Favorite::where('user_id', $request->user()->id)
            ->whereIn('item_id', $itemIds)
            ->pluck('item_id')
            ->toArray();

        return response()->json($favoritedIds);
    }
}
