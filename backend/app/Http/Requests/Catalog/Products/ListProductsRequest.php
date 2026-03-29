<?php

namespace App\Http\Requests\Catalog\Products;

use Illuminate\Foundation\Http\FormRequest;

class ListProductsRequest extends FormRequest
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
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:' . $this->maxPerPage()],
            'page' => ['sometimes', 'integer', 'min:1'],
        ];
    }

    private function maxPerPage(): int
    {
        return (int) config('pagination.max_per_page', 100);
    }
}
