<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branchs extends Model
{
    use HasFactory;

    protected $table = 'branchs';
    protected $fillable = [
        'name',
        'location',
        'GPS',
        'status'
    ];


    public function machines(){
        return $this->hasOne(Machines::class, 'branch_id');
    }
}
