<?php

namespace App\Http\Resources\Catalog\Products;

use App\Http\Resources\Catalog\Categories\CategoryListResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductFiltersResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $categories = $this['categories'] ?? collect();
        $pricesRange = $this['prices_range'] ?? [];

        return [
            'categories' => CategoryListResource::collection($categories),
            'prices_range' => [
                'min_price' => (float) ($pricesRange['min_price'] ?? 0),
                'max_price' => (float) ($pricesRange['max_price'] ?? 0),
            ],
        ];
    }
}
