<?php

namespace App\Services\Catalog;

use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

class ProductsService
{
    /**
     * @throws ModelNotFoundException
     */
    public function findProductById(int $id): Product
    {
        return Product::query()
            ->with('category:id,name')
            ->select([
                'id',
                'title',
                'description',
                'quantity',
                'price',
                'price_after_discount',
                'category_id',
                'created_at',
                'updated_at',
            ])
            ->findOrFail($id);
    }

    public function createProduct(array $data): Product
    {
        return DB::transaction(function () use ($data): Product {
            $product = Product::query()->create([
                'title' => $data['title'],
                'description' => $data['description'],
                'quantity' => $data['quantity'],
                'price' => $data['price'],
                'price_after_discount' => $data['price_after_discount'] ?? null,
                'category_id' => $data['category_id'],
            ]);

            return $product->load('category:id,name');
        });
    }

    /**
     * @throws ModelNotFoundException
     */
    public function updateProduct(int $id, array $data): Product
    {
        return DB::transaction(function () use ($id, $data): Product {
            $product = Product::query()->findOrFail($id);

            $product->update($data);

            return $product->fresh()->load('category:id,name');
        });
    }

    /**
     * @throws ModelNotFoundException
     */
    public function deleteProduct(int $id): void
    {
        DB::transaction(function () use ($id): void {
            $product = Product::query()->findOrFail($id);
            $product->delete();
        });
    }
}
