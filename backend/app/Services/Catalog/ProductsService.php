<?php

namespace App\Services\Catalog;

use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
                'main_photo_path',
                'created_at',
                'updated_at',
            ])
            ->findOrFail($id);
    }

    public function createProduct(array $data): Product
    {
        $mainPhoto = $data['main_photo'] ?? null;

        return DB::transaction(function () use ($data, $mainPhoto): Product {
            $product = Product::query()->create([
                'title' => $data['title'],
                'description' => $data['description'] ?? '',
                'quantity' => $data['quantity'],
                'price' => $data['price'],
                'price_after_discount' => $data['price_after_discount'] ?? null,
                'category_id' => $data['category_id'],
                'main_photo_path' => $mainPhoto instanceof UploadedFile
                    ? $this->storeMainPhoto($mainPhoto)
                    : null,
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
            $mainPhoto = $data['main_photo'] ?? null;

            if ($mainPhoto instanceof UploadedFile) {
                $newMainPhotoPath = $this->storeMainPhoto($mainPhoto);
                $oldMainPhotoPath = $product->main_photo_path;

                $data['main_photo_path'] = $newMainPhotoPath;
                unset($data['main_photo']);

                $product->update($data);

                $this->deleteMainPhoto($oldMainPhotoPath);

                return $product->fresh()->load('category:id,name');
            }

            unset($data['main_photo']);

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
            $mainPhotoPath = $product->main_photo_path;
            $product->delete();

            $this->deleteMainPhoto($mainPhotoPath);
        });
    }

    private function storeMainPhoto(UploadedFile $file): string
    {
        return $file->store('products/main-photos', 'public');
    }

    private function deleteMainPhoto(?string $path): void
    {
        if (! $path) {
            return;
        }

        Storage::disk('public')->delete($path);
    }
}
