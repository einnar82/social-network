<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = ['id'];

    protected $touches = ['post'];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id')->latest();
    }

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id')->whereNotNull('parent_id')->latest();
    }

}
