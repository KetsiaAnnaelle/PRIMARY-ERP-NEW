<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends BaseController
{
    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['user'] =  $user;

        return $this->sendResponse($success, 'User registered successfully.');
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    //  public function login(Request $request)
    // {
    //     // Validation des données
    //     $validator = Validator::make($request->all(), [
    //         // 'name'=>'required',
    //         'email' => 'required|email',
    //         'password' => 'required',
    //     ]);

    //     if ($validator->fails()) {
    //         return $this->sendError('Validation Error.', $validator->errors());
    //     }

    //     $credentials = $request->only('email', 'password');

    //     try {
    //         if (!$token = auth()->attempt($credentials)) {
    //             return $this->sendError('Unauthorized.', ['error' => 'Invalid email or password.']);
    //         }

    //         $success = $this->respondWithToken($token);
    //         return $this->sendResponse($success, 'User logged in successfully.');
    //     } catch (\Exception $e) {
    //         return $this->sendError('Server Error.', ['error' => $e->getMessage()]);
    //     }
    // }

    // protected function respondWithToken($token)
    // {
    //     return [
    //         'access_token' => $token,
    //         'token_type' => 'bearer',
    //         'expires_in' => config('jwt.ttl') * 60 // Assure-toi que 'jwt.ttl' est bien défini dans ton fichier de configuration
    //     ];
    // }


    public function login(Request $request)
    {

        try {

            // $message = "";

            $userData = $request->validate(
                [
                    'email' => ["required", "email"],
                    'password' => ["required", "min:6"]
                ]
            );

            $user = User::where("email", $userData['email'])->first();

            if ($user && Hash::check($userData['password'],$user->password)) {
                // $user = Auth::user();
                $token = $user->createToken("CLE_SECRETE")->plainTextToken;
                return response()->json(['token' => $token, 'user'=>$user]);
            }else {

                return response()->json(['error' => 'Identifiants incorrects'], 401);
            }
        } catch (ValidationException $validatorError) {
            // return response([$validatorError->errors()],422);
            return response()->json(['errors'=>$validatorError->errors()],422);
        }
    }



    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // public function profile()
    // {
    //     $user = auth()->user();

    //     return $this->sendResponse($user, 'User profile retrieved successfully.');
    // }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::logout();

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out.',
        ]);
    }


    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // public function refresh()
    // {
    //     $success = $this->respondWithToken(auth()->refresh());

    //     return $this->sendResponse($success, 'Token refreshed successfully.');
    // }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return array
     */

}
