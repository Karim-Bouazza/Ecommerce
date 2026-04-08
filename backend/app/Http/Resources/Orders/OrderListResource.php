<?php

namespace App\Http\Resources\Orders;

use App\Enums\OrderStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderListResource extends JsonResource
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
            'numero_telephone' => $this->numero_telephone,
            'status' => $this->status instanceof OrderStatus
                ? $this->status->value
                : (string) $this->status,
        ];
    }
}
