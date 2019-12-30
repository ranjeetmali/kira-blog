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
        if (Auth::attempt(['email' => $request->get('email'), 'password' => $request->get('password')])) {
            $user=Auth::user();
            $token = $user->createToken('LoginToken');
            return response()->json(['token' => $token->accessToken]);
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }

    public function register(Request $request)
    {
        $validator=\Validator::make($request->all(),[
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string'
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()], 422);
        }


        $data = $request->all();
        $data['password'] = \Hash::make($data['password']);
        $user = User::create($data);

        return response()->json(['token' => $user->createToken('SignupToken')->accessToken], 200);
    }

    public function logout()
    {

    }

    public function user(Request $request)
    {
        return $request->user();
    }
}
