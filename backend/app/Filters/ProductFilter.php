<?php

namespace App\Filters;

class ProductFilter
{
    protected $request;
    protected $query;

    public function __construct($request)
    {
        $this->request = $request;
    }

    public function apply($query)
    {
        $this->query = $query;

        foreach ($this->filters() as $name => $value) {
            if (method_exists($this, $name) && $value !== null) {
                $this->$name($value);
            }
        }
        return $this->query;
    }

    protected function filters()
    {
        return [
            'category' => $this->request['category'] ?? null,
            'min_price' => $this->request['min_price'] ?? null,
            'max_price' => $this->request['max_price'] ?? null,

        ];
    }

    protected function category($value)
    {
        $this->query->where('category_id', $value);
    }

    protected function min_price($value)
    {
        $this->query->where('price', '>=', $value);
    }

    protected function max_price($value)
    {
        $this->query->where('price', '<=', $value);
    }
}
