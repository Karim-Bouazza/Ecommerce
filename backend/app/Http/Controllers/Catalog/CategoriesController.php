<?php

namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\Categories\ListCategoriesRequest;
use App\Http\Requests\Catalog\Categories\StoreCategoryRequest;
use App\Http\Requests\Catalog\Categories\UpdateCategoryRequest;
use App\Http\Resources\Catalog\Categories\CategoryListResource;
use App\Http\Resources\Catalog\Categories\CategoryResource;
use App\Models\Category;
use App\Services\Catalog\CategoriesService;
use App\Traits\HasPagination;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class CategoriesController extends Controller
{
    use HasPagination;

    public function __construct(
        private CategoriesService $categoriesService
    ) {}

    public function index(ListCategoriesRequest $request): AnonymousResourceCollection
    {
        $query = Category::query()
            ->select(['id', 'name'])
            ->orderBy('id', 'desc');

        return CategoryListResource::collection($this->items($query, $request));
    }

    public function show(int $id): CategoryResource
    {
        $category = $this->categoriesService->findCategoryById($id);

        return new CategoryResource($category);
    }

    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $category = $this->categoriesService->createCategory($request->validated());

        return (new CategoryResource($category))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(UpdateCategoryRequest $request, int $id): CategoryResource
    {
        $category = $this->categoriesService->updateCategory($id, $request->validated());

        return new CategoryResource($category);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->categoriesService->deleteCategory($id);

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
