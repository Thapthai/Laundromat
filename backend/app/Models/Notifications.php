<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notifications extends Model
{
    use HasFactory;
    protected $table = 'notification';
    protected $fillable = [
        'machine_id',
        'user_id',
        'record_id',
        'message',
        'Status',
    ];
}
