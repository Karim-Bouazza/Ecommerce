<?php

namespace App\Filters\ProductFilter;

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
        return $this->request->only([
            'category_id'
        ]);
    }

    protected function category_id($value)
    {
        $this->query->where('category_id', $value);
    }
}
