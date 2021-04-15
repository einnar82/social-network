<?php

use App\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Post::create([
            'title' => 'Tingnan mo iyong palad',
            'name' => 'Bamboo Mañalac'
        ]);
    }
}
