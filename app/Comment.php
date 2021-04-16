<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = ['id'];

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id')->whereNotNull('parent_id')->latest();
    }

}
