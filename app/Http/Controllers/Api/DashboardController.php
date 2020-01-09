<?php

namespace App\Http\Controllers\Api;

use App\Category;
use App\Http\Controllers\Controller;
use App\Post;
use Illuminate\Http\Response;

class DashboardController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStatistics()
    {
        $postCount = Post::all()->count();
        $categoryCount = Category::all()->count();
        $recentPost = Post::with('category')->select('id', 'category_id', 'title','created_at')->latest()->take(5)->get();

        return response()->json([
            'post_count' => $postCount,
            'category_count' => $categoryCount,
            'recent_posts' => $recentPost,
        ], 200);
    }
}
