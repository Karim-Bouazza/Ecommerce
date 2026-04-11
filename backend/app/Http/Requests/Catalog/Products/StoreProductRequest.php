<?php

namespace App\Http\Requests\Catalog\Products;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'quantity' => ['required', 'integer', 'min:0'],
            'price' => ['required', 'numeric', 'min:0'],
            'price_after_discount' => ['sometimes', 'nullable', 'numeric', 'min:0', 'lte:price'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'main_photo' => ['sometimes', 'nullable', 'image', 'max:5120'],
            'sub_images' => ['sometimes', 'array', 'max:3'],
            'sub_images.*' => ['sometimes', 'nullable', 'image', 'max:5120'],
            'sub_image_01' => ['sometimes', 'nullable', 'image', 'max:5120'],
            'sub_image_02' => ['sometimes', 'nullable', 'image', 'max:5120'],
            'sub_image_03' => ['sometimes', 'nullable', 'image', 'max:5120'],
        ];
    }
}
