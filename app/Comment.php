<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = ['id'];

    public const MAX_LEVEL = 3;
    public const PARENT = 1;
    public const CHILDREN = 2;
    public const GRANDCHILD = 3;

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id')
            ->whereNotNull('parent_id')->where('level', self::CHILDREN)->latest();
    }

    public function grand_children()
    {
        return $this->hasMany(self::class, 'parent_id')
            ->whereNotNull('parent_id')->where('level', self::GRANDCHILD)->latest();
    }

}
