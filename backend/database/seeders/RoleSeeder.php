<?php

namespace Database\Seeders;

use App\Enums\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\PermissionRegistrar;
use Spatie\Permission\Models\Role as RoleModel;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        foreach (Role::values() as $role) {
            RoleModel::firstOrCreate(
                [
                    'name' => $role,
                    'guard_name' => 'web',
                ]
            );
        }
    }
}
