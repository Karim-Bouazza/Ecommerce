<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

trait HasPagination
{
    public function items(Builder $query, Request $request): Collection
    {
        $perPage = (int) $request->get('per_page', config('pagination.default_per_page', 15));

        return collect($query->paginate($perPage)->items());
    }
}
