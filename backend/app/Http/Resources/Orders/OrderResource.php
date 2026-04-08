<?php

namespace App\Http\Resources\Orders;

use App\Enums\OrderStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'wilaya' => $this->wilaya,
            'baladia' => $this->baladia,
            'numero_telephone' => $this->numero_telephone,
            'total_price' => $this->total_price,
            'status' => $this->status instanceof OrderStatus
                ? $this->status->value
                : (string) $this->status,
            'items' => $this->items->map(static function ($item): array {
                return [
                    'id' => $item->id,
                    'product_id' => $item->product_id,
                    'product_title' => $item->relationLoaded('product')
                        ? $item->product?->title
                        : null,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->unit_price,
                    'total_price' => $item->total_price,
                ];
            })->values()->all(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
