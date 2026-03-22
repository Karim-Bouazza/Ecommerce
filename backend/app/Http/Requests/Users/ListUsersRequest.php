<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;

class ListUsersRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:100'],
            'page' => ['sometimes', 'integer', 'min:1'],
        ];
    }

    public function perPage(): int
    {
        return (int) ($this->validated('per_page') ?? 15);
    }
}
