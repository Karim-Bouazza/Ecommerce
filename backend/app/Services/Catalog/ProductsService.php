<?php

namespace App\Services\Catalog;

use App\Models\Product;
use App\Models\Category;
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
                'sub_image_url_01',
                'sub_image_url_02',
                'sub_image_url_03',
                'created_at',
                'updated_at',
            ])
            ->findOrFail($id);
    }

    public function createProduct(array $data): Product
    {
        $mainPhoto = $data['main_photo'] ?? null;
        $subImage01 = $data['sub_image_01'] ?? null;
        $subImage02 = $data['sub_image_02'] ?? null;
        $subImage03 = $data['sub_image_03'] ?? null;

        return DB::transaction(function () use ($data, $mainPhoto, $subImage01, $subImage02, $subImage03): Product {
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
                'sub_image_url_01' => $subImage01 instanceof UploadedFile
                    ? $this->storeSubImage($subImage01, 1)
                    : null,
                'sub_image_url_02' => $subImage02 instanceof UploadedFile
                    ? $this->storeSubImage($subImage02, 2)
                    : null,
                'sub_image_url_03' => $subImage03 instanceof UploadedFile
                    ? $this->storeSubImage($subImage03, 3)
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
            $subImageFields = [
                'sub_image_01' => 'sub_image_url_01',
                'sub_image_02' => 'sub_image_url_02',
                'sub_image_03' => 'sub_image_url_03',
            ];

            if ($mainPhoto instanceof UploadedFile) {
                $newMainPhotoPath = $this->storeMainPhoto($mainPhoto);
                $oldMainPhotoPath = $product->main_photo_path;

                $data['main_photo_path'] = $newMainPhotoPath;
                $this->deleteMainPhoto($oldMainPhotoPath);
            }

            unset($data['main_photo']);

            foreach ($subImageFields as $requestField => $dbField) {
                $file = $data[$requestField] ?? null;
                if (! $file instanceof UploadedFile) {
                    unset($data[$requestField]);
                    continue;
                }

                $slot = (int) substr($requestField, -1);
                $newSubImagePath = $this->storeSubImage($file, $slot);
                $oldSubImagePath = $product->{$dbField};

                $data[$dbField] = $newSubImagePath;
                unset($data[$requestField]);

                $this->deleteMainPhoto($oldSubImagePath);
            }

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
            $subImagePaths = [
                $product->sub_image_url_01,
                $product->sub_image_url_02,
                $product->sub_image_url_03,
            ];
            $product->delete();

            $this->deleteMainPhoto($mainPhotoPath);
            foreach ($subImagePaths as $subImagePath) {
                $this->deleteMainPhoto($subImagePath);
            }
        });
    }

    private function storeMainPhoto(UploadedFile $file): string
    {
        return $file->store('products/main-photos', 'public');
    }

    private function storeSubImage(UploadedFile $file, int $slot): string
    {
        return $file->store('products/sub-images/' . $slot, 'public');
    }

    private function deleteMainPhoto(?string $path): void
    {
        if (! $path) {
            return;
        }

        Storage::disk('public')->delete($path);
    }

    public function getProductFilters(): array
    {
        $categories = Category::query()
            ->select(['id', 'name'])
            ->withCount('products')
            ->orderBy('id', 'desc')
            ->get();

        $pricesRange = Product::query()
            ->selectRaw('MIN(COALESCE(price_after_discount, price)) as min_price')
            ->selectRaw('MAX(COALESCE(price_after_discount, price)) as max_price')
            ->first();

        return [
            'categories' => $categories,
            'prices_range' => [
                'min_price' => (float) ($pricesRange?->min_price ?? 0),
                'max_price' => (float) ($pricesRange?->max_price ?? 0),
            ],
        ];
    }
}
