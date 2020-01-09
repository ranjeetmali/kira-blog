<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{

    public function profileUpload(Request $request)
    {
        $requestUser = $request->user();
        $profile = User::find($requestUser->id);

        $fileType = "jpg,jpeg,png";
        $fileSize = "2048";

        $validator = \Validator::make($request->all(), [
            'profile' => 'required|mimes:' . $fileType . '|max:' . $fileSize,
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        $input=[];
        if ($request->hasFile("profile")) {
            $img = $request->file("profile");
            $img->store('public/profile_img');
            $input['profile_img'] = $img->hashName();
        }

        if ($profile->profile_img != 'default.png') {
            $image_path = "public/profile_img/" . $profile->profile_img;
            if (Storage::exists($image_path)) {
                Storage::delete($image_path);
            }
        }

        $profile->update($input);

        $featuredImageUrl = url('storage/profile_img/') . "/";

        $profile['profile_img_url'] = $featuredImageUrl . $profile->profile_img;

        return response()->json(['message' => 'Profile uploaded successfully','data'=>$profile], 200);
    }


    public function profileUpdate(Request $request)
    {
        $requestUser = $request->user();
        $user = User::find($requestUser->id);

        $validator = \Validator::make($request->all(), [
            'name' => 'required|min:3'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $requestData = $request->all();

        $user->update([
            'name' => $requestData['name']
        ]);

        return response()->json(['message' => 'Profile updated successfully'], 200);
    }

    public function changePassword(Request $request)
    {
        $requestUser = $request->user();
        $user = User::find($requestUser->id);

        $validator = \Validator::make($request->all(), [
            'current_password' => ['required', function ($attribute, $value, $fail) use ($user) {
                if (!Hash::check($value, $user->password)) {
                    return $fail(__('The current password is incorrect.'));
                }
            }],
            'new_password' => 'required|min:6',
            'conform_password' => 'required|same:new_password'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $new_pass = Hash::make($request->input('new_password'));

        $user->update(['password' => $new_pass]);

        return response()->json(['message' => 'Password change successfully'], 200);
    }
}
