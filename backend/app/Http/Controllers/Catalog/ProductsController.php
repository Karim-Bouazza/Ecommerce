<?php

namespace App\Http\Controllers\Catalog;

use App\Filters\ProductFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\Products\ListProductsRequest;
use App\Http\Requests\Catalog\Products\StoreProductRequest;
use App\Http\Requests\Catalog\Products\UpdateProductRequest;
use App\Http\Resources\Catalog\Products\ProductFiltersResource;
use App\Http\Resources\Catalog\Products\ProductListResource;
use App\Http\Resources\Catalog\Products\ProductResource;
use App\Models\Product;
use App\Services\Catalog\ProductsService;
use App\Traits\HasPagination;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class ProductsController extends Controller
{
    use HasPagination;

    public function __construct(
        private ProductsService $productsService
    ) {}

    public function index(ListProductsRequest $request): AnonymousResourceCollection
    {
        $query = Product::query()
            ->select([
                'id',
                'title',
                'quantity',
                'price',
                'price_after_discount',
                'main_photo_path',
                'category_id'
            ])
            ->orderBy('id', 'desc');

        $filter = new ProductFilter($request->validated());
        $query = $filter->apply($query);

        return ProductListResource::collection($this->items($query, $request));
    }

    public function show(int $id): ProductResource
    {
        $product = $this->productsService->findProductById($id);

        return new ProductResource($product);
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        $payload = $request->validated();

        if ($request->hasFile('main_photo')) {
            $payload['main_photo'] = $request->file('main_photo');
        }

        $product = $this->productsService->createProduct($payload);

        return (new ProductResource($product))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(UpdateProductRequest $request, int $id): ProductResource
    {
        $payload = $request->validated();

        if ($request->hasFile('main_photo')) {
            $payload['main_photo'] = $request->file('main_photo');
        }

        $product = $this->productsService->updateProduct($id, $payload);

        return new ProductResource($product);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->productsService->deleteProduct($id);

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    public function filters(): JsonResponse
    {
        return (new ProductFiltersResource($this->productsService->getProductFilters()))
            ->response();
    }
}
