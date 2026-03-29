<?php

namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\Products\ListProductsRequest;
use App\Http\Requests\Catalog\Products\StoreProductRequest;
use App\Http\Requests\Catalog\Products\UpdateProductRequest;
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
            ->with('category:id,name')
            ->select([
                'id',
                'title',
                'description',
                'quantity',
                'price',
                'price_after_discount',
                'category_id',
            ])
            ->orderBy('id', 'desc');

        return ProductListResource::collection($this->items($query, $request));
    }

    public function show(int $id): ProductResource
    {
        $product = $this->productsService->findProductById($id);

        return new ProductResource($product);
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = $this->productsService->createProduct($request->validated());

        return (new ProductResource($product))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(UpdateProductRequest $request, int $id): ProductResource
    {
        $product = $this->productsService->updateProduct($id, $request->validated());

        return new ProductResource($product);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->productsService->deleteProduct($id);

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
