<?php

namespace App\Enums;

enum OrderStatus: string
{
    case PENDING = 'PENDING';
    case CONFIRMED = 'CONFIRMED';
    case SHIPPID = 'SHIPPID';
    case OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY';
    case FAILED = 'FAILED';
    case RETURNED = 'RETURNED';
    case DELIVERED = 'DELIVERED';

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_map(
            static fn(self $status): string => $status->value,
            self::cases()
        );
    }
}
