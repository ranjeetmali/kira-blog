<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        if (Auth::attempt(['email' => $request->get('email'), 'password' => $request->get('password')])) {
            $user = Auth::user();
            $token = $user->createToken('LoginToken');
            return response()->json(['token' => $token->accessToken]);
        } else {
            return response()->json(['error' => ['password' => 'These credentials do not match our records.']], 401);
        }
    }

    public function register(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }


        $data = $request->all();
        $data['password'] = \Hash::make($data['password']);
        $user = User::create($data);

        return response()->json(['token' => $user->createToken('SignupToken')->accessToken], 200);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->token()->revoke();
        return response()->json(['message' => 'Successfully Logout'], 200);
    }

    public function user(Request $request)
    {
        $user = $request->user();
        $profileImageUrl = url('storage/profile_img/') . "/";
        $user['profile_img_url'] = $profileImageUrl . $user->profile_img;
        return $user;
    }
}
