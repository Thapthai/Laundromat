<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MachineTypes extends Model
{
    use HasFactory;
    protected $table = 'machine_type';
    protected $fillable = [
        'name',
        'status'
    ];
}
