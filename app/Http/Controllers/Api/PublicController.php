<?php

namespace App\Http\Controllers\Api;

use App\Category;
use App\Http\Controllers\Controller;
use App\Post;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class PublicController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function getPosts()
    {
        $featuredImageUrl = url('storage/post_img/') . "/";
        $featuredImageThumbUrl = url('storage/post_img/thumb') . "/";

        $publishedPosts = Post::with('category')
            ->select('*', DB::raw('CONCAT("' . $featuredImageUrl . '",featured_image) AS featured_image_url'), DB::raw('CONCAT("' . $featuredImageThumbUrl . '",featured_image) AS featured_image_thumb_url'))
            ->where('status', config('constants.STATUS.PUBLISH'))
            ->latest()->get();

        return response()->json($publishedPosts, 200);
    }

    public function getPost($id)
    {
        $featuredImageUrl = url('storage/post_img/') . "/";
        $featuredImageThumbUrl = url('storage/post_img/thumb') . "/";

        $publishedPost = Post::with('category')
            ->select('*', DB::raw('CONCAT("' . $featuredImageUrl . '",featured_image) AS featured_image_url'), DB::raw('CONCAT("' . $featuredImageThumbUrl . '",featured_image) AS featured_image_thumb_url'))
            ->where('status', config('constants.STATUS.PUBLISH'))
            ->findOrFail($id);

        return response()->json($publishedPost, 200);
    }
}
