<?php

namespace App\Enums;

enum Role: string
{
    case ADMIN = 'admin';
    case CLIENT = 'client';

    public static function values():array {
        return array_map(
            fn(self $role) => $role->value,
            self::cases()
        );
    }
}
