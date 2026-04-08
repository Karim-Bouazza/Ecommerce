<?php

namespace App\Http\Requests\Catalog\Products;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'title' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'quantity' => ['sometimes', 'integer', 'min:0'],
            'price' => ['sometimes', 'numeric', 'min:0'],
            'price_after_discount' => ['sometimes', 'nullable', 'numeric', 'min:0', 'lte:price'],
            'category_id' => ['sometimes', 'integer', 'exists:categories,id'],
            'main_photo' => ['sometimes', 'nullable', 'image', 'max:5120'],
        ];
    }
}
