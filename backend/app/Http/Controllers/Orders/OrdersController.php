<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\Orders\ListOrdersRequest;
use App\Http\Requests\Orders\StoreOrderRequest;
use App\Http\Resources\Orders\OrderListResource;
use App\Http\Resources\Orders\OrderResource;
use App\Services\Orders\OrdersService;
use App\Traits\HasPagination;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpFoundation\Response;

class OrdersController extends Controller
{
    use HasPagination;

    public function __construct(
        private OrdersService $ordersService
    ) {}

    public function index(ListOrdersRequest $request): AnonymousResourceCollection
    {
        $query = $this->ordersService->listOrdersQuery($request->validated());

        return OrderListResource::collection($this->items($query, $request));
    }

    /**
     * @throws ModelNotFoundException
     */
    public function show(int $id): OrderResource
    {
        $order = $this->ordersService->findOrderById($id);

        return new OrderResource($order);
    }

    public function store(StoreOrderRequest $request): JsonResponse
    {
        $order = $this->ordersService->createOrder($request->validated());

        return (new OrderResource($order))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }
}
