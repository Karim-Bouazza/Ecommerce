<?php

namespace App\Services\Orders;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrdersService
{
    public function listOrdersQuery(array $filters = []): Builder
    {
        return Order::query()
            ->select([
                'id',
                'nom',
                'prenom',
                'numero_telephone',
                'status',
            ])
            ->when(
                isset($filters['status']) && is_string($filters['status']) && $filters['status'] !== '',
                static function (Builder $query) use ($filters): void {
                    $query->where('status', $filters['status']);
                }
            )
            ->orderByDesc('id');
    }

    /**
     * @throws ModelNotFoundException
     */
    public function findOrderById(int $id): Order
    {
        return Order::query()
            ->select([
                'id',
                'nom',
                'prenom',
                'wilaya',
                'baladia',
                'numero_telephone',
                'total_price',
                'status',
                'created_at',
                'updated_at',
            ])
            ->with([
                'items' => static fn($query) => $query
                    ->select([
                        'id',
                        'order_id',
                        'product_id',
                        'quantity',
                        'unit_price',
                        'total_price',
                    ])
                    ->orderBy('id'),
                'items.product:id,title',
            ])
            ->findOrFail($id);
    }

    /**
     * @throws ValidationException
     */
    public function createOrder(array $data): Order
    {
        return DB::transaction(function () use ($data): Order {
            /** @var list<array{product_id:int,quantity:int}> $items */
            $items = $data['items'];
            $productIds = collect($items)
                ->pluck('product_id')
                ->unique()
                ->values();

            $products = Product::query()
                ->select(['id', 'title', 'price'])
                ->whereIn('id', $productIds)
                ->get()
                ->keyBy('id');

            if ($products->count() !== $productIds->count()) {
                throw ValidationException::withMessages([
                    'items' => ['Un ou plusieurs produits sont introuvables.'],
                ]);
            }

            $order = Order::query()->create([
                'nom' => $data['nom'],
                'prenom' => $data['prenom'],
                'wilaya' => $data['wilaya'],
                'baladia' => $data['baladia'],
                'numero_telephone' => $data['numero_telephone'],
                'total_price' => 0,
                'status' => OrderStatus::PENDING,
            ]);

            $orderItemRows = [];
            $orderTotalInCents = 0;

            foreach ($items as $item) {
                /** @var Product $product */
                $product = $products->get($item['product_id']);
                $quantity = (int) $item['quantity'];

                $unitPriceInCents = (int) round(((float) $product->price) * 100);
                $itemTotalInCents = $unitPriceInCents * $quantity;
                $orderTotalInCents += $itemTotalInCents;

                $orderItemRows[] = [
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $unitPriceInCents / 100,
                    'total_price' => $itemTotalInCents / 100,
                ];
            }

            $order->items()->createMany($orderItemRows);

            $order->update([
                'total_price' => $orderTotalInCents / 100,
            ]);

            return $order->fresh()->load([
                'items' => static fn($query) => $query
                    ->select([
                        'id',
                        'order_id',
                        'product_id',
                        'quantity',
                        'unit_price',
                        'total_price',
                    ])
                    ->orderBy('id'),
                'items.product:id,title',
            ]);
        });
    }
}
