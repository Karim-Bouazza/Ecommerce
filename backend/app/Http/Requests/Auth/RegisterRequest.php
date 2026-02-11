<?php
namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|max:255|unique:users',
            "email" => 'required|email|max:255|unique:users',
            "password" => 'required|min:8|confirmed',
        ];
    }
}
