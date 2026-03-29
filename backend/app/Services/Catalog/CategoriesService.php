<?php

namespace App\Services\Catalog;

use App\Models\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

class CategoriesService
{
    /**
     * @throws ModelNotFoundException
     */
    public function findCategoryById(int $id): Category
    {
        return Category::query()
            ->select(['id', 'name', 'created_at', 'updated_at'])
            ->findOrFail($id);
    }

    public function createCategory(array $data): Category
    {
        return DB::transaction(function () use ($data): Category {
            return Category::query()->create([
                'name' => $data['name'],
            ]);
        });
    }

    /**
     * @throws ModelNotFoundException
     */
    public function updateCategory(int $id, array $data): Category
    {
        return DB::transaction(function () use ($id, $data): Category {
            $category = Category::query()->findOrFail($id);

            $category->update([
                'name' => $data['name'],
            ]);

            return $category->fresh();
        });
    }

    /**
     * @throws ModelNotFoundException
     */
    public function deleteCategory(int $id): void
    {
        DB::transaction(function () use ($id): void {
            $category = Category::query()->findOrFail($id);
            $category->delete();
        });
    }
}
