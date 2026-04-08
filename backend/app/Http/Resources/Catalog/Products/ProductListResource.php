<?php

namespace App\Http\Resources\Catalog\Products;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductListResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'price_after_discount' => $this->price_after_discount,
            'main_photo_url' => $this->main_photo_path
                ? asset('storage/' . $this->main_photo_path)
                : null,
        ];
    }
}
