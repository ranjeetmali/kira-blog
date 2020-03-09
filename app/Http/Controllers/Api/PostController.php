<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $featuredImageUrl = url('storage/post_img/') . "/";
        $featuredImageThumbUrl = url('storage/post_img/thumb') . "/";
        $posts = Post::with('category')->select('*', DB::raw('CONCAT("' . $featuredImageUrl . '",featured_image) AS featured_image_url'), DB::raw('CONCAT("' . $featuredImageThumbUrl . '",featured_image) AS featured_image_thumb_url'))
            ->latest()->get();
        return response()->json($posts, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'category_id' => 'required',
            'title' => 'required|string',
            'content' => 'required|string',
            'status' => 'required|string',
            'featured_img' => 'nullable|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        $data = $request->all();

        if ($request->hasFile("featured_img")) {
            $img = $request->file("featured_img");
            $file_name = $img->hashName();

            // [Start] generate thumb image file
            $thumbImage = Image::make($img)->resize(200, 200);
            $thumbImage->save(storage_path('app/public/post_img/thumb/' . $file_name));
            // [End]

            $img->store('public/post_img');
            $data['featured_image'] = $file_name;
        }

        $post = Post::create($data);
        $post->load('category');

        $featuredImageUrl = url('storage/post_img/') . "/";
        $featuredImageThumbUrl = url('storage/post_img/thumb') . "/";

        $post['featured_image_url'] = $featuredImageUrl . $post->featured_image;
        $post['featured_image_thumb_url'] = $featuredImageThumbUrl . $post->featured_image;


        return response()->json(['message' => "success", "data" => $post], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $featuredImageUrl = url('storage/post_img/') . "/";
        $featuredImageThumbUrl = url('storage/post_img/thumb') . "/";

        $post = Post::with('category')
            ->select('*', DB::raw('CONCAT("' . $featuredImageUrl . '",featured_image) AS featured_image_url'), DB::raw('CONCAT("' . $featuredImageThumbUrl . '",featured_image) AS featured_image_thumb_url'))
            ->findOrFail($id);
        return response()->json($post, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $validator = \Validator::make($request->all(), [
            'category_id' => 'required',
            'title' => 'required|string',
            'content' => 'required|string',
            'status' => 'required|string',
            'featured_img' => 'nullable|mimes:jpg,jpeg,png|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $data = $request->all();

        if ($request->hasFile("featured_img")) {
            $img = $request->file("featured_img");
            $file_name = $img->hashName();

            // [Start] generate thumb image file
            $thumbImage = Image::make($img)->resize(200, 200);
            $thumbImage->save(storage_path('app/public/post_img/thumb/' . $file_name));
            // [End]

            $img->store('public/post_img');
            $data['featured_image'] = $file_name;

            if ($post->featured_image != 'default.png') {
                $image_path = "public/post_img/" . $post->featured_image;
                if (Storage::exists($image_path)) {
                    Storage::delete($image_path);
                }

                $image_thumb_path = "public/post_img/thumb/" . $post->featured_image;
                if (Storage::exists($image_thumb_path)) {
                    Storage::delete($image_thumb_path);
                }
            }

        }

        $post->update($data);

        $post->load('category');

        $featuredImageUrl = url('storage/post_img/') . "/";
        $featuredImageThumbUrl = url('storage/post_img/thumb') . "/";

        $post['featured_image_url'] = $featuredImageUrl . $post->featured_image;
        $post['featured_image_thumb_url'] = $featuredImageThumbUrl . $post->featured_image;

        return response()->json(['message' => "success", "data" => $post], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        if ($post->featured_image != 'default.png') {
            $image_path = "public/post_img/" . $post->featured_image;
            if (Storage::exists($image_path)) {
                Storage::delete($image_path);
            }

            $image_thumb_path = "public/post_img/thumb/" . $post->featured_image;
            if (Storage::exists($image_thumb_path)) {
                Storage::delete($image_thumb_path);
            }
        }

        $post->delete();
        return response()->json(null, 204);
    }

    public function getPostStatus()
    {
        return array_values(config('constants.STATUS'));
    }
}
