<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CommentTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function testIfCanGetComments()
    {
        $response = $this->getJson('/api/comments');
        $response->assertStatus(200);
    }

    public function testIfCanCreateComment()
    {
        $response = $this->postJson('/api/comments', [
            'name' => "test",
            'comment_text' => 'test comment text'
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'name' => 'test'
            ]);
    }

    public function testCreateCommentValidationFailed()
    {
        $response = $this->postJson('/api/comments');

        $response->assertStatus(422);
    }
}
